import React from 'react'
import CategoryCard from './CategoryCard.js'



function Categories() {
    const lizardInfo = {name:"Lizzard", description: "Lizards from all sizes are included. Lizards are one the most amazing creatures on earth",image: "./images/lizard.jpg",route: "/search", search: 'lizzard'};
    const bluespace = {name: "BlueSPace", description :"Quiz on blue space the website", 
    image: "./images/logo11.png",route: "/search", search: 'bluespace'};
    const filler = {name: "Filler", description :"Will search for test", image: "./images/logo11.png",route: "/search", search: "test"};
    const catinfo = [bluespace,lizardInfo,filler]
    return (
      <div
        className={['flex-container', 'wrap'].join(
          " "
        )}
      >
        {catinfo.map((elem) => (
          <div className='flex-item'>
            <CategoryCard category={elem} />
          </div>
        ))}
      </div>
    );
}

export default Categories
