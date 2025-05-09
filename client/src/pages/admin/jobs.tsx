import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';
import { API_BASE_URL } from '@/config';

interface Job {
  _id: string;
  title: string;
  description: string;
  postedBy: string;
  applicants: Applicant[];
  status: string;
}

interface Applicant {
  _id: string;
  fullName: string;
  applicationStatus: 'pending' | 'shortlisted' | 'rejected' | 'selected';
}

// Extend User type for this page
interface OrgUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  accountType: 'organization' | 'individual';
  isPaidMember?: boolean;
  jobPostsThisYear?: number;
}

const Jobs: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showPostForm, setShowPostForm] = useState<boolean>(false);
  const [newJob, setNewJob] = useState<{ title: string; description: string }>({ title: '', description: '' });
  const [posting, setPosting] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [applicantsLoading, setApplicantsLoading] = useState<boolean>(false);
  const [statusUpdating, setStatusUpdating] = useState<boolean>(false);
  const [quotaMsg, setQuotaMsg] = useState<string>('');

  // Role checks
  const isAdmin = user?.role === 'admin';
  const isOrg = user?.accountType === 'organization';
  const orgUser = isOrg ? (user as OrgUser) : null;

  // Fetch jobs
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    let url = `${API_BASE_URL}/api/job`;
    if (isOrg && orgUser) {
      url += `?postedBy=${orgUser._id}`;
    }
    fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setJobs(data.jobs || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load jobs');
        setLoading(false);
      });
  }, [user, isOrg, orgUser]);

  // Quota logic for orgs/admins
  useEffect(() => {
    if (isAdmin) {
      setQuotaMsg('Admin: Managing all jobs. No posting restrictions.');
    } else if (isOrg && orgUser) {
      if (orgUser.isPaidMember) {
        setQuotaMsg('You are a paid member. Unlimited job posts.');
      } else {
        setQuotaMsg(`Free posts left this year: ${Math.max(0, 2 - (orgUser.jobPostsThisYear || 0))} / 2`);
      }
    } else {
      setQuotaMsg('');
    }
  }, [isAdmin, isOrg, orgUser]);

  // Post a new job
  const handlePostJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPosting(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/job/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newJob),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to post job');
      setJobs(jobs.concat(data.job));
      setShowPostForm(false);
      setNewJob({ title: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPosting(false);
    }
  };

  // View applicants for a job
  const handleViewApplicants = async (job: Job) => {
    setSelectedJob(job);
    setApplicantsLoading(true);
    setApplicants([]);
    try {
      const res = await fetch(`${API_BASE_URL}/api/job/applicants/${job._id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setApplicants(data.applicants || []);
    } catch {
      setApplicants([]);
    } finally {
      setApplicantsLoading(false);
    }
  };

  // Update applicant status
  const handleStatusUpdate = async (applicationId: string, status: Applicant['applicationStatus']) => {
    setStatusUpdating(true);
    try {
      await fetch(`${API_BASE_URL}/api/job/application-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ applicationId, status }),
      });
      setApplicants(applicants.map(app =>
        app._id === applicationId ? { ...app, applicationStatus: status } : app
      ));
    } catch {}
    setStatusUpdating(false);
  };

  if (!isAdmin && !isOrg) {
    return <div className="p-6">You must be logged in as an organization or admin to manage jobs.</div>;
  }

  // For orgs
  const isPaidMember = isOrg && orgUser?.isPaidMember;
  const jobPostsThisYear = isOrg ? orgUser?.jobPostsThisYear || 0 : 0;

    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Jobs Management</h1>
      <div className="mb-4 text-gray-700">{quotaMsg}</div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        className="bg-primary text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowPostForm(!showPostForm)}
        disabled={isOrg && !isPaidMember && jobPostsThisYear >= 2}
      >
        {showPostForm ? 'Cancel' : 'Post New Job'}
      </button>
      {showPostForm && (
        <form className="mb-6" onSubmit={handlePostJob}>
          <input
            className="border px-2 py-1 mr-2"
            placeholder="Job Title"
            value={newJob.title}
            onChange={e => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <input
            className="border px-2 py-1 mr-2"
            placeholder="Description"
            value={newJob.description}
            onChange={e => setNewJob({ ...newJob, description: e.target.value })}
            required
          />
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            type="submit"
            disabled={posting}
          >
            {posting ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      )}
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Applicants</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id} className="border-t">
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.description}</td>
                <td className="p-2">{job.status}</td>
                <td className="p-2">{job.applicants?.length || 0}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => handleViewApplicants(job)}
                  >
                    View Applicants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Applicants Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setSelectedJob(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">Applicants for: {selectedJob.title}</h2>
            {applicantsLoading ? (
              <div>Loading applicants...</div>
            ) : applicants.length === 0 ? (
              <div>No applicants yet.</div>
            ) : (
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Name</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map(app => (
                    <tr key={app._id} className="border-t">
                      <td className="p-2">{app.fullName}</td>
                      <td className="p-2">{app.applicationStatus}</td>
                      <td className="p-2">
                        {["pending", "shortlisted", "rejected", "selected"].map(status => (
                          <button
                            key={status}
                            className={`px-2 py-1 mx-1 rounded ${app.applicationStatus === status ? 'bg-primary text-white' : 'bg-gray-200'}`}
                            disabled={statusUpdating || app.applicationStatus === status}
                            onClick={() => handleStatusUpdate(app._id, status as Applicant['applicationStatus'])}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
      </div>
    );
  };

  export default Jobs;