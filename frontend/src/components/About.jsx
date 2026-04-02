import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";


const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>

              <h3>SK DELECIOUS n DINING CENTER DHABA</h3>
              <p>The only thing we're serious about is food.</p>
              
            </div>
            <p className="mid">
            Welcome to our restaurant – where tradition meets a modern touch. 
            Every dish is made with love, fresh ingredients, and bold flavors.
            Whether you dine in or order online, we’re here to serve you a 
            delicious experience that hits the spot and leaves you smiling. 

            </p>
            
            <Link to={"Display Conn lost msg replace by (Menu)"}>
              404 Page{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link> 
                   
                  
                
              
            
          </div>
          <div className="banner">
            <img src="about.png" alt="about"  />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
