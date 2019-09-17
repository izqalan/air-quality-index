var request = require('request');
const fetch = require('node-fetch');

var TOKEN = '97f08b9a493b5fd785bbf88d5d78a0e1cea8f832';
var URI = 'https://api.waqi.info/feed/'

// module.exports.getAqi = getAqi;
module.exports.search = search;


// need location, token

async function search(location){

    var api = URI+location+'/?token='+TOKEN;

    
    fetch(api)
        .then(response => response.json())
        .then(json => {getAqi(json)});


}


async function getAqi(search_obj) {
    // console.log('getAqi: '+search_obj);
    if (search_obj == null) {
        console.log('object is empty');
        return 0;
    }else{
        var val = search_obj.data.aqi;
        console.log('AQI: '+ search_obj.data.aqi);
        return val;
    }

}


