import React from 'react'
import CategoryCard from './CategoryCard.js'


function Categories() {
    const lizardInfo = {name:"Lizzard", description: "Lizards from all sizes are included. Lizards are one the most amazing creatures on earth",image: "./images/lizard.jpg",route: "/"};
    const catinfo = [{name: "BlueSPace", description :"Quiz on blue space the website", 
    image: "./images/logo11.png",route: "/"},lizardInfo]
    return (
        <div>
            {catinfo.map((elem) => (
                <CategoryCard category={elem} />
            ))}
        </div>
    )
}

export default Categories
