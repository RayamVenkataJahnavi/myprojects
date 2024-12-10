import React from 'react';
import { Home, ShoppingCart, Phone } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Header = ({ onCategoryClick }) => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to the section
  };

  const handleHomeClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <header className="header">
      <div>
        <figure id="logotext">
          <h1>Bake My Cake!</h1>
          <h3 id="logot">Celebrate Your Moment</h3>
        </figure>
        <div className="IconContainer" style={{ marginLeft: '1000px', paddingTop: '18px', color: 'gray' }}>
          <IconButton color="inherit" aria-label="home" onClick={handleHomeClick}>
            <Home />
          </IconButton>
          <IconButton color="inherit" aria-label="cart">
            <ShoppingCart />
          </IconButton>
          <IconButton color="inherit" aria-label="phone">
            <Phone />
          </IconButton>
        </div>
      </div>
      <nav className="navbar" data-testid="links">
        <ul className="nav-links">
          <li><a href="#all" onClick={() => { onCategoryClick(""); handleScrollToSection("images-section"); }}>All</a></li>
          <li><a href="#cakes" onClick={() => { onCategoryClick("Cakes"); handleScrollToSection("images-section"); }}>Cakes</a></li>
          <li><a href="#cupcakes" onClick={() => { onCategoryClick("Cup Cakes"); handleScrollToSection("images-section"); }}>Cup Cakes</a></li>
          <li><a href="#cheesecakes" onClick={() => { onCategoryClick("Cheese Cakes"); handleScrollToSection("images-section"); }}>Cheese Cakes</a></li>
          <li><a href="#cookies" onClick={() => { onCategoryClick("Cookies"); handleScrollToSection("images-section"); }}>Cookies</a></li>
          <li><a href="#brownies" onClick={() => { onCategoryClick("Brownies"); handleScrollToSection("images-section"); }}>Brownies</a></li>
          <li><a href="#chocolates" onClick={() => { onCategoryClick("Chocolates"); handleScrollToSection("images-section"); }}>Chocolates</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
