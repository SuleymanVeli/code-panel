import { Button, Card, CardHeader, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from "@material-tailwind/react"
import React, { useState } from "react"
import { FaPlay } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

type PropType = {
    video: string,
    videoId: string
}

const Index = ({ video, videoId }: PropType) => {

    const [open, setOpen] = useState(false);

    return <div>
        <Card className="w-48 h-48">
            <CardHeader floated={false} className="h-full m-3 flex relative overflow-hidden group justify-center text-white items-center ">
                <div onClick={()=>setOpen(true)} className="absolute pl-1 bg-blue-gray-100 h-full opacity-0 group-hover:opacity-70 w-full z-10 flex justify-center items-center text-black cursor-pointer">
                    <FaPlay fontSize={50} />
                </div>
                <img src={`https://i2.ytimg.com/vi/${videoId}/0.jpg`} className="w-full h-[144%] object-cover" alt="profile-picture" />
            </CardHeader>
        </Card>
        <Dialog open={open} handler={() => setOpen(false)} className="h-2/3 w-full rounded-xl">
            <DialogBody className="h-full p-2">                
                <iframe width="100%" height="100%" 
                className="rounded-lg overflow-hidden"
                    src={video} 
                    title="YouTube video player"                                      
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    >                    
                </iframe>              
            </DialogBody>
        </Dialog>
    </div>
}
export default Index