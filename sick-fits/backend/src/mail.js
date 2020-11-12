const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PORT
  }
});

const makeNiceEmail = text => `
    <div className="Email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 1;
        font-size:20px;
    ">
        <h2>Hi!</h2>
        <p>${text}</p>
        <P>from Ollie</p>
    </div>
`;

exports.transport = transport;
exports.makeNiceEmail = makeNiceEmail;
