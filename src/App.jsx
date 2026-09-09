import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ProductViewer from './components/ProductViewer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Showcase from './components/Showcase'

//Makes sure gsap is accessable throughout the whole application which is why its in this file. 
gsap.registerPlugin(ScrollTrigger)

const App = () => {
  return (
    <main>
        <NavBar/>
        <Hero/>
        <ProductViewer/>
        <Showcase/>
        
    </main>
  )
}

export default App