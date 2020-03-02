import React, { useState, useEffect, useRef } from "react";
import {
  cars,
  getUrlParameter,
  setUrlParameter,
  filters,
  uriToString,
  mapArrayForValue
} from "../Configs";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "./Filters.css";
export default function Filters(props) {
  const name = props.name;
  const setName = props.setName;
  const category = props.category;
  const setCategory = props.setCategory;
  const condition = props.condition;
  const setCondition = props.setCondition;
  const setPageLoaded = props.setPageLoaded;
  const { nameString, categoryString, conditionString } = filters;
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [names, setNames] = useState([]);
  const [stateUpdate, setStateUpdate] = useState(0);
  const [urlChecked, setUrlChecked] = useState(false);
  const nameRef = useRef(null);
  const catRef = useRef(null);
  const conRef = useRef(null);
  useEffect(() => {
    getFilterValues();
  }, []);

  useEffect(() => {
    if (conditions && conditions.length > 0) {
      getUrlValues();
    }
  }, [conditions]);

  useEffect(() => {
    if (urlChecked) {
      setPageLoaded(true);
    }
  }, [urlChecked]);

  /**
   * Function that gets the url query parameters for
   * name, category, condition and pre-fills the filters
   * with their values if they exist
   *
   */
  const getUrlValues = function() {
    let urlname = getUrlParameter(nameString);
    let urlcategory = getUrlParameter(categoryString);
    let urlcondition = getUrlParameter(conditionString);
    if (mapArrayForValue(names, decodeURIComponent(urlname))) {
      setName(uriToString(urlname));
    }
    if (mapArrayForValue(conditions, decodeURIComponent(urlcondition))) {
      setCondition(uriToString(urlcondition));
    }
    if (mapArrayForValue(categories, decodeURIComponent(urlcategory))) {
      setCategory(uriToString(urlcategory));
    }
    setUrlChecked(true);
  };

  /**
   * Function that maps every car item
   * and creates the arrays for name, category
   * and conditions based on the total of
   * different values the items have
   */
  const getFilterValues = function() {
    if (cars) {
      let tempCars = [];
      let tempCategories = [];
      let tempConditions = [];
      cars.map(car => {
        if (!mapArrayForValue(tempCars, car.name)) {
          tempCars.push({ label: car.name, value: car.name });
        }
        if (!mapArrayForValue(tempCategories, car.category)) {
          tempCategories.push({ label: car.category, value: car.category });
        }
        if (!mapArrayForValue(tempConditions, car.condition)) {
          tempConditions.push({ label: car.condition, value: car.condition });
        }
      });
      setCategories(tempCategories);
      setNames(tempCars);
      setConditions(tempConditions);
    } else {
      console.log("cars not found! (yet)");
      setTimeout(() => {
        getFilterValues();
      }, 1000);
    }
  };

  /**
   * Function which set the selected filter's value
   * and the corresponding url parameter's value
   *
   * @param {string} key
   * @param {click event} event
   */
  const setValue = function(key, event) {
    let value = event.target.value;
    var urlkey = key ? encodeURIComponent(key) : "",
      urlvalue = encodeURIComponent(value);
    var searchParams = new URLSearchParams(window.location.search);
    searchParams.set(urlkey, urlvalue);
    var newRelativePathQuery =
      window.location.origin + "?" + searchParams.toString();
    window.history.pushState(null, "", newRelativePathQuery);
    if (key === nameString) {
      setName(value);
    } else if (key === categoryString) {
      setCategory(value);
    } else if (key === conditionString) {
      setCondition(value);
    }
  };

  return (
    <div className="filters_container">
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Select
          autoWidth
          className={"filters_container_select"}
          ref={nameRef}
          value={name}
          onChange={event => {
            console.log("con change");
            setValue(nameString, event);
          }}
        >
          <MenuItem className={"no-selection"} value={""}>
            Name
          </MenuItem>

          {names.map((name, index) => {
            return (
              <MenuItem key={index} value={name.value}>
                {name.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          autoWidth
          className={"filters_container_select"}
          ref={catRef}
          value={category}
          onChange={event => {
            console.log("con change");
            setValue(categoryString, event);
          }}
        >
          <MenuItem className={"no-selection"} value={""}>
            Category
          </MenuItem>

          {categories.map((cat, index) => {
            return (
              <MenuItem key={index} value={cat.value}>
                {cat.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Condition</InputLabel>
        <Select
          autoWidth
          className={"filters_container_select"}
          ref={conRef}
          value={condition}
          onChange={event => {
            console.log("con change");
            setValue(conditionString, event);
          }}
        >
          <MenuItem className={"no-selection"} value={""}>
            Condition
          </MenuItem>
          {conditions.map((cond, index) => {
            return (
              <MenuItem key={index} value={cond.value}>
                {cond.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
