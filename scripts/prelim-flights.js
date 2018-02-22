const SabreDevStudioFlight = require('../app/containers/HomePage/api/sabre-flight');
const fs = require('fs');

const sabreDevStudio = new SabreDevStudioFlight({
  client_id:  'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
  client_secret:  'd4InUP8r',
  uri:  'https://api.test.sabre.com',
});

const optionsDest = {
  origin: 'SFO',
  lengthofstay: '5',
  location: 'BR',
  maxfare: 2000,
};

const optionsNull = {
};

const optionsAfr = {
  destinationcountry: 'SS',
};

const optionsInsta = {
  origin: 'SFO',
  destination: 'GRU',
  departuredate: '2018-02-28',
  returndate: '2018-03-04',
  limit: 10,
  sortby: 'totalfare',
}


let callback_save = function(error, data) {
	fs.writeFile("sfo-500.txt", JSON.stringify(JSON.parse(data), null, 4), function(err) {
    if(err) {
        return console.log(err);
    }
})};

const callback = function (error, data) {
  if (error) {
    console.log(error);
  } else {
    const parsedData = JSON.parse(data);
    console.log(JSON.stringify(parsedData, null, 4));
  }
};
//sabreDevStudio.destination_finder(optionsDest, callback);
//sabreDevStudio.region_lookup(optionsRegion, callback);
//sabreDevStudio.city_pairs_lookup(optionsNull, callback);
sabreDevStudio.instaflights_search(optionsInsta, callback);
