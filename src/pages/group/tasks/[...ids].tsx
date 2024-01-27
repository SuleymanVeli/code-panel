import React, { useEffect, useState } from "react";

import ReactMarkdown from "@/components/mkd/ReactMarkdown";
import { useRouter } from "next/router";
import { Response } from "@/types/response";
import fetcher from "@/utilities/fetcher";
import { cloneDeep, find, includes, keys, map } from "lodash";
import { Answer, Task } from "@/models/task";
import { TaskItem } from "@/models/task";
import { Alert, Button, Chip, Textarea } from "@material-tailwind/react";
import Editor from "@monaco-editor/react";
import { useUser } from "@/providers/userProvider";
import { CodeType } from "@/types/task";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import { FaInfoCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { FaClock } from "react-icons/fa";
import { Select, Option } from "@material-tailwind/react";


export default function Page() {
  const [open, setOpen] = useState(0);
  // const [debouncedInputValue, setDebouncedInputValue] = useState<any>(null);
  const [inputs, setInputs] = useState<any>(null);
  const [comment, setComment] = useState<any>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const [list, setList] = useState<TaskItem[]>([])

  const router = useRouter()

  const ids = router.query.ids || ['', '']

  const userId = ids[0]
  const id = ids[1]

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (inputs) sendPostRequest(inputs);
    }, 1000);

    return () => {
      console.log("clear")
      clearTimeout(timerId);
    };
  }, [inputs]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (comment) sendPostRequest(comment);
    }, 1000);

    return () => {
      console.log("clear")
      clearTimeout(timerId);
    };
  }, [comment]);


  const sendPostRequest = (value: any) => {
    fetch(`/api/group/tasks/${userId}/${id}`, { method: 'POST', body: JSON.stringify(value) })
    .then((res)=>{}).catch((err)=>handleData())
  };
 
  useEffect(() => {
    handleData()
  }, [])

  const handleData = () => {
    fetcher(`/api/group/tasks/${userId}/${id}`).then((data: Response<TaskItem[]>) => {
      setList(data.data || [])
    })
  }

  // const handleOpen = (value: any, task: TaskModel) => {
  //     setActiveTask(task)
  //     setOpen(open === value ? 0 : value);
  // }

  const handleUpdate = (value: any, item: TaskItem, prop: string): void => {
    const update: TaskItem[] = cloneDeep(list)

    const updatedItem = find(update, i => i._id == item._id)

    if (!updatedItem) return;

    if (updatedItem?.answer) {

      if (prop == "status") {
        updatedItem.answer[prop] = value;

        sendPostRequest({ itemId: item._id, value: value, type: prop })

        setList(update)
        return;
      }

      if (prop == "comment") {
        updatedItem.answer[prop] = value;
    
        if (comment && comment?.itemId !== item._id) {
          sendPostRequest(comment)
        }

        setComment({ itemId: item._id, value: value, type: prop })

        setList(update)
        return;
      }

      const code: any = updatedItem?.answer?.code

      code[prop] = value;
    }

    if (inputs && inputs?.itemId !== item._id) {
      sendPostRequest(inputs)
    }

    setInputs({ itemId: item._id, code: updatedItem?.answer?.code, type: "code" })

    setList(update)
  }


  const renderCode = (type: string, item: TaskItem) => {

    const code: any = item.answer?.code;

    if (type === 'html' || type === "javascript" || type === "csharp")

      return <div className="flex flex-col gap-2">
        <Chip className="w-min" color="blue" value={type} />
        <Editor
          className="rounded-lg overflow-hidden"
          height="300px"
          language="javascript"
          theme="vs-dark"
          value={code?.code}
          onChange={value => handleUpdate(value, item, 'code')}
        /></div>

    if (includes(type, 'html') || includes(type, 'javascript') || includes(type, 'css'))

      return <div className="flex rounded-lg overflow-hidden gap-1">
        {
          includes(type, 'html') && <div className="w-full">
            <Chip className="w-min mb-2" color="blue" value="html" />
            <Editor
              className="rounded-lg overflow-hidden"
              height="300px"
              language="html"
              theme="vs-dark"
              value={code?.html}
              onChange={value => handleUpdate(value, item, 'html')}
            />
          </div>
        }
        {
          includes(type, 'css') && <div className="w-full">
            <Chip className=" w-min mb-2" color="blue" value="css" />
            <Editor
              className="rounded-lg overflow-hidden"
              height="300px"
              language="css"
              theme="vs-dark"
              value={code?.css}
              onChange={value => handleUpdate(value, item, 'css')}
            />
          </div>
        }
        {
          includes(type, 'javascript') && <div className="w-full">
            <Chip className=" w-min mb-2" color="blue" value="javascript" />
            <Editor
              className="rounded-lg overflow-hidden"
              height="300px"
              language="javascript"
              theme="vs-dark"
              value={code?.js}
              onChange={value => handleUpdate(value, item, 'js')}
            />
          </div>
        }
      </div>

    return <div></div>

  }

  const handleDownloadFiles=(code:any, type:string)=>{

    let extension = '';
    if(type === "javascript") extension = "js";
    if(type === "css") extension = "html";
    if(type === "html") extension = "html";
    if(type === "csharp") extension = "cs";

    for(const key of keys(code)){
       downloadFile(code[key], key === "code"? extension : key)
    }    
  }

  const downloadFile=(content:string,type:string)=>{

    const fileName = `index.${type}`;

    const blob = new Blob([content], { type: 'text/plain' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="flex flex-col gap-4" >{
      map(list, (item, i) => (
        <div key={i} className="border-2 rounded-lg overflow-hidden p-3">
          <div className="text-3xl font-sans  mb-3 capitalize mt-2 flex gap-4">
            {item.name}

            <div className="w-[100px] h-5">
              <Select size="md" value={item.answer?.status} onChange={(value) => handleUpdate(value, item, 'status')}>
                <Option value="success">success</Option>
                <Option value="wrong">wrong</Option>
                <Option value="pending">pending</Option>
              </Select>
            </div>
          
          </div>

          <ReactMarkdown>
            {item.description}
          </ReactMarkdown>

          {/* {item.description}
                </ReactMarkdown> */}

          <div className="border-b-2 my-2"></div>

          <div className="border-b-2 my-2 pb-2">
            <Textarea title='Comment' value={item.answer?.comment} onChange={(e) => handleUpdate(e.target.value, item, 'comment')} />
          </div>

          {item?.answer?.code && <Button color="blue-gray" className="mb-4" onClick={()=>handleDownloadFiles(item.answer?.code, item.answerType) }>Download files</Button>}

          {renderCode(item.answerType, item)}
        </div>
      ))
    }
    </div>
  );
}

