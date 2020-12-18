import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import tools_convenience from './tools-convenience.jpg'
import choice from './choice.jpg'
import money from './money.jpg'
import digi_safety from './digital-safety.jpg'
import img5 from './img5.jpg'
function Cards() {
    return (
        <div className='cards'>
            <h1 >WHY JOIN WITH US??</h1>
            <div className='cards__container'>
                <div className="cards__wrapper">
                    <ul className='cards__items'>
                        <CardItem
                        src={tools_convenience}
                        text='Store the entire history of your house at a single place!!!'
                        label='Convenient'
                        path='/'
                        />
                        <CardItem
                        src={choice}
                        text='Search from all available options for multiple choices!!'
                        label='Explore More!!'
                        path='./explore'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                        src={money}
                        text='Get an idea of the actual worth of the house you are interested in!!'
                        label='Get the actual worth!!'
                        path='/'
                        />
                        <CardItem
                        src={digi_safety}
                        text='Keep your data in a safe place!!'
                        label='Safety!!'
                        path='/'
                        />
                        <CardItem
                        src={img5}
                        text='Take the Subscription and get a chance to feature on our Home Page!!'
                        label='Subscribe!!!'
                        path='/'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
