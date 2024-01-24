import dbConnect from "@/lib/dbConnect";
import { TaskModel } from "@/models";
import { Task } from "@/models/task";
import { Response } from "@/types/response";
import { map, some } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Task[] | Task | null>>
) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const data = await TaskModel.find().sort({ number: -1 });

      res.status(200).json({
        status: 200,
        data: data,
      });

      return;
    }

    if (req.method === "POST") {
      const body = JSON.parse(req.body);

      let data = null;

      if (body._id) {
        data = await TaskModel.findByIdAndUpdate(body._id, body);
      } else {
        data = await TaskModel.create(body);
      }

      res.status(201).json({
        status: 201,
      });
    }

    if (req.method === "DELETE") {
      const { _id } = JSON.parse(req.body);

      await TaskModel.findByIdAndDelete(_id);

      res.status(200).json({
        status: 200,
      });
    }

    res.status(500).json({
      data: [],
      status: 500,
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      status: 500,
    });
  }
}
