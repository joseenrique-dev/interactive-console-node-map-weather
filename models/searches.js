const axios = require('axios');
const fs = require('fs');

class Searches {
    history = ['ex 1', 'ex 2', 'ex 3'];
    lat = '';
    lng = '';
    dbPath = './db/database.json';

    constructor(){
        //TODO: Read db if exist.
        this.readDB()
    }

    get mapBoxParams() {
        return {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 5,
                    'language': 'en'
                };
    }

    async cities(place = ''){
        try {
            const axiosInstance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapBoxParams
            });
            const response = await axiosInstance.get();  
            return response.data.features.map(place =>({
                id: place.id,
                name: place.place_name,
                lat: place.center[1],
                lng: place.center[0]
            }))
            
            
        } catch (error) {
            console.log(error);
        }
    }

    get paramWeatherApi(){
        return {
            'lat': this.lat,
            'lon': this.lng,
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric'
        }
    }
    
    async weatherByPlace(lat, lng){
        try {
            this.lat = lat;
            this.lng = lng;
            const axiosInstance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: this.paramWeatherApi
                });
            const response = await axiosInstance.get();
            const {main,weather} = response.data;
            return{
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                desc: weather[0].description
            }
        } catch (error) {
            console.error(error);
        }
    }

    saveHistory ( place = ''){
        console.log(`Saving ${place}`); 
        if(this.history.includes(place.toLocaleLowerCase())) return;
        this.history.unshift(place);
        this.saveBD();
        console.log(this.history);
    }

    saveBD(){
        const payload  = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload)); 
    }

    readDB(){
        const dataFromDB= fs.readFileSync(this.dbPath, 'utf8');
        const dataParse = JSON.parse(dataFromDB);
        return dataParse
    }

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

module.exports = Searches;