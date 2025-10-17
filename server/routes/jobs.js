import express from 'express';
import base from '../airtable.js';

const router = express.Router();

// Helper function to handle Airtable errors
const handleAirtableError = (error, res) => {
  console.error('Airtable Error:', error);
  const statusCode = error.statusCode || 500;
  const errorType = error.error || 'UNKNOWN_ERROR';
  
  res.status(statusCode).json({
    error: `AIRTABLE_${errorType}_FAILED`,
    message: error.message,
    statusCode
  });
};

// Helper function for pagination
const getPaginatedRecords = async (tableName, options = {}) => {
  if (!base) {
    throw new Error('Airtable not configured');
  }
  
  const { offset = 0, pageSize = 100, sort = [] } = options;
  
  const selectOptions = {
    view: 'Grid view',
    pageSize: Math.min(pageSize, 100), // Airtable max is 100
  };
  
  if (sort.length > 0) {
    selectOptions.sort = sort;
  }
  
  if (offset > 0) {
    selectOptions.offset = offset;
  }
  
  return await base(tableName).select(selectOptions).all();
};

// GET /api/jobs - List all jobs
router.get('/', async (req, res) => {
  try {
    // Check if Airtable is configured
    if (!base) {
      console.log('Airtable not configured - returning sample data');
      const sampleJobs = [
        {
          id: 'sample-1',
          title: 'Senior Software Engineer',
          company: 'HealthTech Innovations',
          location: 'San Francisco, CA',
          category: 'engineering',
          description: 'We\'re looking for a senior software engineer to join our team and help build the next generation of healthcare technology.',
          requirements: '5+ years experience, React, Node.js, Healthcare domain knowledge preferred',
          salary: '$120,000 - $160,000',
          type: 'full-time',
          postedDate: '2024-01-15'
        },
        {
          id: 'sample-2',
          title: 'Product Manager',
          company: 'MediConnect',
          location: 'New York, NY',
          category: 'product',
          description: 'Lead product development for our patient engagement platform.',
          requirements: '3+ years PM experience, Healthcare background, Agile methodology',
          salary: '$100,000 - $140,000',
          type: 'full-time',
          postedDate: '2024-01-14'
        }
      ];
      return res.json(sampleJobs);
    }

    console.log('Fetching jobs from Airtable...');
    const records = await getPaginatedRecords('Jobs', {
      sort: [{ field: 'Posted Date', direction: 'desc' }]
    });
    
    const jobs = records.map(record => ({
      id: record.id,
      title: record.get('Title') || '',
      company: record.get('Company') || '',
      location: record.get('Location') || '',
      category: record.get('Category') || '',
      description: record.get('Description') || '',
      requirements: record.get('Requirements') || '',
      salary: record.get('Salary') || '',
      type: record.get('Type') || 'full-time',
      postedDate: record.get('Posted Date') || new Date().toISOString().split('T')[0],
      airtableId: record.id
    }));
    
    console.log(`Successfully fetched ${jobs.length} jobs`);
    res.json(jobs);
  } catch (error) {
    handleAirtableError(error, res);
  }
});

// POST /api/jobs/apply - Submit job application
router.post('/apply', async (req, res) => {
  try {
    const {
      jobId,
      jobTitle,
      company,
      name,
      email,
      phone,
      resumeUrl,
      coverLetter,
      linkedin,
      portfolio,
      status = 'Pending Review'
    } = req.body;
    
    // Basic validation
    if (!email || !name || !jobId) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Missing required fields: email, name, jobId'
      });
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Invalid email format'
      });
    }
    
    // URL validation for resumeUrl if provided
    if (resumeUrl) {
      try {
        new URL(resumeUrl);
      } catch {
        return res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'Invalid resume URL format'
        });
      }
    }
    
    // Check if Airtable is configured
    if (!base) {
      console.log('Airtable not configured - simulating application submission');
      return res.json({ id: 'simulated-' + Date.now() });
    }
    
    console.log('Creating job application in Airtable...');
    const record = await base('Applications').create({
      'Job ID': String(jobId),
      'Job Title': String(jobTitle || ''),
      'Company': String(company || ''),
      'Applicant Name': String(name).trim(),
      'Email': String(email).trim(),
      'Phone': String(phone || '').trim(),
      'Resume URL': String(resumeUrl || '').trim(),
      'Cover Letter': String(coverLetter || '').trim(),
      'LinkedIn': String(linkedin || '').trim(),
      'Portfolio': String(portfolio || '').trim(),
      'Application Date': new Date().toISOString(),
      'Status': String(status).trim()
    });
    
    console.log(`Successfully created application: ${record.id}`);
    res.json({ id: record.id });
  } catch (error) {
    handleAirtableError(error, res);
  }
});

// POST /api/jobs/universal - Submit universal application
router.post('/universal', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      university,
      graduationYear,
      major,
      resumeUrl,
      linkedin,
      portfolio,
      interests,
      experience,
      skills
    } = req.body;
    
    // Basic validation
    if (!email || !name) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Missing required fields: email, name'
      });
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'VALIDATION_ERROR',
        message: 'Invalid email format'
      });
    }
    
    // URL validation for resumeUrl if provided
    if (resumeUrl) {
      try {
        new URL(resumeUrl);
      } catch {
        return res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'Invalid resume URL format'
        });
      }
    }
    
    // Convert graduationYear to number if provided
    let gradYear = null;
    if (graduationYear) {
      gradYear = parseInt(graduationYear, 10);
      if (isNaN(gradYear)) {
        return res.status(400).json({
          error: 'VALIDATION_ERROR',
          message: 'Invalid graduation year format'
        });
      }
    }
    
    // Check if Airtable is configured
    if (!base) {
      console.log('Airtable not configured - simulating universal application submission');
      return res.json({ id: 'simulated-universal-' + Date.now() });
    }
    
    console.log('Creating universal application in Airtable...');
    const record = await base('Universal Applications').create({
      'Name': String(name).trim(),
      'Email': String(email).trim(),
      'Phone': String(phone || '').trim(),
      'University': String(university || '').trim(),
      'Graduation Year': gradYear,
      'Major': String(major || '').trim(),
      'Resume URL': String(resumeUrl || '').trim(),
      'LinkedIn': String(linkedin || '').trim(),
      'Portfolio': String(portfolio || '').trim(),
      'Interests': String(interests || '').trim(),
      'Experience': String(experience || '').trim(),
      'Skills': String(skills || '').trim(),
      'Application Date': new Date().toISOString(),
      'Status': 'Pending Review'
    });
    
    console.log(`Successfully created universal application: ${record.id}`);
    res.json({ id: record.id });
  } catch (error) {
    handleAirtableError(error, res);
  }
});

export default router;
