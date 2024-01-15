import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import * as React from "react"
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { BsFileEarmarkPdf, BsFileEarmarkPdfFill } from "react-icons/bs";
import { FaRegFileWord } from "react-icons/fa6";
import { RiJavascriptFill } from "react-icons/ri";
import { BiSolidFileHtml } from "react-icons/bi";
import { BiSolidFileCss } from "react-icons/bi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";

type PropType = {
    file: "pdf" | "word" | "js" | "cs" | "text" | "html" | "css"
}

const index = ({ file }: PropType) => (
    <Card  className="w-44 h-32 bg-blue-50 p-3">
    <div className="flex text-blue-700 items-center justify-between">
      <BsFileEarmarkPdfFill fontSize={40} />
      <Button className="p-3 text-blue-700" variant="text"> <FaDownload fontSize={20}/></Button>           
    </div>
    <div className="p-1">
      <h2 className="text-blue-700 font-bold mt-2">Lessons</h2>
      <p className="text-blue-700">Lessons</p>
    </div>          
  </Card>
)
export default index