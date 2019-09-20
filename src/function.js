var request = require('request');
const fetch = require('node-fetch');
const chalk = require('chalk');
const ora = require('ora');
require('dotenv').config()

// get your api key here https://aqicn.org/data-platform/token/#/

var TOKEN = process.env.API_KEY;
var URI = 'https://api.waqi.info/feed/@'
var SEARCHAPI = 'https://api.waqi.info/search/?token='

// module.exports.getAqi = getAqi;
module.exports.search = search;


const qualityTag = [' [good]', ' [moderate]', ' [unhealthy for sensitive groups]', ' [unhealthy]',
    ' [very unhealthy]', ' [hazardous]'];


const spinner = ora({
    text: 'loading...',
    stream: process.stdout,
    isEnabled: true,
});

    // need location
async function search(location){

    
    var sapi = SEARCHAPI+TOKEN+'&keyword='+location;

    spinner.start();

    fetch(sapi).then(response => response.json())
        .then( json => {
            
            if (json.status == 'error' || json.data[0] == undefined ) {
                spinner.fail(chalk.red('error! ') + 'cannot find station');
            }else{
                var uid = json.data[0].uid;
                var api = URI+uid+'/?token='+TOKEN;
                
                fetch(api)
                    .then(response => response.json())
                    .then(json => {
                        if(json.status == 'error'){
                            spinner.fail(chalk.red('error! ') + 'cannot find station');
                        }else{
    
                            spinner.stop().clear();
                            // console.log(json);
                            getAqi(json);
                            getCity(json);
                            getTime(json);
                    
                        }
                
                    })

            }
            


        });
}


async function getAqi(search_obj) {
    
    if (search_obj.status == 'error') {
        spinner.fail(chalk.red('error! ') + 'cannot find station')
        // console.log(chalk.red('error! ') + 'cannot find station');
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
