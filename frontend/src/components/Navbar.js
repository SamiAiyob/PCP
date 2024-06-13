import React, { useState } from 'react';
import { CNavbar, CContainer, CNavbarBrand, CNavbarToggler, CCollapse, CNavbarNav, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CForm, CFormInput, CButton } from '@coreui/react';
import MultilevelDropdown from 'react-multilevel-dropdown'; // Make sure to import the MultilevelDropdown component.

function Navbar({ visible, setVisible }) {
  const items = [
    { 
      title: 'Our Team',
      submenu: [
        { 
          title: 'Sami', 
          submenu: [
            { title: 'Samiiiiii jijiji '},

          ]
        },
        { 
          title: 'Aj', 
          submenu: [
            { title: 'Aj jajajja '},
          ]
        },
        { 
          title: 'Paula', 
          submenu: [
            { title: 'Paula jojojojo '},
          ]
        }
      ]
    },
    { 
      title: 'Our Product',
      submenu: [
        { title: 'Find Work' },
        { title: 'Why P.C.P' },
        { title: 'News'}
      ]
    }
  ];
  
  const [signupDropdownOpen, setSignupDropdownOpen] = useState(false);

  const toggleSignupDropdown = () => {
    setSignupDropdownOpen(!signupDropdownOpen);
  };

  return (
    <CNavbar expand="lg" className="bg-body-tertiary">
      <CContainer fluid>
        <CNavbarBrand href="#">
          <img src="/static/d.png" alt="" style={{ maxHeight: '140px' }} />
        </CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav>
            <MultilevelDropdown 
              title="Our Team" 
              items={items[0].submenu} 
            />
            <MultilevelDropdown 
              title="Our Product" 
              items={items[1].submenu} 
            />
          </CNavbarNav>
          <CNavbarNav className="ms-auto">
            <CForm className="d-flex me-3">
              <CFormInput type="search" placeholder="Search" />
              <CButton type="submit" color="success" variant="outline" className="ms-2">
                Search
              </CButton>
            </CForm>
            <CDropdown isOpen={signupDropdownOpen} toggle={toggleSignupDropdown}>
              <CDropdownToggle color="secondary">Sign up</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => console.log("Programador clicked")}>Programmers </CDropdownItem>
                <CDropdownItem onClick={() => console.log("Cliente clicked")}>Clients</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CButton color="primary" className="me-2" onClick={() => console.log("Login clicked")}>
              Login
            </CButton>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
}

export default Navbar;
