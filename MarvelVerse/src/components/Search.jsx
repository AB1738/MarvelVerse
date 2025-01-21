import React, { useState } from 'react'
import '../css/Search.css'

const Search = ({setCharQuery}) => {
    const [text,setText]=useState('')
    const submit=(e)=>{
        e.preventDefault()
        setCharQuery(text)
    }
   
  return (
    <section className='search'>
        <form onSubmit={(e)=>submit(e)}>
        <input type="text" value={text} placeholder='E.g Spider-Man'
        onChange={(e)=>setText(e.target.value)} required/>
        <button type='submit'><i className="fa-solid fa-circle-arrow-right"></i></button>
        </form>
    </section>
  )
}

export default Search