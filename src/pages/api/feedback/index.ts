import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Response = { message: string };

interface FeedbackRequest extends NextApiRequest {
  body: Prisma.FeedbackCreateInput;
}

const prisma = new PrismaClient();

export default async function handler(
  req: FeedbackRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req;

  const data = {
    ...req.body,
    rating: Number(req.body.rating),
  };

  if (req.method === "POST") {
    try {
      await prisma.feedback.create({ data });
      return res.status(200).json({ message: "Feedback received" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again later" });
    }
  }

  res.status(400).json({ message: "Invalid request" });
}
