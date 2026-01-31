import React from 'react'
import Hero from '../Components/Hero'
import LatestListings from '../Components/LatestListings'
import Plans from '../Components/plans'
import CTA from '../Components/cta'
import Footer from '../Components/footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestListings />
      <Plans />
      <CTA/>
      <Footer/>
    </div>
  )
}

export default Home
