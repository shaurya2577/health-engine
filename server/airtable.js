import Airtable from 'airtable';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// Validate environment variables
if (!AIRTABLE_PAT) {
  console.warn('⚠️  AIRTABLE_PAT environment variable is not set - Airtable features will be disabled');
}

if (!AIRTABLE_BASE_ID) {
  console.warn('⚠️  AIRTABLE_BASE_ID environment variable is not set - Airtable features will be disabled');
}

// Only validate and initialize if both are provided
let base = null;
if (AIRTABLE_PAT && AIRTABLE_BASE_ID) {
  // Validate PAT format
  if (!AIRTABLE_PAT.startsWith('pat')) {
    console.error('❌ AIRTABLE_PAT must start with "pat"');
  } else if (!AIRTABLE_BASE_ID.startsWith('app')) {
    console.error('❌ AIRTABLE_BASE_ID must start with "app"');
  } else {
    console.log('✅ Airtable configuration validated');
    console.log(`Base ID: ${AIRTABLE_BASE_ID}`);
    console.log(`PAT: ${AIRTABLE_PAT.substring(0, 10)}...`);
    
    // Initialize Airtable
    base = new Airtable({ apiKey: AIRTABLE_PAT }).base(AIRTABLE_BASE_ID);
  }
} else {
  console.log('ℹ️  Airtable not configured - using fallback mode');
}

export default base;
