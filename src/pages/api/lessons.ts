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

      const data = await LessonModel.find()

      res.status(200).json({
        status: 200,
        data: data
      })
    }

    if (req.method === 'POST') {

      const { name, _id, list } = JSON.parse(req.body);
      
      let data = null;

      if (_id) {
        data = await LessonModel.findByIdAndUpdate(_id,
          {
            name: name,
            list: list
          }
        )
      }
      else {
        data = await LessonModel.create({
          name: name,
          list: list
        })
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
