import dbConnect from '@/lib/dbConnect'
import { LessonModel } from '@/models'
import { Lesson } from '@/models/lesson'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Lesson[]>>
) {
  try {
    await dbConnect()
    if(req.method === 'GET'){

      const data = await LessonModel.find()
      

      res.status(200).json({
        status: 200,
        data: data
      })

    }


  } catch (error) {
    res.status(500).json({
      data: [],
      status: 500
    })
  }
}
