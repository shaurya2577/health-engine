import React, { useEffect, useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { AuthProvider, useAuth } from "../AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jobsApi, JobsApiError } from "../api/jobsApi";

function JobBoardContent() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [isUniversalFormOpen, setIsUniversalFormOpen] = useState(false);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking');
  const [apiError, setApiError] = useState(null);
  const [jobOptions, setJobOptions] = useState({ categories: [], types: [] });
  const { isSignedIn, user } = useAuth();

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
    requirements: "",
    salary: "",
    type: "full-time"
  });

  const [universalApplication, setUniversalApplication] = useState({
    name: "",
    email: "",
    phone: "",
    university: "UC Berkeley",
    graduationYear: "",
    major: "",
    resumeUrl: "",
    linkedin: "",
    portfolio: "",
    interests: "",
    experience: "",
    skills: ""
  });

  const [jobApplication, setJobApplication] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
    linkedin: "",
    portfolio: ""
  });


  useEffect(() => {
    loadJobs();
    loadJobOptions();
  }, []);

  const loadJobOptions = async () => {
    try {
      const response = await jobsApi.getOptions();
      if (response.success) {
        setJobOptions({
          categories: response.categories,
          types: response.types
        });
      }
    } catch (error) {
      console.error('Error loading job options:', error);
    }
  };

  const loadJobs = async () => {
    setLoading(true);
    setApiStatus('checking');
    try {
      const response = await jobsApi.list();
      console.log('API Response:', response);
      
      // Handle the Airtable API response format
      if (response && response.success && response.jobs && response.jobs.length > 0) {
        setJobs(response.jobs);
        setFilteredJobs(response.jobs);
        setApiStatus('connected');
        setError(null);
        console.log(`✅ Loaded ${response.jobs.length} jobs from Airtable`);
      } else {
        // No jobs found in Airtable
        setJobs([]);
        setFilteredJobs([]);
        setApiStatus('connected');
        setError('No jobs found in the database.');
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
      setFilteredJobs([]);
      setApiStatus('error');
      if (error instanceof JobsApiError) {
        setError(`API Error: ${error.message}`);
        setApiError(error);
      } else {
        setError('API connection failed.');
        setApiError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
    { value: "data", label: "Data Science" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "operations", label: "Operations" }
  ];

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "remote", label: "Remote" },
    { value: "san-francisco", label: "San Francisco, CA" },
    { value: "new-york", label: "New York, NY" },
    { value: "austin", label: "Austin, TX" },
    { value: "boston", label: "Boston, MA" }
  ];

  const filterJobs = () => {
    let filtered = jobs;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    if (selectedLocation !== "all") {
      if (selectedLocation === "remote") {
        filtered = filtered.filter(job => job.location.toLowerCase().includes("remote"));
      } else {
        filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedLocation.replace("-", " ")));
      }
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    filterJobs();
  }, [selectedCategory, selectedLocation, jobs]);

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await jobsApi.postJob(newJob);
      alert('Job posted successfully! It will be reviewed and published soon.');
      setNewJob({
        title: "",
        company: "",
        location: "",
        category: "",
        description: "",
        requirements: "",
        salary: "",
        type: "full-time"
      });
      setIsPostingJob(false);
      // Reload jobs to show the new one
      loadJobs();
    } catch (error) {
      console.error('Error posting job:', error);
      if (error instanceof JobsApiError) {
        alert(`Error posting job: ${error.message}`);
      } else {
        alert('Error posting job. Please try again.');
      }
    }
  };

  const handleUniversalApplication = async (e) => {
    e.preventDefault();
    try {
      await jobsApi.submitUniversal(universalApplication);
      alert('Universal application submitted successfully! Our team will review your profile and match you with relevant opportunities.');
      setUniversalApplication({
        name: "",
        email: "",
        phone: "",
        university: "UC Berkeley",
        graduationYear: "",
        major: "",
        resumeUrl: "",
        linkedin: "",
        portfolio: "",
        interests: "",
        experience: "",
        skills: ""
      });
      setIsUniversalFormOpen(false);
    } catch (error) {
      console.error('Error submitting universal application:', error);
      if (error instanceof JobsApiError) {
        alert(`Error submitting application: ${error.message}`);
      } else {
        alert('There was an error submitting your application. Please try again or contact support.');
      }
    }
  };

  const handleJobApplication = async (e) => {
    e.preventDefault();
    try {
      const applicationData = {
        ...jobApplication,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        company: selectedJob.company
      };
      console.log('Submitting application data:', applicationData);
      await jobsApi.apply(applicationData);
      alert('Application submitted successfully! The company will review your application.');
      setJobApplication({
        name: "",
        email: "",
        phone: "",
        resumeUrl: "",
        coverLetter: "",
        linkedin: "",
        portfolio: ""
      });
      setIsApplicationFormOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting job application:', error);
      if (error instanceof JobsApiError) {
        alert(`Error submitting application: ${error.message}`);
      } else {
        alert('There was an error submitting your application. Please try again or contact support.');
      }
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'job') {
      setNewJob({ ...newJob, [name]: value });
    } else if (formType === 'universal') {
      setUniversalApplication({ ...universalApplication, [name]: value });
    } else if (formType === 'application') {
      setJobApplication({ ...jobApplication, [name]: value });
    }
  };

  const openApplicationForm = (job) => {
    setSelectedJob(job);
    setJobApplication({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      resumeUrl: "",
      coverLetter: "",
      linkedin: "",
      portfolio: ""
    });
    setIsApplicationFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
        <div className="text-[50px]">Health Engine</div>
        <div className="text-[65px] -mt-6">Job Board</div>
      </div>


      {!isSignedIn && (
        <div className="text-3xl justify-center items-center flex mb-8">
          Welcome to Health Engine's Job Board! To post jobs or apply, please sign in.
        </div>
      )}

      <div className="mx-24">
        {/* Universal Application Form */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8 border-2 border-blue-200">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-site-black mb-2">🎓 Berkeley Student Opportunity</h2>
            <p className="text-lg text-gray-700">
              Fill out this form to get manually matched with healthcare companies looking through Berkeley resumes!
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Our team will review your profile and connect you with relevant opportunities.
            </p>
          </div>
          
          {!isUniversalFormOpen ? (
            <div className="text-center">
              <button
                onClick={() => setIsUniversalFormOpen(true)}
                className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 text-lg"
              >
                Submit Your Profile for Matching
              </button>
            </div>
          ) : (
            <form onSubmit={handleUniversalApplication} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={universalApplication.name}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={universalApplication.email}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={universalApplication.phone}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="university"
                  placeholder="University"
                  value={universalApplication.university}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="graduationYear"
                  placeholder="Graduation Year"
                  value={universalApplication.graduationYear}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="major"
                  placeholder="Major"
                  value={universalApplication.major}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="url"
                  name="resumeUrl"
                  placeholder="Resume URL (optional - Google Drive, Dropbox, etc.)"
                  value={universalApplication.resumeUrl}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="url"
                  name="linkedin"
                  placeholder="LinkedIn Profile (optional)"
                  value={universalApplication.linkedin}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="url"
                  name="portfolio"
                  placeholder="Portfolio/GitHub (optional)"
                  value={universalApplication.portfolio}
                  onChange={(e) => handleInputChange(e, 'universal')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <textarea
                name="interests"
                placeholder="What areas of healthcare interest you most?"
                value={universalApplication.interests}
                onChange={(e) => handleInputChange(e, 'universal')}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                name="experience"
                placeholder="Briefly describe your relevant experience"
                value={universalApplication.experience}
                onChange={(e) => handleInputChange(e, 'universal')}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                name="skills"
                placeholder="Key skills and technologies (optional)"
                value={universalApplication.skills}
                onChange={(e) => handleInputChange(e, 'universal')}
                rows="2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <div className="flex gap-4 justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700"
                >
                  Submit Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsUniversalFormOpen(false)}
                  className="bg-gray-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-4xl font-bold text-site-black mb-4">
          Healthcare Jobs
        </div>
        <div className="bg-site-black h-[3px] mt-2 mb-8"></div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium hover:bg-gray-50"
          >
            <option value="all">All Categories</option>
            {jobOptions.categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium hover:bg-gray-50"
          >
            {locations.map(location => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>

          {isSignedIn && (
            <button
              onClick={() => setIsPostingJob(true)}
              className="bg-button-red text-white py-2 px-6 rounded-full font-semibold hover:bg-button-hover-red"
            >
              Post a Job
            </button>
          )}
        </div>

        {/* Job Posting Form */}
        {isPostingJob && isSignedIn && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-4">Post a New Job</h3>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={newJob.title}
                  onChange={(e) => handleInputChange(e, 'job')}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={newJob.company}
                  onChange={(e) => handleInputChange(e, 'job')}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={newJob.location}
                  onChange={(e) => handleInputChange(e, 'job')}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <select
                  name="category"
                  value={newJob.category}
                  onChange={(e) => handleInputChange(e, 'job')}
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select Category</option>
                  {jobOptions.categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="salary"
                  placeholder="Salary Range"
                  value={newJob.salary}
                  onChange={(e) => handleInputChange(e, 'job')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                />
                <select
                  name="type"
                  value={newJob.type}
                  onChange={(e) => handleInputChange(e, 'job')}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Select Type</option>
                  {jobOptions.types.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                name="description"
                placeholder="Job Description"
                value={newJob.description}
                onChange={(e) => handleInputChange(e, 'job')}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <textarea
                name="requirements"
                placeholder="Requirements"
                value={newJob.requirements}
                onChange={(e) => handleInputChange(e, 'job')}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-button-red text-white py-2 px-6 rounded-full font-semibold hover:bg-button-hover-red"
                >
                  Post Job
                </button>
                <button
                  type="button"
                  onClick={() => setIsPostingJob(false)}
                  className="bg-gray-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Job Application Form Modal */}
        {isApplicationFormOpen && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h3>
              <p className="text-gray-600 mb-4">at {selectedJob.company}</p>
              
              <form onSubmit={handleJobApplication} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={jobApplication.name}
                    onChange={(e) => handleInputChange(e, 'application')}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={jobApplication.email}
                    onChange={(e) => handleInputChange(e, 'application')}
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={jobApplication.phone}
                    onChange={(e) => handleInputChange(e, 'application')}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="url"
                    name="resumeUrl"
                    placeholder="Resume URL (optional)"
                    value={jobApplication.resumeUrl}
                    onChange={(e) => handleInputChange(e, 'application')}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn Profile (optional)"
                    value={jobApplication.linkedin}
                    onChange={(e) => handleInputChange(e, 'application')}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="Portfolio/GitHub (optional)"
                    value={jobApplication.portfolio}
                    onChange={(e) => handleInputChange(e, 'application')}
                    className="border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <textarea
                  name="coverLetter"
                  placeholder="Cover Letter"
                  value={jobApplication.coverLetter}
                  onChange={(e) => handleInputChange(e, 'application')}
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-button-red text-white py-2 px-6 rounded-full font-semibold hover:bg-button-hover-red"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApplicationFormOpen(false);
                      setSelectedJob(null);
                    }}
                    className="bg-gray-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-xl text-gray-500 py-12">
              No jobs found matching your criteria.
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-site-black mb-2">{job.title}</h3>
                    <p className="text-lg text-gray-600 mb-1">{job.company}</p>
                    <p className="text-gray-500">{job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-button-red text-white px-3 py-1 rounded-full text-sm font-medium">
                      {job.type}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">Posted: {job.postedDate}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{job.description}</p>
                
                {job.requirements && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                    <p className="text-gray-600">{job.requirements}</p>
                  </div>
                )}
                
                {job.salary && (
                  <p className="text-lg font-semibold text-green-600 mb-4">{job.salary}</p>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {job.category}
                  </span>
                  {isSignedIn && (
                    <button 
                      onClick={() => openApplicationForm(job)}
                      className="bg-button-red text-white py-2 px-6 rounded-full font-semibold hover:bg-button-hover-red"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function JobBoard() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BaseLayout>
          <JobBoardContent />
        </BaseLayout>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default JobBoard;