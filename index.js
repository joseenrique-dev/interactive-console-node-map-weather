require('dotenv').config();
// const Searches = require('./models/searches');
const { inquirerMenu, pause, readInput, listPlaces } = require('./helpers/inquirer');
const Searches = require('./models/searches');

const main = async () => {
    let option;
    const searches = new Searches();
    do{
        option = await inquirerMenu();
        switch (option) {
            case 1:
                //Show messages
                const place = await readInput('Enter city name:');
                console.log(`Searching for ${place}`);
                //Search places
                const places = await searches.cities(place);
                const placeId = await listPlaces(places);
                console.log(`Selected place: ${placeId}`);
                //Select place
                const selectedPlace= places.find(place => place.id === placeId);
                const { lat, lng, name } = selectedPlace;
                //Weather
                const weather = await searches.weatherByPlace(lat, lng);
                console.log(`Weather in ${name}: ${weather.desc}`);
                //Show results
                console.log('City information\n'.green);
                console.log(`City: ${name}`);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperature:');
                console.log('Minimum:');
                console.log('Maximum:');
                console.log(`How is the weather?: The weather is ${weather.desc}.`);

                break;
            case 2:
                console.log('Option #2');
                break;
            default:
                break;
        }
        // if(option !== 0) await pause();
        await pause();
    
    }while(option !== 0);
}

main();