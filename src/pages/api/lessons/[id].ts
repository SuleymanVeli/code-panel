import dbConnect from '@/lib/dbConnect'
import { LessonModel } from '@/models'
import { Lesson } from '@/models/lesson'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Lesson | null>>
) {

   const {id} = req.query
   await dbConnect()
   if (req.method === 'GET') {

    const data = await LessonModel.findOne({_id: id})
   

    
    res.status(200).json({ status: 200, data: data})

  }
}
