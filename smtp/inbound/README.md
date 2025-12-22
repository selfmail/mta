# Inbound SMTP Server

The idea behind it: this smtp server, made with the [smtp-server](https://github.com/nodemailer/smtp-server) library, is completely configurable through the web dashboard. We are trying to be as fast as possible with handling the current smtp session, so we are just doing basic checks while the client is connected. The admin of the smtp server can configure blacklist for ips and domains, as well as important security stuff such as allowing connections from localhost.

To be as performant as possible, we are loading the configuration at the start of our server in memory, so that we don't need to fetch everything at our active connections. After the `DATA` command, we are enqueing the email to the queue, to process it further with more advanced spam checking.