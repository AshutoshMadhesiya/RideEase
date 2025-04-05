const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    // console.log("URL:", url); 
    
    try {
        const response = await axios.get(url);
        if (response.data.status == 'OK') {
            const location = response.data.results[0].geometry.location;
            // console.log("Location:", location); 
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Geocoding Error:", error.message);
        throw error;
    }
};


module.exports.getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    // console.log("URL:", url); 
    
    try {
        const response = await axios.get(url);
        if (response.data.status == 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'OK') {
                return {
                    distance: element.distance.text,
                    duration: element.duration.text
                };
            } else {
                throw new Error(`Unable to fetch distance and time: ${element.status}`);
            }
        } else {
            throw new Error(`Unable to fetch distance and time: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Distance Matrix Error:", error.message);
        throw error;
    }
}


module.exports.getSuggestions= async(input) =>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    // console.log("URL:", url); 
    
    try {
        const response = await axios.get(url);
        if (response.data.status == 'OK') {
            return response.data.predictions.map(prediction => prediction.description);
        } else {
            throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Autocomplete Error:", error.message);
        throw error;
    }
}