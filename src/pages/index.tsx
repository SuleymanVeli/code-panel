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



  return (<div>
    
  </div>
  
  )
}
