# mail-service

This mail service implements a REST endpoint at /email path which will send email to recipients using Mailgun or Sendgrid as the email delivery provider.

Pre requisites:

Sign up with Mailgun and Sendgrid to get API keys. For Mailgun we also need to create a domain or use their sandbox domain, but it can only send emails to pre authorised email accounts.

To run this service:

setup for Mailgun

set the following environment variables:
```
export MAILGUN_API_KEY=someAPIKey
export MAILGUN_DOMAIN=someDomain
```

setup for Sendgrid
set the following environment variable:
```
export SENDGRID_API_KEY=someAPIKey
```

run this command:

```
node index.js
```

The above will start the server at port 8888 and ready to respond to request.

To invoke the service:

Do a POST to http://localhost:8888/email

Set Content-Type header to application/JSON

Send the below JSON payload as example:

```
{
  "from": "Excited User <eager.low@samples.org>",
  "to": "blah_blah@gmail.com, foo_bar@yahoo.com",
  "subject": "EMAIL TESTING!",
  "text": "Email sent with API testing. Node JS is awesome bro!"
}
```

