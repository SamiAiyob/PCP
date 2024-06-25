import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { FaCode, FaMobileAlt, FaCloud, FaDatabase, FaRobot, FaPalette } from 'react-icons/fa';
import '../App.css'; // Import CSS file

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Web Developer",
      buttonText: ["JavaScript", "Python", "Java", "C#", "C++"].join(", "),
      icon: <FaCode />
    },
    {
      id: 2,
      name: "Backend Developer",
      buttonText: ["Python", "Java", "R", "Scala"].join(", "),
      icon: <FaRobot />
    },
    {
      id: 3,
      name: "Networking",
      buttonText: ["Photoshop", "Illustrator", "InDesign"].join(", "),
      icon: <FaPalette />
    },
    {
      id: 4,
      name: "AI/Machine Learning",
      buttonText: ["Swift", "React Native", "Flutter"].join(", "),
      icon: <FaMobileAlt />
    },
    {
      id: 5,
      name: "Cloud Services",
      buttonText: ["AWS", "Google Cloud", "IBM Cloud"].join(", "),
      icon: <FaCloud />
    },
    {
      id: 6,
      name: "Admin/Customer Support",
      buttonText: ["Python", "R", "SQL", "Scala"].join(", "),
      icon: <FaDatabase />
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}`);
  };

  return (
    <MDBContainer className="categories-container">
      <h2 className="categories-title">Find talent by category</h2>
      <MDBRow className="category-row">
        {categories.map(category => (
          <MDBCol key={category.id} xs="12" sm="6" md="4" className="mb-4">
            <div className="category-button" onClick={() => handleCategoryClick(category)}>
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.buttonText}</p>
              </div>
            </div>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Categories;