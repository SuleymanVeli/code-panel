import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react"
import * as React from "react"
import { IoArrowDownCircleSharp } from "react-icons/io5";
import { BsFileEarmarkPdf } from "react-icons/bs";
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
    <Card className="w-full max-w-[48rem] h-28 flex-row ">
        <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-24 h-28 flex relative overflow-hidden group justify-center text-white items-center shrink-0 rounded-r-none bg-gradient-to-r from-blue-gray-800 to-blue-gray-900"
        >
            <div className="absolute bg-blue-gray-100 h-full opacity-0 group-hover:opacity-70 w-full z-10 flex justify-center items-center text-black cursor-pointer">
                <FaDownload fontSize={40} />
            </div>
            {file == "pdf" ? <BsFileEarmarkPdf fontSize={60} /> : null}
            {file == "word" ? <FaRegFileWord fontSize={60} /> : null}
            {file == "js" ? <RiJavascriptFill fontSize={60} /> : null}
            {file == "html" ? <BiSolidFileHtml fontSize={60} /> : null}
            {file == "css" ? <BiSolidFileCss fontSize={60} /> : null}
        </CardHeader>
        <CardBody>
            <Typography color="blue-gray" className="mb-1 whitespace-nowrap overflow-ellipsis">
                Lyft launching
            </Typography>
            <Typography color="gray" className="mb-2 uppercase">
                startups
            </Typography>
            {/* <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Download
            <IoArrowDownCircleSharp fontSize={25} />
          </Button>
        </a> */}
        </CardBody>
    </Card>
)
export default index