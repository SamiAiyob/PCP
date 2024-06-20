import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProgrammerCard = ({ programmer }) => {
  const navigate = useNavigate();

  const handleSeeMoreClick = () => {
    navigate(`/programmer-profile/${programmer.id}`);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-img-container">
          <img
            src={`./static/${programmer.profile_picture}`}
            className="card-img-top"
            alt={programmer.name}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{programmer.name}</h5>
          <p className="card-text"><strong>{programmer.sector}</strong></p>
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