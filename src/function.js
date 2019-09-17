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
        .then(json => {
            if(json.status == 'error'){
                console.log('cannot find station');
            }else{
                getAqi(json);
                getCity(json);
                getTime(json);
            }
            
        })


}


async function getAqi(search_obj) {
    // console.log('getAqi: '+search_obj);
    if (search_obj.status == 'error') {
        console.log('cannot find station');
        return 0;
    }else{
        var val = search_obj.data.aqi;
        console.log('Air Quality: '+ search_obj.data.aqi);
        return val;
    }

}

async function getCity(search_obj){

    if (search_obj.status == 'error') {
        console.log('cannot find station');
        return 0;
    }else{
        var val = search_obj.data.city.name;
        console.log('city: '+ val);
        return val;
    }

}

async function getTime(search_obj){

    if (search_obj.status == 'error') {
        console.log('cannot find station');
        return 0;
    }else{
        var time = search_obj.data.time.s;
        var timezone = search_obj.data.time.tz;
        console.log('timezone: '+ timezone);
        console.log('last updated on '+ time);
        return time;
    }

}
