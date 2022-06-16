import React, {useEffect, useState} from 'react';
import  '../Nav/nav.css';


const Nav = () => {
const [show, handleShow] = useState();
   
useEffect(()=>{
  window.addEventListener('scroll', ()=> {
    window.scrollY > 100 ? handleShow(true) : handleShow(false)
  })
  return () => {
    window.removeEventListener("scroll", null)
  }
},[])  
  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img 
      className='nav__logo' 
      src="https://upload.wikimedia.org/wikipedia/commons/archive/6/69/20220504140801%21Netflix_logo.svg" 
      alt="Netflix Logo" />

      <img
        className='nav__avatar'
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Logo" />
    </div>
  )
}

export default Nav;