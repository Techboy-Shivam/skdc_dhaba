// import React from 'react'
// import HeroSection from '../../components/HeroSection'
// import About from '../../components/About'
// import Qualities from '../../components/Qualities'
// import Menu from '../../components/Menu'
// import WhoAreWe from '../../components/WhoAreWe'
// import Team from '../../components/Team'
// import Reservation from '../../components/Reservation'
// import Footer from '../../components/Footer'

// const Home = () => {
//   return (
//     <>
//       <HeroSection/>
//       <About/>
//       <Qualities/>
//       <Menu/> 
//       <WhoAreWe/>
//       <Team/>
//       <Reservation/>
//       <Footer/>
//     </>
//   )
// }

// export default Home
import React, { useState, useEffect } from 'react'
import HeroSection from '../../components/HeroSection'
import About from '../../components/About'
import Qualities from '../../components/Qualities'
import Menu from '../../components/Menu'
import WhoAreWe from '../../components/WhoAreWe'
import Team from '../../components/Team'
import Reservation from '../../components/Reservation'
import Footer from '../../components/Footer'
import WelcomeAnimation from '../../components/WelcomeAnimation'

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Show welcome animation every time the page loads
    // Hide welcome animation after 3.5 seconds (animation is 3s, give extra time for transition)
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showWelcome && <WelcomeAnimation />}
      
      <div className={showWelcome ? 'hidden' : 'block'}>
        <HeroSection/>
        <About/>
        <Qualities/>
        <Menu/> 
        <WhoAreWe/>
        <Team/>
        <Reservation/>
        <Footer/>
      </div>
    </>
  )
}

export default Home

