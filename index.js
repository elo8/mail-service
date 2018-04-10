const http = require('http');

http.createServer(function(request, response) {
  if (request.method === 'POST' && request.url === '/email') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      email(JSON.parse(body));
      response.end(body);
    });
  } else {
    response.writeHead(404, {'Content-Type': 'application/json'});
    const responseBody = { "error" : "Error error error" };
    response.end(JSON.stringify(responseBody));
  }
}).listen(8888);

const async = require('async');
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, 
                                      domain: process.env.MAILGUN_DOMAIN});
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function email(data) {
  var emailServices = [
    function(done) {
      mailgun.messages().send(data, function (error, body) {
        if (error) {
          done(error, null);
        } else {
          done(null, body);
        }
     });
    },
    function(done) {
      sgMail.send(data, function (error, result) {
        if (error) {
          done(error, null);
        } else {
          done(null, result);
        }
      });
    }
  ];
  async.tryEach(emailServices, function(error, result) {
      if (error) console.log('Error in sending email: ' + JSON.stringify(error));
      if (result) console.log('Email sent successfully: ' + JSON.stringify(result));
  });
}
