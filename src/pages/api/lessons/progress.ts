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

    const { userId, videoId, progress, lessonId } = JSON.parse(req.body);


    try {
      const lesson = await LessonModel.findById(lessonId);
      if (!lesson) {
        throw new Error('Ders bulunamadı');
      }
  
      const videoToUpdate = lesson.videos.find((video: any) => video.id === videoId);
      if (!videoToUpdate) {

        console.log(userId, videoId, progress, lessonId)
        res.status(200).json({ status: 200 })
        return ;
      }
  
      const progressToUpdate = videoToUpdate.progresses.find(p => p.userId === userId);
      if (!progressToUpdate) {
        videoToUpdate.progresses.push({
          userId : userId
        })
        await lesson.save();

        res.status(200).json({ status: 200 })
        return;
      }
  
      progressToUpdate.progress = progress;

      if(progress > 99) progressToUpdate.done = true; // Örnek: Yüzde 100 tamamlandığında done true olarak işaretlenebilir
  
      await lesson.save();
      console.log('Video ilerlemesi güncellendi:', lesson);
    } catch (error) {
      console.error('Hata:', error);
    }
   

    
    res.status(200).json({ status: 200 })

  }
}
