import React from 'react';
import NavBar from './Navbar';
import Quote from './Quote';
import AboutUs from './AboutUs';
import CardContainer from './CardContainer';
import Footer from './footer';


const Home = () => (
  <div className="home">
  <NavBar/>
  <Quote/>
  <AboutUs/>
  <CardContainer/>
  <Footer/>
  </div>
);

export default Home;
