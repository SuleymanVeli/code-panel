import dbConnect from "@/lib/dbConnect";
import { TaskModel } from "@/models";
import { Answer, Task, TaskItem } from "@/models/task";
import { TaskType } from "@/types/group";
import { Response } from "@/types/response";
import { find, includes, map, some } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<TaskType[]>>
) {
  try {
    await dbConnect();

    const userId = req.query.userId;

    if (req.method === "GET") {
      const data = await TaskModel.find().sort({ number: -1 });

      const tasks = map(data, (task: Task) => {
        return {
            name: task.name,
            _id: task._id,
            new: some(task.items, (item: TaskItem) => some(item.answers, (a: Answer) => a.userId == userId && a.status == "pending"))
        }
      })

      res.status(200).json({
        status: 200,
        data: tasks,
      });

      return;
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
