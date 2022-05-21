import React from "react";
import "../styles/service.css";

const Service = ({ list }) => {
  const { name, fa, text } = list;

  return (
    <div className="service-card s-box">
        <div className="service">
      <div className="service-item">
        <i>{fa}</i>
        <h1>{name}</h1>
        <p>{text}</p>
      </div>
      </div>
    </div>
  );
};

export default Service;
