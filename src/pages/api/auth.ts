import dbConnect from '@/lib/dbConnect'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<string>>
) {
  try {
    await dbConnect()
  

    if (req.method === 'POST') {

        
      res.status(201).json({
        status: 201
      })
    }



  } catch (error) {
    res.status(500).json({
      data: '',
      status: 500
    })
  }
}
