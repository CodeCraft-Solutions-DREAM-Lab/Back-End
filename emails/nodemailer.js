import nodemailer from "nodemailer";
import fs from "fs";

// let transporter = nodemailer.createTransport({
// 	host: process.env.SMTP_HOST,
// 	port: 587,
// 	auth: {
// 		user: "api",
// 		pass: process.env.SMTP_PASSWORD,
// 	},
// });

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.SMTP_SERVER_EMAIL,
		pass: process.env.SMTP_PASSWORD,
	},
});

export const sendEmail = async (to, subject, text, html) => {
	if (!to || !subject) {
		console.error("Missing parameters on sending email");
		return;
	}

	console.log({
		to: to,
		subject: subject,
		text: text,
	});

	let mailOptions = {
		from: process.env.SMTP_SERVER_EMAIL,
		to: to,
		subject: subject,
		text: text,
		html: html || "",
	};

	try {
		let info = await transporter.sendMail(mailOptions);
		console.log(`Email sent: ${info.response}`);
	} catch (error) {
		console.error(`Error sending email: ${error}`);
	}
};

export const getHtmlTemplate = (templateName, replacements) => {
	const templatePath = "./emails/templates/" + templateName + ".html";
	let template = fs.readFileSync(templatePath, "utf-8");
	// console.log(replacements);
	for (const key in replacements) {
		template = template.replace(
			new RegExp(`{{${key}}}`, "g"),
			replacements[key]
		);

		// console.log(template);
	}
	return template;
};
