import React from "react";
import CardPaint from "../../components/CardPaint/CardPaint";
import { NavLink } from "react-router-dom";
import "./CardsPaints.css";

function CardsPaints({ paintings }) {
  return (
    <div className="containerCards">
      {paintings.length ?
        paintings.map((paint) => (
          <NavLink to={"/detailObra/" + paint.id} className="links" key={paint.id}>
            <CardPaint
              key={paint.id}
              image={paint.image}
              title={paint.title}
              artist={paint.artist}
              height={paint.height}
              width={paint.width}
              techniques={paint.techniques}
              price={paint.price}
            />
          </NavLink>
        )) : <h1 className="errorCardPaint">Not Results!</h1>}
    </div>
  );
}

export default CardsPaints;
