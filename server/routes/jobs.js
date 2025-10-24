import express from 'express';
import Airtable from 'airtable';
import dotenv from 'dotenv';
import { 
  validateResource, 
  validateJobApplication, 
  validateUniversalApplication,
  validateJobPosting,
  handleValidationErrors 
} from '../middleware/validation.js';

// Load environment variables
dotenv.config();

const router = express.Router();

// Initialize Airtable (only if credentials are available)
let base = null;
let isAirtableConfigured = false;

console.log('🔍 Debug - AIRTABLE_PAT:', process.env.AIRTABLE_PAT ? 'Set (' + process.env.AIRTABLE_PAT.substring(0, 10) + '...)' : 'Not set');
console.log('🔍 Debug - AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID ? 'Set (' + process.env.AIRTABLE_BASE_ID + ')' : 'Not set');
console.log('🔍 Debug - PAT !== placeholder_token:', process.env.AIRTABLE_PAT !== 'placeholder_token');
console.log('🔍 Debug - BASE_ID !== placeholder_base_id:', process.env.AIRTABLE_BASE_ID !== 'placeholder_base_id');

if (process.env.AIRTABLE_PAT && process.env.AIRTABLE_BASE_ID && 
    process.env.AIRTABLE_PAT !== 'placeholder_token' && 
    process.env.AIRTABLE_BASE_ID !== 'placeholder_base_id') {
  try {
    base = new Airtable({ 
      apiKey: process.env.AIRTABLE_PAT 
    }).base(process.env.AIRTABLE_BASE_ID);
    isAirtableConfigured = true;
    console.log('✅ Airtable connection initialized');
  } catch (error) {
    console.warn('⚠️  Airtable connection failed:', error.message);
    isAirtableConfigured = false;
  }
} else {
  console.warn('⚠️  Airtable credentials not found or using placeholder values. Set AIRTABLE_PAT and AIRTABLE_BASE_ID in .env file');
  isAirtableConfigured = false;
}

// Mock Airtable base for development
const createMockBase = () => (tableName) => ({
  create: async (data) => {
    console.log(`📝 Mock Airtable create for table ${tableName}:`, data);
    return {
      id: 'mock_' + Date.now(),
      get: (field) => data[field] || 'Mock Value'
    };
  },
  select: () => ({
    all: async () => []
  }),
  find: async (id) => ({
    id,
    get: (field) => 'Mock Value'
  })
});

if (!isAirtableConfigured) {
  base = createMockBase();
  console.log('🔧 Using mock Airtable for development');
}

// Table names
const TABLES = {
  JOBS: 'Jobs',
  APPLICATIONS: 'Applications',
  UNIVERSAL_APPLICATIONS: 'Universal Applications'
};

// Get all jobs
router.get('/', async (req, res) => {
  try {
    if (!isAirtableConfigured) {
      console.log('📋 Using mock data for jobs');
      return res.json({
        success: true,
        count: 0,
        jobs: [],
        message: 'Using mock data - no real Airtable connection'
      });
    }
    
    console.log('📋 Fetching jobs from Airtable...');
    
    const records = await base(TABLES.JOBS).select({
      sort: [{ field: 'Posted Date', direction: 'desc' }]
    }).all();
    
    const jobs = records.map(record => ({
      id: record.id,
      title: record.get('Title'),
      company: record.get('Company'),
      location: record.get('Location'),
      category: record.get('Category'),
      description: record.get('Description'),
      requirements: record.get('Requirements'),
      salary: record.get('Salary'),
      type: record.get('Type'),
      postedDate: record.get('Posted Date'),
      airtableId: record.id
    }));
    
    console.log(`✅ Successfully fetched ${jobs.length} jobs`);
    res.json({
      success: true,
      count: jobs.length,
      jobs
    });
    
  } catch (error) {
    console.error('❌ Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch jobs',
      message: error.message
    });
  }
});

// Get available options for forms
router.get('/options', async (req, res) => {
  try {
    if (!isAirtableConfigured) {
      return res.json({
        success: true,
        categories: ['Engineering'],
        types: ['Full-time', 'Part-time', 'Contract']
      });
    }
    
    console.log('📋 Fetching job options from Airtable...');
    
    const records = await base(TABLES.JOBS).select({
      fields: ['Category', 'Type']
    }).all();
    
    const categories = [...new Set(records.map(record => record.get('Category')).filter(Boolean))];
    const types = [...new Set(records.map(record => record.get('Type')).filter(Boolean))];
    
    console.log(`✅ Found categories: ${categories.join(', ')}`);
    console.log(`✅ Found types: ${types.join(', ')}`);
    
    res.json({
      success: true,
      categories,
      types
    });
    
  } catch (error) {
    console.error('❌ Error fetching options:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch options',
      message: error.message
    });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    if (!isAirtableConfigured) {
      return res.status(404).json({
        success: false,
        error: 'Job not found',
        message: 'Using mock data - no real Airtable connection'
      });
    }
    
    const { id } = req.params;
    console.log(`🔍 Fetching job ${id} from Airtable...`);
    
    const record = await base(TABLES.JOBS).find(id);
    
    const job = {
      id: record.id,
      title: record.get('Title'),
      company: record.get('Company'),
      location: record.get('Location'),
      category: record.get('Category'),
      description: record.get('Description'),
      requirements: record.get('Requirements'),
      salary: record.get('Salary'),
      type: record.get('Type'),
      postedDate: record.get('Posted Date'),
      airtableId: record.id
    };
    
    console.log(`✅ Successfully fetched job: ${job.title}`);
    res.json({
      success: true,
      job
    });
    
  } catch (error) {
    console.error('❌ Error fetching job:', error);
    res.status(404).json({
      success: false,
      error: 'Job not found',
      message: error.message
    });
  }
});

// Create new job
router.post('/', validateJobPosting, async (req, res) => {
  try {
    if (!base) {
      return res.status(503).json({
        success: false,
        error: 'Airtable not configured',
        message: 'Please set AIRTABLE_PAT and AIRTABLE_BASE_ID environment variables'
      });
    }
    
    const jobData = req.body;
    console.log('📝 Creating new job in Airtable:', jobData);
    
    const record = await base(TABLES.JOBS).create({
      'Title': jobData.title,
      'Company': jobData.company,
      'Location': jobData.location,
      'Category': jobData.category,
      'Description': jobData.description,
      'Requirements': jobData.requirements,
      'Salary': jobData.salary,
      'Type': jobData.type,
      'Posted Date': new Date().toISOString().split('T')[0]
    });
    
    const job = {
      id: record.id,
      title: record.get('Title'),
      company: record.get('Company'),
      location: record.get('Location'),
      category: record.get('Category'),
      description: record.get('Description'),
      requirements: record.get('Requirements'),
      salary: record.get('Salary'),
      type: record.get('Type'),
      postedDate: record.get('Posted Date'),
      airtableId: record.id
    };
    
    console.log(`✅ Successfully created job: ${job.title}`);
    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
    
  } catch (error) {
    console.error('❌ Error creating job:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create job',
      message: error.message
    });
  }
});

// Submit job application (with job ID)
router.post('/:id/apply', validateJobApplication, async (req, res) => {
  try {
    const { id } = req.params;
    const applicationData = req.body;
    console.log(`📄 Submitting application for job ${id}:`, applicationData);
    
    const record = await base(TABLES.APPLICATIONS).create({
      'Job ID': id,
      'Job Title': applicationData.jobTitle,
      'Company': applicationData.company,
      'Applicant Name': applicationData.name,
      'Email': applicationData.email,
      'Phone': applicationData.phone,
      'Resume URL': applicationData.resumeUrl,
      'Cover Letter': applicationData.coverLetter,
      'LinkedIn': applicationData.linkedin,
      'Portfolio': applicationData.portfolio,
      'Application Date': new Date().toISOString().split('T')[0],
      'Status': 'Pending'
    });
    
    console.log(`✅ Successfully submitted application: ${record.id}`);
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: record.id
    });
    
  } catch (error) {
    console.error('❌ Error submitting application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application',
      message: error.message
    });
  }
});

// Submit job application (without job ID - for frontend compatibility)
router.post('/apply', validateJobApplication, async (req, res) => {
  try {
    const applicationData = req.body;
    console.log(`📄 Submitting application:`, applicationData);
    console.log(`📄 Application data validation:`, {
      name: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone,
      jobId: applicationData.jobId,
      jobTitle: applicationData.jobTitle,
      company: applicationData.company
    });
    
    const record = await base(TABLES.APPLICATIONS).create({
      'Job ID': applicationData.jobId || 'Unknown',
      'Job Title': applicationData.jobTitle || 'Unknown',
      'Company': applicationData.company || 'Unknown',
      'Applicant Name': applicationData.name,
      'Email': applicationData.email,
      'Phone': applicationData.phone,
      'Resume URL': applicationData.resumeUrl,
      'Cover Letter': applicationData.coverLetter,
      'LinkedIn': applicationData.linkedin,
      'Portfolio': applicationData.portfolio,
      'Application Date': new Date().toISOString().split('T')[0],
      'Status': 'Pending'
    });
    
    console.log(`✅ Successfully submitted application: ${record.id}`);
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: record.id
    });
    
  } catch (error) {
    console.error('❌ Error submitting application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application',
      message: error.message
    });
  }
});

// Submit universal application
router.post('/universal', validateUniversalApplication, async (req, res) => {
  try {
    const applicationData = req.body;
    console.log('📄 Submitting universal application:', applicationData);
    
    const record = await base(TABLES.UNIVERSAL_APPLICATIONS).create({
      'Name': applicationData.name,
      'Email': applicationData.email,
      'Phone': applicationData.phone,
      'University': applicationData.university,
      'Graduation Year': applicationData.graduationYear ? parseInt(applicationData.graduationYear, 10) : null,
      'Major': applicationData.major,
      'Resume URL': applicationData.resumeUrl,
      'LinkedIn': applicationData.linkedin,
      'Portfolio': applicationData.portfolio,
      'Interests': applicationData.interests,
      'Experience': applicationData.experience,
      'Skills': applicationData.skills,
      'Application Date': new Date().toISOString().split('T')[0],
      'Status': 'Pending Review'
    });
    
    console.log(`✅ Successfully submitted universal application: ${record.id}`);
    res.status(201).json({
      success: true,
      message: 'Universal application submitted successfully',
      applicationId: record.id
    });
    
  } catch (error) {
    console.error('❌ Error submitting universal application:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit universal application',
      message: error.message
    });
  }
});

export default router;