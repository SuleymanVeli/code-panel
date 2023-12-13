import FileCard from "@/components/cards/lessonFileCard";

import VideoCard from '@/components/cards/lessonVideoCard'
import { Card } from "@material-tailwind/react";

export default function Home() {

  return (
      <>
        <Card shadow={false} className="h-20 mb-5 rounded-2xl bg-[url('https://static.vecteezy.com/system/resources/thumbnails/008/070/315/small/geometric-low-poly-graphic-repeat-pattern-background-free-vector.jpg')] flex px-10 text-gray-50 font-bold text-2xl justify-center bg-teal-300">
          <p>Lessons</p>
        </Card>

       <div className="grid grid-cols-2 mb-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-3 col-span-4">
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
          <VideoCard video="https://www.youtube.com/embed/57Ka0yPhm0s?si=S-0MUK8LrOJeKbuK" videoId="57Ka0yPhm0s" />
        </div>  

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-3">
          <FileCard file="word" />
          <FileCard file="js" />
          <FileCard file="css" />
          <FileCard file="html" />
          <FileCard file="html" />
          <FileCard file="html" />
          <FileCard file="html" />
          <FileCard file="html" />
          <FileCard file="html" />
          <FileCard file="pdf" />
          <FileCard file="text" />
          <FileCard file="cs" />
        </div>      
      </>
  )
}
