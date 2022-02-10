// api background image
fetch(
  "https://api.thecatapi.com/v1/images/search?api_key=7c254023-0c3a-482f-a1e6-75508d758bcd"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data[0].url})`;
  })
  .catch((err) => {
    // Use a default background image
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1568309386325-ef86f13ac533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
  });

fetch("https://catfact.ninja/fact")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("cat-facts").textContent = data.fact;
    
  });

// generate time
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}
setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=b32b43cada2af3f861afb545f2f810c6`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <div class="row"><img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p></div>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});
