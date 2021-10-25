//'use strict';
exports.main_handler = async (event, context, callback) => {
    try {
        const SOURCE_URL = process.env.SOURCE_URL
        for (const v of event["Message"].split("&")) {
            console.log(v);
            if (SOURCE_URL) { //不允许直链!!!不允许直链!!!不允许直链!!!
                const request = require('request')
                console.log(`${SOURCE_URL}${v}.js`)
                request(`${SOURCE_URL}${v}.js`, function(error, response, body) {
                    if (error){
                        console.log(error)
                    }else{
                        eval(response.body)
                    }
                })
            } else {
                delete require.cache[require.resolve('./' + v + '.js')];
                require('./' + v + '.js')
            }
        }
    } catch (e) {
        console.error(e)
    }
}