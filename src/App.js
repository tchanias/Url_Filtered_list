import React, { useState } from "react";
import "./App.css";
import Filters from "./Filters/Filters";
import Card from "./Card/Card";
import { cars, getUrlParameter, filters, uriToString } from "./Configs";

function App() {
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [pageLoaded, setPageLoaded] = useState(false);
  const { nameString, categoryString, conditionString } = filters;

  /**
   * Maps a car array and displays a JSx for each item
   *
   * @returns {JSx}
   */
  const getCarList = function() {
    let name = getUrlParameter(nameString);
    let category = getUrlParameter(categoryString);
    let condition = getUrlParameter(conditionString);

    return cars.map((car, index) => {
      if (
        (name === "" || (name !== "" && uriToString(name) === car.name)) &&
        (category === "" ||
          (category !== "" && uriToString(category) === car.category)) &&
        (condition === "" ||
          (condition !== "" && uriToString(condition) === car.condition))
      ) {
        return (
          <Card
            name={car.name}
            price={car.price}
            image={car.image}
            category={car.category}
            condition={car.condition}
            key={index}
          />
        );
      }
    });
  };

  return (
    <div className="App">
      <div className={"filters"}>
        <Filters
          condition={condition}
          setCondition={value => setCondition(value)}
          category={category}
          setCategory={value => setCategory(value)}
          name={name}
          setName={value => setName(value)}
          setPageLoaded={value => setPageLoaded(value)}
        />
      </div>
      <div className={"carlist"}>{pageLoaded ? getCarList() : null}</div>
    </div>
  );
}

export default App;
