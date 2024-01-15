import dbConnect from '@/lib/dbConnect'
import { LessonModel } from '@/models'
import { Lesson, Video, VideoProgress } from '@/models/lesson'
import { Response } from '@/types/response'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<Lesson | null>>
) {

   await dbConnect()
   if (req.method === 'POST') {

    const { userId, taskId, answer, lessonId } = JSON.parse(req.body);

        try {
      const lesson = await LessonModel.findById(lessonId);
      if (!lesson) {
        throw new Error('Ders bulunamadı');
      }
  
      const taskToUpdate = lesson.tasks.find((task: any) => task.id === taskId);
      if (!taskToUpdate) {

        console.log(userId, taskId, answer, lessonId)
        res.status(200).json({ status: 200 })
        return ;
      }
  
      const answerToUpdate = taskToUpdate.answers.find(p => p.userId === userId);
      if (!answerToUpdate) {
        taskToUpdate.answers.push({
          userId : userId,
          code: answer.code,
          file: answer.file,
          status: answer.status
        })
        await lesson.save();

        res.status(200).json({ status: 200 })
        return;
      }
  
      answerToUpdate.code = answer.code;
      answerToUpdate.file = answer.file;
      answerToUpdate.status = answer.status;
  
      await lesson.save();

      console.log('Video ilerlemesi güncellendi:', lesson);
    } catch (error) {
      console.error('Hata:', error);
    }
       
    res.status(200).json({ status: 200 })

  }
}
