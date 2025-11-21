const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function(context, event, callback) {
  const client = context.getTwilioClient();
  
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
  response.appendHeader("Content-Type", "application/json");

  const phoneNumber = event.phoneNumber;

  try {
    const lineDetails = await client.lookups.v2
      .phoneNumbers(phoneNumber)
      .fetch({ fields: "line_type_intelligence"});
    
    response.setStatusCode(200);
    response.setBody({
      success: true,
      results: lineDetails.line_type_intelligence
    });
  } catch (err) {
    console.error("Error querying the number: ", err);
    response.setStatusCode(500);
    response.setBody({
      success: false,
      message: `Failed querying the phone number ${phoneNumber}`,
      error: err.message
    });
  }

  return callback(null, response);
});
