import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CSpinner, CAlert, CButton, CForm, CFormLabel, CFormInput, CFormTextarea, CFormSelect } from '@coreui/react';
import './ProgrammerProfile.css';

const ProgrammerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [programmerData, setProgrammerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    experience: 0,
    rate: 0,
    category_id: '',
    skills: '',
    bio: '',
    profile_picture: null,
    cv: null,
  });

  useEffect(() => {
    const fetchProgrammerData = async () => {
      try {
        console.log(`Fetching data for programmer with ID: ${id}`);
        const response = await axios.get(`http://127.0.0.1:8000/programmers/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        console.log('Programmer data fetched successfully:', response.data);
        setProgrammerData(response.data);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone_number: response.data.phone_number,
          address: response.data.address,
          experience: response.data.experience,
          rate: response.data.rate,
          category_id: response.data.categories ? response.data.categories.id : '',
          skills: response.data.skills,
          bio: response.data.bio,
          profile_picture: response.data.profile_picture,
          cv: response.data.cv,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching programmer data:', error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/categories/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProgrammerData();
    fetchCategories();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/programmers/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        navigate('/');
      } catch (error) {
        setError(error);
      }
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    const user = {
      name: formData.name,
      email: formData.email,
    };

    form.append('user', JSON.stringify(user));

    for (let key in formData) {
      if (key !== 'name' && key !== 'email') {
        if (formData[key] !== null) {
          form.append(key, formData[key]);
        }
      }
    }

    try {
      await axios.put(`http://127.0.0.1:8000/programmers/${id}/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setEditing(false);
      const response = await axios.get(`http://127.0.0.1:8000/programmers/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
      setProgrammerData(response.data);
    } catch (error) {
      console.error('Error updating programmer data:', error.response.data);
      setError(error);
    }
  };

  if (loading) return <CSpinner color="primary" />;
  if (error) return <CAlert color="danger">Error loading programmer data: {error.message}</CAlert>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        {editing ? (
          <CForm onSubmit={handleSubmit}>
            <div className="profile-picture">
              {formData.profile_picture && (
                <img
                  src={formData.profile_picture}
                  alt={`${formData.name}'s profile`}
                  className="img-fluid rounded-circle"
                />
              )}
            </div>
            <div className="profile-details">
              <div className="mb-3">
                <CFormLabel htmlFor="name">Full Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phone_number">Phone Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="experience">Experience</CFormLabel>
                <CFormInput
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="rate">Rate</CFormLabel>
                <CFormInput
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  min={10}
                  max={100}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="category_id">Category</CFormLabel>
                <CFormSelect
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="skills">Skills</CFormLabel>
                <CFormInput
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="bio">Bio</CFormLabel>
                <CFormTextarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="cv">CV</CFormLabel>
                <CFormInput
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleFileChange}
                />
              </div>
              <CButton type="submit" color="primary">Update</CButton>
            </div>
          </CForm>
        ) : (
          <>
            {programmerData.profile_picture && (
              <div className="profile-picture">
                <img
                  src={programmerData.profile_picture}
                  alt={`${programmerData.user.name}'s profile`}
                  className="img-fluid rounded-circle"
                />
              </div>
            )}
            <div className="profile-details">
              <h2>{programmerData.user.name}</h2>
              <p><strong>Email:</strong> {programmerData.user.email}</p>
              <p><strong>Experience:</strong> {programmerData.experience} years</p>
              <p><strong>Rate:</strong> ${programmerData.rate} per hour</p> {/* Displaying the rate */}
              <p><strong>Sector:</strong> {programmerData.categories ? programmerData.categories.name : 'N/A'}</p>
              <h3>Skills</h3>
              <p>{programmerData.skills}</p>
              <h3>Bio</h3>
              <p>{programmerData.bio}</p>
              {programmerData.cv && (
                <p><strong>CV:</strong> <a href={programmerData.cv} target="_blank" rel="noopener noreferrer">Download CV</a></p>
              )}
              <div className="profile-buttons">
                <CButton color="info" onClick={handleEdit} className="me-2">Edit Profile</CButton>
                <CButton color="danger" onClick={handleDelete}>Delete Profile</CButton>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgrammerProfile;