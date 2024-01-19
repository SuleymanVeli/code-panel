import { Button, Card, ListItem, Progress, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaDownload, FaPlay } from "react-icons/fa6";
import { FaFileWord } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useUser } from "@/providers/userProvider";
import fetcher from "@/utilities/fetcher";
import { useRouter } from "next/router";
import { Response } from "@/types/response";
import { Lesson, VideoProgress } from "@/models/lesson";
import { map, find } from "lodash";
import { Video } from "@/types/lesson";
import ReactMarkdown from "@/components/mkd/ReactMarkdown";



export default function Home() {
  const [activeTab, setActiveTab] = useState("video");
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const player = useRef<any>();

  const { user } = useUser()

  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    fetcher(`/api/lessons/${id}`).then((data: Response<Lesson>) => {
      if (data.data) {
        setLesson(data.data)
        const videoList = map(data.data.videos, v => ({ ...v, ...(find(v.progresses, (p: VideoProgress) => p.userId == user._id) || {}) }))
        setVideos(videoList)
        setActiveVideo(videoList[0])
      }
    })
  }, [id])


  useEffect(() => {
    if (activeVideo) {
      if (player?.current) {
        player.current?.seekTo(100);
      }
    }
  }, [activeVideo]
  )

  const handleUpdateProgress = (progress: number): void => {
    console.log(user)

    const value = { userId: user._id, videoId: activeVideo?._id, progress: progress, lessonId: id }
    fetch('/api/lessons/progress', { method: 'POST', body: JSON.stringify(value) })
  }

  const handleProgress = (state: any) => {
    const updated = [...videos]

    const video = find(updated, v => v._id == activeVideo?._id)

    if (video) {
      console.log("bura")
      video.progress = video?.duration === 0 ? 0 : (state.playedSeconds / video?.duration!) * 100;

      console.log("bura",)
      setActiveVideo(video)

      handleUpdateProgress(video.progress)
    }

    setVideos(updated);
  };

  const handleDuration = (duration: any) => {

    const updated = [...videos]

    const video = find(updated, v => v._id == activeVideo?._id)

    if (video) {
      video.duration = duration;
      setActiveVideo(video)
    }

    setVideos(updated);
  };

  console.log(activeVideo)

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-black shadow-none rounded-none",
        }}
      >
        <Tab value={"video"}
          onClick={() => setActiveTab("video")}
          className={activeTab === "video" ? "font-bold" : ""}>
          Video
        </Tab>
        <Tab value={"file"}
          onClick={() => setActiveTab("file")}
          className={activeTab === "file" ? "font-bold" : ""}>
          Fayllar
        </Tab>
        <Tab value={"info"}
          onClick={() => setActiveTab("info")}
          className={activeTab === "info" ? "font-bold" : ""}>
          Qeydlər
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value="file">
          <div className="flex flex-wrap  gap-3">
            {map(lesson?.files, (file, i) => (<Card shadow={false} className="w-44 h-32 bg-blue-50/70 p-3">
              <div className="flex text-blue-700 items-center justify-between">
                {file.type === "pdf" && <BsFileEarmarkPdfFill fontSize={40} />}
                {file.type === "word" && <FaFileWord fontSize={40} />}
                {file.type === "media" && <FaPhotoVideo fontSize={40} />}
                <a href={file.url} download>
                  <Button className="p-3 text-blue-700 rounded-full" variant="text"> <FaDownload fontSize={20} /></Button>
                </a>
              </div>
              <div className="p-1">
                <h2 title={file.title} className="text-blue-700 font-bold mt-2 whitespace-nowrap overflow-hidden text-ellipsis">{file.title}</h2>
                <p className="text-blue-700">Lessons</p>
              </div>
            </Card>))}
          </div>
        </TabPanel>
        <TabPanel value="info">
          <div>
            {map(lesson?.infos, (info, i) => (<Card shadow={false} className=" min-h-32 mb-5 bg-blue-50/70 p-3">
              <div className=" text-blue-700 font-bold ">
                {info.title}
              </div>
              <div className=" text-blue-700">
                <ReactMarkdown>{info.description}</ReactMarkdown>
              </div>
            </Card>))}
          </div>
        </TabPanel>
        <TabPanel value="video">
          <div className="flex gap-8">
            <div className="mb-5 w-full">
              <div className="w-full pt-[56%] relative">
                <div className="absolute rounded-xl overflow-hidden bg-black top-0 left-0 right-0 bottom-0">
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    progressInterval={3000}
                    ref={player}
                    playing={true}
                    controls={true}
                    url={activeVideo?.url} />
                </div>
              </div>
            </div>
            <Card shadow={false} className="p-4 w-[400px] border-2">
              <div className="flex flex-col gap-3">
                {
                  map(videos, (video, i) => (<ListItem key={i} selected={video._id === activeVideo?._id} className="bg-blue-50/70 p-3 flex-col items-start" onClick={() => {
                    setActiveVideo(video)
                  }}>
                    <div className="flex items-center gap-4">                     
                      <h2 title={video?.title} className="text-blue-700 font-bold mt-2 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{video.title}</h2>
                    </div>
                    <div className="p-1 w-full">
                      <Progress size="sm" value={video?.progress || 0} color="blue" />
                    </div>
                  </ListItem>))
                }
              </div>
            </Card>
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  )
}
