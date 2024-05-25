import React from "react";
import "./CardPlan.css";
import "./CardPlanMedia.css";
import { cardData } from "./cardData";

const CardPlan = () => {
  return (
    <>
      {cardData.map((item) => (
        <div
        
          key={item.id}
          className="CardPlan-Container"
        >
          <div className="CardPlan-Container-Main">
            <div className="CardPlan-title">
              <img src={item.image} alt="" />
              <h4>{item.name}</h4>
            </div>
            <div className="CardPlan-Duration">
              {" "}
              <h3>{item.duration}</h3>
            </div>
            <div className="CardPlan-Details">
              <div className="CardPlan_num">
                <h5>{item.Minimum}</h5>
                <h5>{item.Maximum}</h5>
                <h5>Principal : {item.Principal}</h5>
                <h5>Payout : {item.Payout}</h5>
                <h5>{item.Roi}</h5>
              </div>
              <div className="CardPlan-CTA">
                <button onClick={item.url}>{item.button}</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardPlan;
