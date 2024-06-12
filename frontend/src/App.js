import React, { useState } from 'react';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import { FaCode, FaMobileAlt, FaCloud, FaDatabase, FaRobot, FaPalette } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <CNavbar expand="lg" className="bg-body-tertiary">
        <CContainer fluid>
          <CNavbarBrand href="#">
            <img src="/static/ddd.png" alt="" style={{ maxHeight: '100px' }} />
          </CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Our Team</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Sami</CDropdownItem>
                  <CDropdownItem href="#">Aj</CDropdownItem>
                  <CDropdownItem href="#">Paula</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Our Product</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="#">Find Work</CDropdownItem>
                  <CDropdownItem href="#">Why P.C.P</CDropdownItem>
                  <CDropdownItem href="#">News</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
            <CNavbarNav className="ms-auto">
              <CForm className="d-flex me-3">
                <CFormInput type="search" placeholder="Search" />
                <CButton type="submit" color="success" variant="outline" className="ms-2">
                  Search
                </CButton>
              </CForm>
              <CNavItem>
                <CButton color="primary" className="me-2">Login</CButton>
              </CNavItem>
              <CNavItem>
                <CButton color="secondary">Sign up</CButton>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>

      <div className="main-content">
        <MDBContainer>
          <MarketingMessage />
          <Categories />
        </MDBContainer>
      </div>
    </div>
  );
}

function MarketingMessage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const slides = [
    {
      title: "How work should work",
      text: "Forget the old rules. You can have the best people. Right now. Right here.",
      image: "https://www.careergirls.org/wp-content/uploads/2015/06/Computer_Programmer1920X10180.jpg"
    },
    {
      title: "Another great headline",
      text: "Find the best talent for your projects in just a few clicks.",
      image: "https://usa.bootcampcdn.com/wp-content/uploads/sites/106/2021/03/CDG_blog_post_image_02-850x412.jpg"
    },
    {
      title: "Work efficiently",
      text: "Optimize your workflow with the best tools available.",
      image: "https://cdn3.f-cdn.com/files/download/97941784/programmin.jpg"
    },
    {
      title: "Collaboration at its best",
      text: "Work with teams across the globe seamlessly.",
      image: "https://kazokku.com/blog/wp-content/uploads/2023/06/apa-itu-programmer.webp"
    }
  ];

  return (
    <div className="marketing-message">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <MDBRow>
              <MDBCol size="md-6">
                <h2 className="title">{slide.title}</h2>
                <p className="text">{slide.text}</p>
              </MDBCol>
              <MDBCol size="md-6" className="image-container">
                <img src={slide.image} alt={slide.title} className="uploaded-image" />
              </MDBCol>
            </MDBRow>
          </div>
        ))}
      </Slider>
    </div>
  );
}

function Categories() {
  const categories = [
    { 
      id: 1, 
      name: "Development and IT", 
      buttonText: ["JavaScript", "Python", "Java", "C#", "C++"].join(", "), 
      icon: <FaCode /> 
    },
    { 
      id: 2, 
      name: "AI Services", 
      buttonText: ["Python", "Java", "R", "Scala"].join(", "), 
      icon: <FaRobot /> 
    },
    { 
      id: 3, 
      name: "Design and Creative", 
      buttonText: ["Photoshop", "Illustrator", "InDesign"].join(", "), 
      icon: <FaPalette /> 
    },
    { 
      id: 4, 
      name: "Mobile Development", 
      buttonText: ["Swift", "React Native", "Flutter"].join(", "), 
      icon: <FaMobileAlt /> 
    },
    { 
      id: 5, 
      name: "Cloud Computing", 
      buttonText: ["AWS", "Google Cloud", "IBM Cloud"].join(", "), 
      icon: <FaCloud /> 
    },
    { 
      id: 6, 
      name: "Data Science", 
      buttonText: ["Python", "R", "SQL", "Scala"].join(", "), 
      icon: <FaDatabase /> 
    },
  ];

  const handleCategoryClick = (category) => {
    console.log(`Category ${category.name} clicked`);
    // Aquí puedes manejar la navegación a otra página si es necesario
  };

  return (
    <MDBContainer className="categories-container">
      <h2 className="categories-title">Find talent by category</h2>
      <MDBRow className="category-row">
        {categories.map(category => (
          <MDBCol key={category.id} size="md-4">
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

export default App;
