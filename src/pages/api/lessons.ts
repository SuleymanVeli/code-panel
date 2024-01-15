import dbConnect from '@/lib/dbConnect'
import { LessonModel } from '@/models'
import { Lesson } from '@/models/lesson'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Lesson[] | Lesson>>
) {
  try {
    await dbConnect()
    if (req.method === 'GET') {

      const data = await LessonModel.find().sort({ number: -1})

      console.log("data",data)

      res.status(200).json({
        status: 200,
        data: data
      })
    }

    if (req.method === 'POST') {

      const body = JSON.parse(req.body);
      
      let data = null;

      if (body._id) {
        data = await LessonModel.findByIdAndUpdate(body._id,
          body
        )
      }
      else {
        data = await LessonModel.create(body)
      }

      res.status(201).json({
        status: 201
      })
    }


    if (req.method === 'DELETE') {

      const { _id } = JSON.parse(req.body);

      await LessonModel.findByIdAndDelete(_id)

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
