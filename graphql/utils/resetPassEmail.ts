import nodemailer from "nodemailer";

export const sendResetPasswordMail = async (email: string, token: string) => {
  console.log("sending Email");
  console.log(email);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "geekycoder18@gmail.com",
      pass: "97coderr",
    },
  });
  // console.log(transporter);
  var mailOptions = {
    from: "geekycoder18@gmail.com",
    to: email,
    subject: `Verryfy email send on ${Date.now()}`,
    text: "abcd",
    html: `<strong> Please click this link to change your Password =>
      <a href=http://localhost:3000/Admin/${token}>Click to Change your Password</a> 
     </strong> `,
  };

  let info = await transporter.sendMail(mailOptions);
  if (info) {
    console.log("Message sent: %s", info.messageId);
  } else {
    console.log("Error occured");
  }
};
