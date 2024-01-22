import React, { useEffect, useState } from "react";

import ReactMarkdown from "@/components/mkd/ReactMarkdown";
import { useRouter } from "next/router";
import { Response } from "@/types/response";
import fetcher from "@/utilities/fetcher";
import { find, includes, map } from "lodash";
import { Answer, Task } from "@/models/task";
import { TaskItem } from "@/models/task";
import { Button, Chip, Textarea } from "@material-tailwind/react";
import Editor from "@monaco-editor/react";


export default function Page() {
    const [open, setOpen] = useState(0);

    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const [list, setList] = useState<TaskItem[]>([])

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
        const update: TaskItem[] = [...list]

        const updatedItem = find(update, i => i._id == item._id)

        if (updatedItem?.answer?.code) {

            const code: any = updatedItem?.answer?.code

            code[prop] = value;

            setList(update)
        }
    }

    // const handleUpdateAnswer = (): void => {
    //           const value = { userId: user._id, taskId: activeTask?._id, answer: activeTask, lessonId: id }
    //     fetch('/api/lessons/answer', { method: 'POST', body: JSON.stringify(value) })
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
                            value={code?.html}
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
                            value={code?.html}
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
            <div className="border-2 rounded-lg overflow-hidden p-3">
                <div className="text-3xl text-light-blue-800 font-sans font-normal mb-3 capitalize mt-2">{item.name}</div>
                <ReactMarkdown>
                    {item.description}
                </ReactMarkdown>

                {/* {item.description}
                </ReactMarkdown> */}

                <div className="border-b-2 my-2"></div>

                {renderCode(item.answerType, item)}
            </div>
            ))
        }
        </div>
    );
}