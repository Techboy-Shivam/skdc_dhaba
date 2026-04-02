// import React, { useState } from "react";

import React from 'react';
import { data } from '../restApi.json';

const Menu = () => {
  return (
    <>
      <section className='menu' id='menu'>
        <div className="container">
          <div className="heading_section">
            <h1 className="heading">POPULAR DISHES</h1>
            <p>
              Paneer Butter Masala, Masala Dosa, Chole Bhature,
              Dal Makhani, Aloo Paratha,
              Palak Paneer, Veg Biryani, Rajma Chawal,
              Baingan Bharta, Kadai Paneer
            </p>
          </div>

          {/* Dishes Grid */}
          <div className="dishes_container">
            {
              data[0].dishes.map(element => (
                <div className="card" key={element.id}>
                  <img src={element.image} alt={element.title} />
                  <h3>{element.title}</h3>
                  <button>{element.category}</button>
                </div>
              ))
            }
          </div>

          {/* Full Width Menu Card Image */}
          <h1 className="text-xl text-center mb-4 font-semibold">Explore SKDC Special MenuCard</h1>
          <div className="menu-card-image" style={{ margin: '10px 0' }}>
            <img
              src="./SKDC menu.png" 
              alt="Menu Card"
              style={{
                width: '100%',
                height: '80 px',
                display: 'block',
                margin: '0 auto',
                borderRadius: '10px',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
