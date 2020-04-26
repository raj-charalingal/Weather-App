const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const { cityDets, weather } = data;
    
    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update the night and day images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    
    let timeScr = null;
    if(weather.IsDayTime) {
        console.log('it is day...')
        timeSrc = 'img/day.svg';
    } else {
        console.log('it is night')
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src',timeSrc);
    console.log(`timeSrc = ${time.getAttribute('src')}`)


    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

  
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather};
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();


    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});