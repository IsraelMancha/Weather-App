const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const campoRequerido = document.querySelector(".campo-requerido");

search.addEventListener("click", async () => {
  const city = document
    .querySelector(".search-box input")
    .value.trim()
    .toLowerCase();
  // se puede agregar otra pantalla para el campo vacio. Por mientras se muestra un alert()
  if (!city) {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    campoRequerido.style.display = "block";
    campoRequerido.classList.add("fadeIn");
    error404.style.display = "none";

    return;
  }
  const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?contentType=json&unitGroup=us&aggregateHours=24&location=${city}&shortColumnNames=false`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "261d6b805fmsh8f58e3a5e2669c3p1704b0jsn27c7e4002cfb",
      "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log(result);

    // Actualizar el DOM con la información del clima
    container.style.height = "590px";
    weatherBox.style.display = "";
    weatherDetails.style.display = "";
    error404.style.display = "none";
    error404.classList.remove("fadeIn");
    campoRequerido.style.display = "none";

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const name = document.querySelector(".weather-box .name");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const wind = document.querySelector(".weather-details .wind span");

    // guardar en variable datos
    const currentConditions = result.locations[`${city}`].currentConditions;
    const nameData = result.locations[`${city}`].address;
    const icon = currentConditions.icon;
    console.log(icon);
    const temperatureData = currentConditions.temp;
    const humidityData = currentConditions.humidity;
    const windData = currentConditions.wspd;

    // Actualiza con la info del clima

    switch (icon) {
      case "partly-cloudy-night":
        image.src = "./images/partly-cloudy-night.webp";
        break;

      case "clear-night":
        console.log("aplicando clear");
        image.src = "./images/clear-night.webp";
        break;

      case "clear-day":
        image.src = "./images/clear.png";
        break;

      case "rain":
        image.src = "./images/rain.png";
        break;

      case "partly-cloudy-day":
        image.src = "./images/Partly-Cloudy-Day.webp";
        break;

      case "cloudy":
        image.src = "./images/cloudy.webp";
        break;

      case "snow":
        image.src = "./images/snow.webp";
        break;
    }

    // IMPRIMIR LOS VALORES EN LA INTERFAZ
    temperature.innerHTML = `${temperatureData}<span> ℉</span>`;
    name.innerHTML = `${nameData}`;
    if (icon === "partly-cloudy-day") {
      description.innerHTML = `Partly Cloudy Day`;
    } else if (icon === "partly-cloudy-night") {
      description.innerHTML = `Partly Cloudy Night`;
    } else if (icon === "clear-day") {
      description.innerHTML = `Clear Day`;
    } else if (icon === "clear-night") {
      description.innerHTML = `Clear Night`;
    } else {
      description.innerHTML = `${icon}`;
    }
    humidity.innerHTML = `${humidityData} %`;
    wind.innerHTML = `${windData}mph`;
  } catch (error) {
    campoRequerido.style.display = "none";
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("fadeIn");
    console.error("Este es el error:", error);
  }
});
