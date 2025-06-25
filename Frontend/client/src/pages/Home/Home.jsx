import React from 'react'
import Hero from '../../components/section/Hero/Hero'
import FeaturedDestination from '../../components/section/FeaturedDestination/FeaturedDestination'
import ExclusiveOffers from '../../components/section/ExclusiveOffers/ExclusiveOffers'
import Testimonial from '../../components/section/Testimonial/Testimonial'
import NewsLetter from '../../components/section/NewsLetter/NewsLetter'

const Home = () => {
  return (
    <>
        <Hero/>
        <FeaturedDestination/>
        <ExclusiveOffers/>
        <Testimonial/>
        <NewsLetter/>
    </>
  )
}

export default Home