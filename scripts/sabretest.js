const SabreDevStudioFlight = require('./sabre-flight');
const fs = require('fs');

const sabreDevStudio = new SabreDevStudioFlight({
    client_id: 'V1:ah4wtsaa8y09idu8:DEVCENTER:EXT',
    client_secret: 'd4InUP8r',
    uri: 'https://api.test.sabre.com',
});

const options = {
    origin: 'SFO',
    departuredate: '2018-04-01',
    returndate: '2018-04-05',
    //lengthofstay: '14',
    pointofsalecountry: 'MX',
};

const callback = function (error, data) {
      //parent.setState({ isLoading: false });
      if (error) {
        console.log(error);
      } else {
        const parsedData = JSON.parse(data)['FareInfo'];
        var array = [];
        for (obj in parsedData) {
            //console.log(parsedData[obj]);
            array.push(parsedData[obj]['DestinationLocation']);
        };
        console.log(array);
        console.log(array.length);
      }
};

sabreDevStudio.destination_finder(options, callback);
