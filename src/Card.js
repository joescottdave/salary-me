import React, { Component } from "react";
import "./Card.css";

const Card = ({ children }) => {
  return <div className="Card">{children}</div>;
};

export default Card;
