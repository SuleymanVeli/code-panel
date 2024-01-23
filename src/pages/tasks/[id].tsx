import React, { useEffect, useState } from "react";

import ReactMarkdown from "@/components/mkd/ReactMarkdown";
import { useRouter } from "next/router";
import { Response } from "@/types/response";
import fetcher from "@/utilities/fetcher";
import { cloneDeep, find, includes, map, noop, some } from "lodash";
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


export default function Page() {
    const [open, setOpen] = useState(0);
    // const [debouncedInputValue, setDebouncedInputValue] = useState<any>(null);
    const [inputs, setInputs] = useState<any>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const { userId } = useUser()

    const [list, setList] = useState<TaskItem[]>([])

    useEffect(() => {
        const timerId = setTimeout(() => {   
            if(inputs) sendPostRequest(inputs);
        }, 1000);

        return () => {
            console.log("clear")
            clearTimeout(timerId);
        };
    }, [inputs]);


    const sendPostRequest = (value: any) => {       
        fetch(`/api/tasks/${id}`, { method: 'POST', body: JSON.stringify(value) }).then((res)=>{
            
        }).catch((err)=>handleData())
    };

    const router = useRouter()

    const { id } = router.query;

    useEffect(() => {
        handleData()
    }, [])

    const handleData = () => {
        fetcher(`/api/tasks/${id}`).then((data: Response<TaskItem[]>) => {
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

            const code: any = updatedItem?.answer?.code

            code[prop] = value;
        }
        else {

            let code: any;

            if (item.answerType === 'html' || item.answerType === "javascript" || item.answerType === "csharp")
                code = { code: '' }
            if (item.answerType === 'html,css')
                code = { html: '', css: '' }
            if (item.answerType === 'html,css,javascript')
                code = { html: '', css: '', js: '' }

            code[prop] = value;

            updatedItem.answer = {
                userId: userId,
                code: code
            }
        }
     
        if(inputs && inputs?.itemId !== item._id){
            sendPostRequest(inputs)
        }

        setInputs({ itemId: item._id, code: updatedItem?.answer?.code})

        setList(update)
    }

    // const handleUpdateAnswer = (): void => {
    //          
    // }

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
                    options={{readOnly:  item.answer?.status === "success"}}              
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
                            options={{readOnly:  item.answer?.status === "success"}}    
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
                            options={{readOnly:  item.answer?.status === "success"}}   
                            value={code?.css}
                            onChange={value =>handleUpdate(value, item, 'css')}
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
                            options={{readOnly:  item.answer?.status === "success"}}   
                            value={code?.js}
                            onChange={value => handleUpdate(value, item, 'js')}
                        />
                    </div>
                }
            </div>

        return <div></div>

    }

    return (
        <div className="flex flex-col gap-4" >{
            map(list, (item, i) => (
                <div key={i} className="border-2 rounded-lg overflow-hidden p-3">
                    <div className="text-3xl font-sans  mb-3 capitalize mt-2 flex gap-4">
                        {item.name} 

                       {item.answer?.status == "success" && <Chip className="h-8" color="green" icon={<RiVerifiedBadgeFill className='w-4 h-5'/>} value="Düzgün" />}
                       {item.answer?.status == "wrong" &&  <Chip className="h-8" color="red" icon={<VscError className='w-4 h-5'/>} value="Səhv" />}
                       {item.answer?.status == "pending" &&  <Chip className="h-8" color="teal" icon={<FaClock className='w-4 h-5'/>} value="Yoxlanişda" />}                  
                     </div>

                    <ReactMarkdown>
                        {item.description}
                    </ReactMarkdown>

                    {/* {item.description}
                </ReactMarkdown> */}

                    <div className="border-b-2 my-2"></div>

                    {item.answer?.comment && <div className="border-b-2 my-2 pb-2">
                        <Alert variant="ghost" >       
                        <div className="flex gap-4  items-center">
                        <FaInfoCircle className="text-red-900"/>
                        <p>
                                {item.answer?.comment}    
                        </p>
                        </div> 
                        </Alert>                                          
                    </div>}

                    {renderCode(item.answerType, item)}
                </div>
            ))
        }
        </div>
    );
}