import { Lesson } from '@/types/lesson'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Lesson[]>>
) {
    console.log(req.query)



    
  res.status(200).json({ status: 200, data: []})
}
