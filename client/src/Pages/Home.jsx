import React from 'react'
import Hero from '../Components/Hero'
import LatestListings from '../Components/LatestListings'
import plans from '../Components/plans'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestListings/>
        <plans/>
    </div>
  )
}

export default Home
