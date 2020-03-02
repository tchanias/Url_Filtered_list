export const cars = [
  {
    name: "Seat Cordoba",
    image: "https://static3.car.gr/25294245_8_k.jpg",
    category: "Sedan",
    condition: "Used",
    price: 6000
  },
  {
    name: "Fiat Punto",
    image: "https://static2.car.gr/25910672_0_k.jpg",
    category: "Sport",
    condition: "New",
    price: 25000
  },
  {
    name: "Audi A1",
    image: "https:////static2.car.gr/11139760_0_k.jpg",
    category: "Sport",
    condition: "New",
    price: 45000
  },
  {
    name: "Bmw I8",
    image: "https:////static2.car.gr/23700324_0_k.jpg",
    category: "Super Sport",
    condition: "New",
    price: 99500
  }
];

/**
 * Helper function that searches for
 * a parameter in the app's url
 * and returns its value
 * @param {string} parameter
 * @returns {string}
 */
export const getUrlParameter = function(parameter) {
  let currentUrl = window.location.href;
  console.log(currentUrl);
  parameter = parameter.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?|&]" + parameter.toLowerCase() + "=([^&#]*)");
  let results = regex.exec("?" + currentUrl.toLowerCase().split("?")[1]);
  // console.log(parameter,decodeURIComponent(results[1].replace(/\+/g,'')));
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, ""));
};

/**
 * Helper function that transforms
 * string to title case
 * @param {string} str
 * @returns {string}
 */
export const titleCase = function(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
};

/**
 * Helper function that decodes
 * a uri string to a titlecase string
 * @param {string} uri
 * @returns {string}
 */
export const uriToString = function(uri) {
  return titleCase(decodeURIComponent(uri));
};

/**
 *  Helper function that searches an array for
 *  a certain value and returns
 *  whether the value is found in the array
 *
 * @param {array} array
 * @param {string} value
 * @returns {boolean}
 */
export const mapArrayForValue = function(array, value) {
  if (array && array.length > 0) {
    let valueFound = false;
    array.map(item => {
      if (
        value.localeCompare(item.value, undefined, {
          sensitivity: "accent"
        }) === 0
      ) {
        valueFound = true;
      }
    });
    return valueFound;
  }
};

/**
 * Helper function that sets the value of
 * a parameter in the app's ulr
 *
 * @param {string} key
 * @param {string} value
 * @returns {string}
 */
export const setUrlParameter = function(key, value) {
  let url = window.location.href;
  let urlQueryString;
  var key = encodeURIComponent(key),
    value = encodeURIComponent(value);

  var baseUrl = url.split("?")[0],
    newParam = key + "=" + value,
    params = "?" + newParam;
  if (url.split("?")[1] === undefined) {
    // if there are no query strings, make urlQueryString empty
    urlQueryString = "";
    console.log("empty");
  } else {
    console.log("not empty");
    urlQueryString = "?" + url.split("?")[1];
  }

  // If the "search" string exists, then build params from it
  if (urlQueryString) {
    var updateRegex = new RegExp("([?&])" + key + "=[^&]*");
    var removeRegex = new RegExp("([?&])" + key + "=[^&;]+[&;]?");

    if (value === undefined || value === null || value === "") {
      // Remove param if value is empty
      params = urlQueryString.replace(removeRegex, "$1");
      params = params.replace(/[&;]$/, "");
    } else if (urlQueryString.match(updateRegex) !== null) {
      // If param exists already, update it
      params = urlQueryString.replace(updateRegex, "$1" + newParam);
    } else if (urlQueryString === "") {
      // If there are no query strings
      params = "?" + newParam;
    } else {
      // Otherwise, add it to end of query string
      params = urlQueryString + "&" + newParam;
    }
  }

  // no parameter was set so we don't need the question mark
  params = params === "?" ? "" : params;
  return baseUrl + params;
};

/**
 * Helper function that get an integer
 * and returns a string comma separated string
 *
 * @param {int} x
 * @returns {string}
 */
export const commatize = function(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const filters = {
  nameString: "name",
  categoryString: "category",
  conditionString: "condition"
};
