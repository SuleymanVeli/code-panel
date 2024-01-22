import dbConnect from '@/lib/dbConnect'
import { TaskModel } from '@/models'
import { Task, TaskItem } from '@/models/task'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth"
import { authOption } from "../auth/[...nextauth]"
import { find } from 'lodash'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<TaskItem[] | TaskItem | Task | null>>
) {
  try {
    await dbConnect()

    const id = req.query.id;

    let userId = '';

    const session:any = await getServerSession(req,res,authOption);

    if(session?.user?._id) userId = session?.user?._id;

    if(!userId) {
      res.status(401).json({
        data: [],
        status: 401
      })
    }

    const data = await TaskModel.findOne({ _id: id })    
    
    if (req.method === 'GET') {      

      for(const item of data?.items || []){        
        item.answer = find(item.answers, a=>a.userId === userId)
      }
     
      res.status(200).json({
        status: 200,
        data:data?.items
      })

      return;
    }

    if (req.method === 'POST') {

      const { itemId, code, comment, status } = JSON.parse(req.body); 
        
      const item = find(data?.items, a=>a._id === itemId)

      if(!item){
        res.status(404).json({
          status: 404,
          data:data
        })
  
        return;
      }

      const answer = find(item.answers, a=>a.userId === userId)

      if(!answer){
        res.status(404).json({
          status: 404,
          data:data,
        })
  
        return;
      }

      answer.code = code;
      answer.comment = comment;
      answer.status = status;

      await data?.save()

      res.status(200).json({
        status: 200,
        data:data
      })

      return;
    }
  
    res.status(500).json({
      data: [],
      status: 500
    })

  } catch (error) {
    res.status(500).json({
      data: [],
      status: 500
    })
  }
}
