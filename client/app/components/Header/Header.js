import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => (
  <header>
     <div style={{"display":"flex", "justify-content":"space-evenly", "background":"#6495ED"}}>
    <h3 style={{"margin-left":"550px", "color":"white"}}>BlockChain for digital Libraries</h3>
    <div style={{"display":"flex", "justify-content":"space-between", "margin-top":"20px"}}>
    <Link to="/" style={{"margin-right":"100px", "color":"white"}}>Home</Link>
    <Link to="/about" style={{"margin-right":"100px","color":"white"}}>About Us</Link>
    <Link to="/contact" style={{"margin-right":"100px","color":"white"}}>Contact Us</Link>
    </div>
    </div>
    <hr />
  </header>
);

export default Header;
