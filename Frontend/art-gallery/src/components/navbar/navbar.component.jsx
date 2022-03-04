import React from "react";
import styles from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import Logo from "../../assets/img/SantArtlogo.png";

export default function NavBar() {
  const [session, setSession] = useState(window.localStorage.getItem("user"));

  return (
    <div className={styles.navbar}>
      <img src={Logo} alt="logo" />
      <div className={styles.div_search}>
        <input
          type="text"
          name="Search"
          className={styles.search}
          placeholder="Busca tu obra o artista favorito"
        />
        <button>
          <BiSearch className={styles.icon_search} />
        </button>
      </div>
      <ul className={styles.nav_links}>
        <li>
          <NavLink to="/gallery" className={styles.links}>
            <h5>Galeria</h5>
          </NavLink>
        </li>
        <li>
          <NavLink to="/artists" className={styles.links}>
            <h5>Artistas</h5>
          </NavLink>
        </li>
        <li>
        <NavLink to="/contactus">
          <h5>Contacto</h5>
          </NavLink>
        </li>
        <h4>|</h4>
        {!session ? (
          <button className={styles.btn_access}>
            <FaUserAlt />
            <h4>Acceso</h4>
          </button>
        ) : (
          <li>
            <h5>¡Hola {session}!</h5>
          </li>
        )}
        <li>
          <AiOutlineShoppingCart className={styles.icon} />
        </li>
        <li>
          <AiOutlineHeart className={styles.icon} />
        </li>
      </ul>
    </div>
  );
}
