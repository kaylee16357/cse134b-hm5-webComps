class weatherWidget extends HTMLElement {
  
  constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `<p id="weather"></p>`
    this.fetchWeather();
  }
  
  fetchWeather() {
    const weatherElement = this.shadowRoot.getElementById('weather');
    
    fetch('https://api.weather.gov/points/32.875,-117.236').then(response =>       response.json()).then(data => {
					  fetch(data.properties.forecast).then(r => r.json()).then(d => {
              const temp = d.properties.periods[0].temperature;
              const words = d.properties.periods[0].shortForecast;
              let icon = '';
              if(words.includes("Partly Cloudy")){
                 icon ='🌤';
              }else if(words.includes("Partly Sunny")) {
                 icon ='🌤';
              } else if(words.includes("Cloudy")) {
                 icon ='☁';
              } else if(words.includes("Sunny")) {
                 icon ='☀';
              }else if(words.includes("Snow")) {
                 icon ='❄';
              } else if(words.includes("Rain")) {
                 icon ='🌧';
              } else if(words.includes("Fog")) {
                 icon ='🌫';                  
              } else if(words.includes("Clear")) {
                 icon ='☀';                  
              } 
              else {
                 icon ='';
              }
                 
              this.displayWeather(icon + ' ' + words + ' ' + temp + '°F');
            })
					})
					.catch(() => {
						this.displayWeather("Oh no our network connection failed!");
					});
    
    
  }
   
  
  
  displayWeather(weather) {
    const weatherElement = this.shadowRoot.getElementById('weather');
    weatherElement.textContent = weather;
  }
  
}

customElements.define('weather-widget', weatherWidget);
