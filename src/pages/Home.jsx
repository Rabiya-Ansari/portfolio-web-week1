import React from 'react'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import About from '../components/About'

function Home() {
  return (
    <>
    <Hero/>
    <About/>
    <Projects/>
    <Skills/>
    <Blog/>
    <Contact/>
    </>
  )
}

export default Home