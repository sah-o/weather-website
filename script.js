const apiKey = 'YOUR_VISUAL_CROSSING_API_KEY'; // Replace with your actual API key
const weatherInfo = document.getElementById('weather-info');
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeather(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value;
        if (location) {
            getWeather(location);
        }
    }
});

async function getWeather(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            weatherInfo.innerHTML = `<p>Error: ${data.message || 'Unable to fetch weather data'}</p>`;
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p>An error occurred. Please try again later.</p>';
    }
}

function displayWeather(data) {
    const current = data.currentConditions;
    weatherInfo.innerHTML = `
        <h2>${data.resolvedAddress}</h2>
        <p>Temperature: ${current.temp.toFixed(1)}°C</p>
        <p>Feels like: ${current.feelslike.toFixed(1)}°C</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind: ${current.windspeed} km/h ${current.winddir}°</p>
        <p>Conditions: ${current.conditions}</p>
        <p>Last updated: ${new Date(current.datetime).toLocaleString()}</p>
    `;
}
