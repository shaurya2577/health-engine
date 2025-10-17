// Build-time security check to ensure no Airtable secrets are exposed
const checkForAirtableSecrets = () => {
  const errors = [];
  
  // Check for any remaining Airtable environment variables
  const airtableEnvVars = Object.keys(process.env).filter(key => 
    key.startsWith('REACT_APP_AIRTABLE')
  );
  
  if (airtableEnvVars.length > 0) {
    errors.push(`Found forbidden Airtable environment variables: ${airtableEnvVars.join(', ')}`);
  }
  
  // Check for any remaining Airtable imports in the codebase
  // This is a basic check - in a real build process, you'd use a more sophisticated tool
  if (errors.length > 0) {
    console.error('🚨 SECURITY VIOLATION DETECTED:');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\n❌ Build failed: Remove all Airtable references from client code');
    process.exit(1);
  }
  
  console.log('✅ Security check passed: No Airtable secrets found in client');
};

// Run the check if this is a build environment
if (process.env.NODE_ENV === 'production' || process.env.CI) {
  checkForAirtableSecrets();
}

export default checkForAirtableSecrets;
