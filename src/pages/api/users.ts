import dbConnect from '@/lib/dbConnect'
import {  UserModel } from '@/models'
import { User } from '@/models/user'
import { Response } from '@/types/response'
import { hashPassword } from '@/utilities/hashPassword'
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

    if (req.method === 'POST') {

      const { name, email, image, status, roole, _id } = JSON.parse(req.body);
       
      let data = null;

      if (_id) {
        data = await UserModel.findByIdAndUpdate(_id,
          {
            name,
            email,
            image,
            status,
            roole
          }
        )
      }
      else {
        data = await UserModel.create({
          name,
          email,
          image,
          status,
          roole
        })
      }

      res.status(201).json({
        status: 201
      })
    }


    if (req.method === 'DELETE') {

      const { _id } = JSON.parse(req.body);

      await UserModel.findByIdAndDelete(_id)

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
