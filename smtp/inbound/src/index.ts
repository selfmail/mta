import { SMTPServer } from "smtp-server";

// TODO: loading whitelist, blacklist and other configs into memory from database
// smtpServer.server.maxConnections = 100; set with db value

const smtpServer = new SMTPServer({
	name: "Selfmail MTA Inbound Server",

	disabledCommands: ["AUTH", "STARTTLS"],
	secure: false,

	size: 25 * 1024 * 1024, // max size: 25 megabytes
	logger: process.env.NODE_ENV !== "production",
});

smtpServer.listen(25, () => {
	console.log("Inbound SMTP Server is listening on port 25");
});
