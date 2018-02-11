const SabreDevStudioFlight = require('sabre-dev-studio/lib/sabre-dev-studio-flight');
var fs = require('fs');

let sabre_dev_studio = new SabreDevStudioFlight({
  client_id:     'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
  client_secret: 'd4InUP8r',
  uri:           'https://api.test.sabre.com'
});

let options = {
	origin:'SFO',
	departuredate:'2018-02-14',
	returndate: '2018-02-21',
	maxfare:'500'
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
    console.log(JSON.stringify(JSON.parse(data), null, 4));
  }
};
//var options = {};
//sabre_dev_studio.get('/v1/lists/supported/cities', options, callback);
//sabre_dev_studio.get('/v1/shop/flights/fares', options, callback);
sabre_dev_studio.destination_finder(options, callback_save);