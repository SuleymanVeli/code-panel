import dbConnect from '@/lib/dbConnect'
import {  TaskModel, UserModel } from '@/models'
import { User } from '@/models/user'
import { GroupType } from '@/types/group'
import { Response } from '@/types/response'
import { hashPassword } from '@/utilities/hashPassword'
import { map } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<User[] | User>>
) {
  try {
    await dbConnect()
    if (req.method === 'GET') {
      const data = await UserModel.find()
        

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
