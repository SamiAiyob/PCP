import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CButton,
    CForm,
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CSpinner,
    CAlert
} from '@coreui/react';

const ProgrammerProfile = () => {
    const { id } = useParams(); // Retrieve programmer ID from URL params
    const navigate = useNavigate();
    const [programmerData, setProgrammerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
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
        cv: null
    });

    useEffect(() => {
        const fetchProgrammerData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/programmers/${id}/`);
                setProgrammerData(response.data);
                setFormData({
                    name: response.data.user.name,
                    email: response.data.user.email,
                    phone_number: response.data.phone_number,
                    address: response.data.address,
                    experience: response.data.experience,
                    rate: response.data.rate,
                    category_id: response.data.category ? response.data.category.id : '',
                    skills: response.data.skills,
                    bio: response.data.bio,
                    profile_picture: response.data.profile_picture,
                    cv: response.data.cv
                });
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProgrammerData();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/programmers/${id}/`);
                navigate('/'); // Redirect to home or another page after deletion
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
            email: formData.email
        };

        form.append('user', JSON.stringify(user)); // Append user object as JSON string

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
                },
            });
            setEditing(false);
            // Optionally refetch programmer data
            const response = await axios.get(`http://127.0.0.1:8000/programmers/${id}/`);
            setProgrammerData(response.data);
        } catch (error) {
            console.error('Error response:', error.response.data); // Log server response
            setError(error);
        }
    };

    if (loading) return <CSpinner color="primary" />;
    if (error) return <CAlert color="danger">Error loading programmer data: {error.message}</CAlert>;

    return (
        <CContainer>
            <CRow>
                <CCol md="20" className="mx-auto mt-4">
                    <CCard style={{ width: '40rem' }}>
                        <CCardHeader>
                            <h1>Programmer Profile</h1>
                        </CCardHeader>
                        <CCardBody>
                            {editing ? (
                                <CForm onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="name">Full Name</CFormLabel>
                                        <CFormInput type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="email">Email</CFormLabel>
                                        <CFormInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="phone_number">Phone Number</CFormLabel>
                                        <CFormInput type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="address">Address</CFormLabel>
                                        <CFormInput type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="experience">Experience</CFormLabel>
                                        <CFormInput type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="rate">Rate</CFormLabel>
                                        <CFormInput type="number" id="rate" name="rate" value={formData.rate} onChange={handleChange} min={1} max={10} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="skills">Skills</CFormLabel>
                                        <CFormInput type="text" id="skills" name="skills" value={formData.skills} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="bio">Bio</CFormLabel>
                                        <CFormTextarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <CFormLabel htmlFor="cv">CV</CFormLabel>
                                        <CFormInput type="file" id="cv" name="cv" onChange={handleFileChange} />
                                    </div>
                                    <CButton type="submit" color="primary">Update</CButton>
                                </CForm>
                            ) : (
                                <div>
                                    {programmerData.profile_picture && (
                                        <img
                                            src={programmerData.profile_picture}
                                            alt="Profile"
                                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                                        />
                                    )}
                                    <p><strong>Name:</strong> {programmerData.user.name}</p>
                                    <p><strong>Email:</strong> {programmerData.user.email}</p>
                                    <p><strong>Phone Number:</strong> {programmerData.phone_number}</p>
                                    <p><strong>Address:</strong> {programmerData.address}</p>
                                    <p><strong>Experience:</strong> {programmerData.experience} years</p>
                                    <p><strong>Rate:</strong> ${programmerData.rate} per hour</p>
                                    <p><strong>Category:</strong> {programmerData.categories ? programmerData.categories.name : 'N/A'}</p>
                                    <p><strong>Skills:</strong> {programmerData.skills}</p>
                                    <p><strong>Bio:</strong> {programmerData.bio}</p>
                                    {programmerData.cv && (
                                        <p><strong>CV:</strong> <a href={programmerData.cv} target="_blank" rel="noopener noreferrer">Download CV</a></p>
                                    )}
                                    <CButton color="info" onClick={handleEdit}>Edit Profile</CButton> <br/><br/>
                                    <CButton color="danger" onClick={handleDelete}>Delete Profile</CButton>
                                </div>
                            )}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    );
};

export default ProgrammerProfile;