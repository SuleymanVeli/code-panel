import Layout from "@/components/layout";

import CardList from '@/components/cards/lessonListCard'
import { Button, Card, IconButton, ListItem, Progress, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useSession } from 'next-auth/react';
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaDownload, FaPlay } from "react-icons/fa6";
import { FaFileWord } from "react-icons/fa6";
import { FaPhotoVideo } from "react-icons/fa";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const [activeTab, setActiveTab] = useState("video");

  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = (state: any) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const handleDuration = (duration: any) => {
    setDuration(duration);
  };

  const calculateProgress = () => {
    if (duration === 0) return 0;

    return (playedSeconds / duration) * 100;
  };



  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-deep-purple-500 shadow-none rounded-none",
        }}
      >
        <Tab value={"video"}
          onClick={() => setActiveTab("video")}
          className={activeTab === "video" ? "text-deep-purple-500" : "text-deep-purple-300"}>
          Video
        </Tab>
        <Tab value={"file"}
          onClick={() => setActiveTab("file")}
          className={activeTab === "file" ? "text-deep-purple-500" : "text-deep-purple-300"}>
          Fayllar
        </Tab>
        <Tab value={"info"}
          onClick={() => setActiveTab("info")}
          className={activeTab === "info" ? "text-deep-purple-500" : "text-deep-purple-300"}>
          Qeydlər
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value="file">
          <div className="flex flex-wrap  gap-3">
            <Card shadow={false} className="w-44 h-32 bg-blue-50/70 p-3">
              <div className="flex text-blue-700 items-center justify-between">
                <BsFileEarmarkPdfFill fontSize={40} />
                <Button className="p-3 text-blue-700 rounded-full" variant="text"> <FaDownload fontSize={20} /></Button>
              </div>
              <div className="p-1">
                <h2 className="text-blue-700 font-bold mt-2">Lessons</h2>
                <p className="text-blue-700">Lessons</p>
              </div>
            </Card>
            <Card shadow={false} className="w-44 h-32 bg-blue-50/70 p-3">
              <div className="flex text-blue-700 items-center justify-between">
                <FaFileWord fontSize={40} />
                <Button className="p-3 text-blue-700 rounded-full" variant="text"> <FaDownload fontSize={20} /></Button>
              </div>
              <div className="p-1">
                <h2 className="text-blue-700 font-bold mt-2">Lessons</h2>
                <p className="text-blue-700">Lessons</p>
              </div>
            </Card>

          </div>
        </TabPanel>
        <TabPanel value="info">
          <div>
            info
          </div>
        </TabPanel>
        <TabPanel value="video">
          <div className="mb-5 rounded-xl overflow-hidden w-min">
            <ReactPlayer
              onProgress={handleProgress}
              onDuration={handleDuration}
              progressInterval={3000}
              playing={true}
              controls={true}
              url='https://www.youtube.com/watch?v=Mqa6UhVSa0g' />
          </div>
          <div className="flex flex-wrap  gap-3">
            <Card shadow={false} className="w-44 h-32 bg-blue-50/70 p-3">
              <div className="flex text-blue-700 items-center justify-between pl-1">
                <FaPhotoVideo fontSize={40} />
                <Button className="p-3 text-blue-700 rounded-full" variant="text"> <FaPlay fontSize={20} /></Button>
              </div>
              <div className="p-1">
                <h2 className="text-blue-700 font-bold mt-2 mb-2">Lessons</h2>
                {/* <p className="text-blue-700">Lessons</p> */}
                <Progress size="sm" value={calculateProgress()} color="blue" />
              </div>
            </Card>          
          </div>
        </TabPanel>
      </TabsBody>
    </Tabs>
  )
}
