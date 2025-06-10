import React from 'react'
import Hero from '../../components/section/Hero/Hero'
import FeaturedDestination from '../../components/section/FeaturedDestination/FeaturedDestination'
import ExclusiveOffers from '../../components/section/ExclusiveOffers/ExclusiveOffers'
import Testimonial from '../../components/section/Testimonial/Testimonial'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial/>
    </>
  )
}

export default Home