const uAPI = require('uapi-json');

const settings = { auth: {username: 'uAPI6030405136-ec11970c', password: 'G9gNAJrDKbb8BFqyZFYXRMyxZ', targetbranch: 'P7015254'}};
const AirService = uAPI.createAirService(settings);

AirService.importPNR().catch((err) => {
  if (err instanceof uAPI.errors.Common.ValidationError) {
    console.log('Validation error occured');
  }
  if (err instanceof uAPI.errors.Request.RequestValidationError) {
    console.log('Validation error occured in request');
  }
  if (err instanceof uAPI.errors.Request.RequestValidationError.ParamsMissing) {
    console.log('Params are missing for request');
  }
});
