import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgrammerCard = ({ programmer }) => {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate(`/programmer-profile/${programmer.id}`);
  };

  const profilePicture = programmer.profile_picture
    ? `http://127.0.0.1:8000/media/programmer_pictures/${programmer.profile_picture}`
    : 'http://127.0.0.1:8000/media/programmer_pictures/default_image.jpg'; // Default image URL if no profile picture is available

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-img-container">
          <img
            src={profilePicture}
            className="card-img-top"
            alt={programmer.user ? programmer.user.name : 'Programmer'}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{programmer.user ? programmer.user.name : 'Programmer'}</h5>
          <p className="card-text"><strong>{programmer.categories ? programmer.categories.name : 'No Category'}</strong></p>
          <p className="card-text"><strong>Skills:</strong> {programmer.skills}</p>
        </div>
        <div className="card-footer text-center">
          <button
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#1d899a', color: '#fff', border: 'none' }}
            onClick={handleSeeMoreClick}
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgrammerCard;