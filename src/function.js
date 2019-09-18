var request = require('request');
const fetch = require('node-fetch');
const chalk = require('chalk');

var TOKEN = '97f08b9a493b5fd785bbf88d5d78a0e1cea8f832';
var URI = 'https://api.waqi.info/feed/'

// module.exports.getAqi = getAqi;
module.exports.search = search;


const qualityTag = [' [good]', ' [moderate]', ' [unhealthy for sensitive groups]', ' [unhealthy]',
    ' [very unhealthy]', ' [hazardous]'];

// need location

async function search(location){

    var api = URI+location+'/?token='+TOKEN;

    
    fetch(api)
        .then(response => response.json())
        .then(json => {
            if(json.status == 'error'){
                console.log(chalk.red('error! ') + 'cannot find station' );
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
        console.log(chalk.red('error! ') + 'cannot find station');
        return 0;
    }else{
        var val = search_obj.data.aqi;
        var aqival = parseInt(val);
        
        if(aqival <= 50){
            console.log(chalk.dim('Air Quality: ')+ val + chalk.green(qualityTag[0]));
        }
        else if( aqival > 50 && aqival <= 100 ){
            console.log(chalk.dim('Air Quality: ')+ val + chalk.yellow(qualityTag[1]));
        }
        else if(aqival > 100 && aqival <= 150){
            console.log(chalk.dim('Air Quality: ') + val + chalk.rgb(255,179,71)(qualityTag[2]));
        }
        else if (aqival > 150 && aqival <= 200) {
            console.log(chalk.dim('Air Quality: ')+ val + chalk.red(qualityTag[3]));
        }
        else if(aqival > 200 && aqival <= 300){
            console.log(chalk.dim('Air Quality: ')+ val + chalk.magenta(qualityTag[4]));
        }
        else if(aqival > 300){
            console.log(chalk.dim('Air Quality: ')+ val + chalk.rgb(175,0,42)(qualityTag[5]));
        }

        // console.log('Air Quality: '+ search_obj.data.aqi);
        return val;
    }

}

async function getCity(search_obj){

    if (search_obj.status == 'error') {
        console.log(chalk.red('error! ') + 'cannot find station');
        return 0;
    }else{
        var val = search_obj.data.city.name;
        console.log(chalk.dim('city: ') + val);
        return val;
    }

}

async function getTime(search_obj){

    if (search_obj.status == 'error') {
        console.log(chalk.red('error! ') + 'cannot find station');
        return 0;
    }else{
        var time = search_obj.data.time.s;
        var timezone = search_obj.data.time.tz;
        console.log(chalk.dim('timezone: ') + timezone);
        console.log(chalk.green('last updated on '+ time));
        return time;
    }

}
