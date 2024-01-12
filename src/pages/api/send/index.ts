import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message?: string }>
) => {
  const { method, body } = req;

  if (
    !process.env.EMAIL_TO ||
    !process.env.EMAIL_FROM ||
    !process.env.SENDGRID_API_KEY
  ) {
    return res.status(5000).json({ message: "Jotain meni pieleen" });
  }

  if (method !== "POST") {
    return res.status(400);
  }

  if (!body.message) {
    return res.status(400).json({ message: "Palautteesta puuttuu viesti" });
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const headers = req.headers["user-agent"] || "";

  const msg: MailDataRequired = {
    to: process.env.EMAIL_TO,
    from: {
      name: "grillitopo.com",
      email: process.env.EMAIL_FROM,
    },
    subject: "Palaute",
    text: `${headers}\n\n${body.message}${
      body.nick ? `\n\nTerveisin,\n${body.nick}` : "\n\nLähetetty anonyymisti"
    }`,
  };
  try {
    await sgMail.send(msg);
    return res.status(200).json({});
  } catch (error: unknown) {
    const message =
      (error instanceof Error ? error.message : "") || "Jotain meni pieleen :(";

    return res.status(500).json({ message });
  }
};

export default handler;
