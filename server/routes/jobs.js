import express from 'express';
import Airtable from 'airtable';

const router = express.Router();

// Initialize Airtable (only if credentials are available)
let base = null;
if (process.env.AIRTABLE_PAT && process.env.AIRTABLE_BASE_ID) {
  try {
    base = new Airtable({ 
      apiKey: process.env.AIRTABLE_PAT 
    }).base(process.env.AIRTABLE_BASE_ID);
    console.log('✅ Airtable connection initialized');
  } catch (error) {
    console.warn('⚠️  Airtable connection failed:', error.message);
  }
} else {
  console.warn('⚠️  Airtable credentials not found. Set AIRTABLE_PAT and AIRTABLE_BASE_ID in .env file');
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
    if (!base) {
      return res.status(503).json({
        success: false,
        error: 'Airtable not configured',
        message: 'Please set AIRTABLE_PAT and AIRTABLE_BASE_ID environment variables'
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

// Get single job
router.get('/:id', async (req, res) => {
  try {
    if (!base) {
      return res.status(503).json({
        success: false,
        error: 'Airtable not configured',
        message: 'Please set AIRTABLE_PAT and AIRTABLE_BASE_ID environment variables'
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
router.post('/', async (req, res) => {
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

// Submit job application
router.post('/:id/apply', async (req, res) => {
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
      'Application Date': new Date().toISOString(),
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
router.post('/universal-apply', async (req, res) => {
  try {
    const applicationData = req.body;
    console.log('📄 Submitting universal application:', applicationData);
    
    const record = await base(TABLES.UNIVERSAL_APPLICATIONS).create({
      'Name': applicationData.name,
      'Email': applicationData.email,
      'Phone': applicationData.phone,
      'University': applicationData.university,
      'Graduation Year': applicationData.graduationYear,
      'Major': applicationData.major,
      'Resume URL': applicationData.resumeUrl,
      'LinkedIn': applicationData.linkedin,
      'Portfolio': applicationData.portfolio,
      'Interests': applicationData.interests,
      'Experience': applicationData.experience,
      'Skills': applicationData.skills,
      'Application Date': new Date().toISOString(),
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