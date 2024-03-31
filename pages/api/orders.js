import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    res.json(await Order.find().sort({ createdAt: -1 }));
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await Order.deleteOne({ _id: id });
  }

  if (req.method === "DELETE") {
    if (req.query?.id) {
      await Order.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
