import React from 'react'
import './Footer.css'
import Logo from '../../assets/img/SantArtlogo.png'

const Footer = () => {
  return (
    <div className='divFooter'>
        <img src={Logo} alt="logo" className='img'/>
        <p>2022 SantArt - Todos los derechos reservados.</p>
    </div>
  )
}

export default Footer