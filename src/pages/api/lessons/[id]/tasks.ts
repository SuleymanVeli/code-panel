import dbConnect from '@/lib/dbConnect'
import { LessonModel } from '@/models'
import { Task } from '@/models/lesson'
import { Response } from '@/types/response'
import { filter, find, toString } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Task[] | Task>>
) {

  const { id } = req.query;

  try {
    await dbConnect()

    const lesson = await LessonModel.findOne( {_id: id})

    console.log(lesson)

    if (req.method === 'GET') {

      res.status(200).json({
        status: 200,
        data: lesson?.tasks
      })
    }

    if (req.method === 'POST') {

      const body = JSON.parse(req.body);
      
      let data = null;

      if (body._id) {

       const task = find(lesson?.tasks, (t: Task)=> toString(t._id) == body._id )

       if(task){
        task.answerType = body.answerType;
        task.description = body.description;
        task.name = body.name;        
       }
    }
      else {
        if(lesson && lesson?.tasks) lesson.tasks = []
        lesson?.tasks.push(body)
      }

      await lesson?.save()

      res.status(201).json({
        status: 201
      })
    }


    if (req.method === 'DELETE') {

      const { _id } = JSON.parse(req.body);
      
      if(lesson)
      lesson.tasks = filter(lesson?.tasks, (t: Task)=> toString(t._id) != _id )

      await lesson?.save()

      res.status(200).json({
        status: 200,
      })
    }

  } catch (error) {
    res.status(500).json({
      data: [],
      status: 500
    })
  }
}
