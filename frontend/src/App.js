import React, { useState } from 'react';
import '@coreui/coreui/dist/css/coreui.min.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';

import Navbar from './components/Navbar';
import MarketingMessage from './components/MarketingMessage';
import Categories from './components/Categories';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="App">
      <Navbar visible={visible} setVisible={setVisible} />
      <div className="main-content">
        <MDBContainer>
          <MarketingMessage />
          <Categories />
        </MDBContainer>
      </div>
    </div>
  );
}

export default App;