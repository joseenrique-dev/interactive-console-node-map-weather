const axios = require('axios');

class Searches {
    history = ['ex 1', 'ex 2', 'ex 3'];

    constructor(){
        //TODO: Read db if exist.
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

    async weatherByPlace(lat, lng){
        try {
            return{
                temp: '20',
                min: '10',
                max: '30',
                desc: 'Cloudy'
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Searches;