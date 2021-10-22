import nodemailer from "nodemailer";

export const confirmationEmail = async (email: string, password: string) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "geekycoder18@gmail.com",
      pass: "97coderr",
    },
  });
  var mailOptions = {
    from: "geekycoder18@gmail.com",
    to: email,
    subject: `Verryfy email send on ${Date.now()}`,
    text: "abcd",
    html: `<strong> Your email has been confirmed =>
      <h5>Your password for Poldit is ${password}</h5>
     </strong> `,
  };

  let info = await transporter.sendMail(mailOptions);
  if (info) {
    console.log("Message sent: %s", info.messageId);
  } else {
    console.log("Error occured");
  }
};
