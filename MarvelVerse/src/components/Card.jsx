import React from 'react'
import '../css/Card.css'

const Card = ({character}) => {
  return (
    <div className='card'>
      <div className="card-front">
        <div className="img-container">
        <img src={character.thumbnail.path+'.jpg'} alt="Character Image" className='card-img'/>

        </div>
        <h4 className='card-header'>{character.name}</h4>
       </div>
       <div className="card-back">
        <div className="card-desc-wrapper">
         <p className='card-desc'>{character.description!=""?character.description:'Description not available'}</p>
        </div>
        <div className="appearences">
            <p>Appears in {character.comics.available} comics</p>
            <p>Appears in {character.series.available} series</p>
        </div>

       </div>
    </div>
  )
}




              

export default Card