import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/config';

interface ForumPost {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'upcoming' | 'past';
  registrationLink?: string;
}

// ✅ Type used to avoid '_id' in form state
type ForumFormData = Omit<ForumPost, '_id'>;

const Forum = () => {
  const [forums, setForums] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingForum, setEditingForum] = useState<ForumPost | null>(null);

  // ✅ Correctly typed formData state
  const [formData, setFormData] = useState<ForumFormData>({
    title: '',
    date: '',
    location: '',
    description: '',
    type: 'upcoming',
    registrationLink: ''
  });

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/forum`, {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch forums');
      }
      const data = await response.json();
      setForums(data.forums || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching forums:', err);
      setError('Failed to fetch forums');
      setForums([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingForum
        ? `${API_BASE_URL}/api/forum/${editingForum._id}`
        : `${API_BASE_URL}/api/forum`;

      const response = await fetch(url, {
        method: editingForum ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchForums();
        resetForm();
      }
    } catch (err) {
      console.error('Error saving forum:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this forum?')) {
      try {
        await fetch(`${API_BASE_URL}/api/forum/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        await fetchForums();
      } catch (err) {
        console.error('Error deleting forum:', err);
      }
    }
  };

  const handleEdit = (forum: ForumPost) => {
    setEditingForum(forum);
    setFormData({
      title: forum.title,
      date: forum.date,
      location: forum.location,
      description: forum.description,
      type: forum.type,
      registrationLink: forum.registrationLink || ''
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      type: 'upcoming',
      registrationLink: ''
    });
    setEditingForum(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forum Management</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-md"
        >
          {showForm ? 'Cancel' : 'Add New Forum'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ForumFormData['type'] })}
                className="w-full p-2 border rounded"
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Registration Link</label>
              <input
                type="url"
                value={formData.registrationLink}
                onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={4}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {editingForum ? 'Update Forum' : 'Create Forum'}
          </button>
        </form>
      )}

      {error && (
        <div className="text-red-600 mb-4 p-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {forums && forums.length > 0 ? (
            forums.map((forum) => (
              <div key={forum._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{forum.title}</h3>
                    <p className="text-gray-600">{forum.date} · {forum.location}</p>
                    <p className="mt-2">{forum.description}</p>
                    <span className={`mt-2 inline-block px-2 py-1 rounded text-sm ${
                      forum.type === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {forum.type}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(forum)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(forum._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No forums available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Forum;
