import React from "react";
import "./Card.css";
import { commatize } from "../Configs";

export default function Card(props) {
  const name = props.name;
  const key = props.key;
  const category = props.category;
  const condition = props.condition;
  const price = props.price;
  const image = props.image;
  return (
    <div className={"car"} key={key}>
      <div className={"car_image"}>
        <img src={image} />
      </div>
      <div className={"car_info"}>
        <div className={"car_info_name"}>{name}</div>
        <div className={"car_info_details"}>
          <div className={"car_info_details_category"}>
            Category: {category}
          </div>
          <div className={"car_info_details_condition"}>
            Condition: {condition}
          </div>
          <div className={"car_info_details_price"}>
            Price: {commatize(price)}€
          </div>
        </div>
      </div>
    </div>
  );
}
