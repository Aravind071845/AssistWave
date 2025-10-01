import React from 'react'
import Footer from '../components/Footer';
import Features from '../components/Features';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ReviewsCarousel from '../components/ReviewsCarousel';

function Landingpage() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Features/>
      <ReviewsCarousel/>
      <Footer/>
    </>
  )
}

export default Landingpage