const SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight');
const fs = require('fs');

const sabreDevStudio = new SabreDevStudioFlight({
  client_id:  'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
  client_secret:  'd4InUP8r',
  uri:  'https://api.test.sabre.com',
});

const options = {
  origin: 'SFO',
  lengthofstay: '5',
	//departuredate: '2018-02-14',
	//returndate:  '2018-02-21',
	maxfare: '200',
};


let callback_save = function(error, data) {
	fs.writeFile("sfo-500.txt", JSON.stringify(JSON.parse(data), null, 4), function(err) {
    if(err) {
        return console.log(err);
    }
})};

let callback = function(error, data) {
  if (error) {
    console.log(error);
  } else {
    var parsed = JSON.parse(data);
    var dests = [];
    console.log(parsed['FareInfo'][0]['DestinationLocation']);
    for (f in parsed['FareInfo']) dests.push(parsed['FareInfo'][f]['DestinationLocation']);
    //dests.push(f['DestinationLocation']));
    console.log(dests);
  }
};
//var options = {};
//sabre_dev_studio.get('/v1/lists/supported/cities', options, callback);
//sabre_dev_studio.get('/v1/shop/flights/fares', options, callback);
sabreDevStudio.destination_finder(options, callback);
