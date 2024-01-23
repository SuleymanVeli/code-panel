import dbConnect from "@/lib/dbConnect";
import { TaskModel } from "@/models";
import { Answer, Task, TaskItem } from "@/models/task";
import { Response } from "@/types/response";
import type { NextApiRequest, NextApiResponse } from "next";
import { cloneDeep, find, forEach, map, toString } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<TaskItem[] | TaskItem | Task | null>>
) {
  try {
    await dbConnect();

    const id = req.query.id;
    const userId = req.query.userId;
   
    if (!userId) {
      res.status(401).json({
        data: [],
        status: 401,
      });
    }

    const data = await TaskModel.findOne({ _id: id });

    if (req.method === "GET") {
      // for(const item of data?.items || []){
      //   item.answer = find(item.answers, a=>a.userId === userId)
      // }

      // forEach(data?.items, item => {
      //   item.answer = find(item.answers, a=>a.userId === userId)
      // })

      if (!data || !data.items) {
        res.status(200).json({
          status: 200,
          data: [],
        });

        return;
      }

      const items: TaskItem [] = map(data?.items, item => {        
        return {
          answer: find(item.answers, a=>a.userId === userId),
          _id: item._id,
          name: item.name,
          description: item.description,
          answerType: item.answerType,
          answers:[]
        };                
      })  
      
      res.status(200).json({
        status: 200,
        data: items,
      });

      return;
    }

    if (req.method === "POST") {
      const { itemId, code, value, type } = JSON.parse(req.body);

      const item = find(data?.items, (a) => toString(a._id) === itemId);

      if (!item) {
        res.status(404).json({
          status: 404,
          data: data,
        });

        return;
      }

      const answer = find(item.answers, (a) => a.userId === userId);

      if (!answer) {
       
        res.status(404).json({
            data: [],
            status: 404,
          });

        return;
      }

      if (type == "comment") answer.comment = value;
      else if(type == "status") answer.status = value;
      else answer.code = code;     
      
      await data?.save();

      res.status(200).json({
        status: 200,
        data: data,
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
