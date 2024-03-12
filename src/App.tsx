import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Claims } from './Claims';
import { Covers } from './Covers';
import { Home } from './Home';

const Navbar = styled.div`
  display: flex;
  align-items: center;
  & a {
  color: currentColor;
  text-decoration: none;
  }
  background-color: LightGray;
  height: 50px;
`;

const NavLink = styled(Link)`
  font-weight: bolder;
  padding: 10px;
  &:hover {
    background-color: white;
  }
`;

const Content = styled.div`
  margin: 50px;
`;

function App() {
  return (
    <Router>
      <Navbar>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/claims">Claims</NavLink>
        <NavLink to="/covers">Covers</NavLink>
      </Navbar>
      <Content>
        <Routes>
          <Route path="/claims" element={<Claims />} />
          <Route path="/covers" element={<Covers />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
