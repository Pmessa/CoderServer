import { createTransport } from "nodemailer";
import __dirname from "../../utils.js";
import environment from "./env.util.js";
const { GOOGLE_EMAIL, GOOGLE_PASSWORD } = environment;

async function sendEmail(data) {
  try {
    console.log("console.log" + __dirname);
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GOOGLE_EMAIL, pass: GOOGLE_PASSWORD },
    });
    //OPCIONALMENTE VERIFICAR EL TRANSPORTE
    await transport.verify();
    await transport.sendMail({
      from: `eVolución <${GOOGLE_EMAIL}>`,
      to: data.to,
      subject: `USER ${(data.name.toUpperCase())} REGISTERED!`,
      html: `
      <h1>BIENVENIDO A eVolución VERDE</h1>
      <p>VERIFY CODE: ${data.code}</p>
      <img src="cid:logo" alt="Logo de eVolución" />`,
    attachments: [
      {
        filename: 'logo-tr.png',
        path: './public/img/logo-tr.png',
        cid: 'logo' 
      }
    ]
    });
  } catch (error) {
    throw error;
  }
}
export default sendEmail;
