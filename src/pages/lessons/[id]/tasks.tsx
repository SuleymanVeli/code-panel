import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Textarea,
    Button,
} from "@material-tailwind/react";
import Code from "@/components/code/Code";
import ReactMarkdown from "@/components/mkd/ReactMarkdown";
import File from "@/components/file/File";
import { useRouter } from "next/router";
import { Response } from "@/types/response";
import fetcher from "@/utilities/fetcher";
import { find, map } from "lodash";
import { TaskModel } from "@/types/lesson";
import { Answer, Task } from "@/models/lesson";
import { useUser } from "@/providers/userProvider";

function Icon({ id, open }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

export default function AccordionCustomIcon() {
    const [open, setOpen] = useState(0);

    const [activeTask, setActiveTask] = useState<TaskModel | null>(null)
    const [list, setList] = useState<TaskModel[]>([])

    const router = useRouter()

    const { user } = useUser()

    const { id } = router.query;

    useEffect(() => {
        handleData()
    }, [])

    const handleData = () => {
        fetcher(`/api/lessons/${id}/tasks`).then((data: Response<Task[]>) => {

            const laskList = map(data.data, v => ({ ...v, ...(find(v.answers, (p: Answer) => p.userId == user._id) || {}) }))
            setList(laskList || [])
        })
    }

    const handleOpen = (value: any, task: TaskModel) => {
        setActiveTask(task)
        setOpen(open === value ? 0 : value);
    }

    const handleUpdate = (value: any, prop: string): void => {
        const update: any = { ...activeTask }
        update[prop] = value;
        setActiveTask(update)
    }

    const handleUpdateAnswer = (): void => {
        console.log(user)

        const value = { userId: user._id, taskId: activeTask?._id, answer: activeTask, lessonId: id }
        fetch('/api/lessons/answer', { method: 'POST', body: JSON.stringify(value) })
    }

    return (
        <>{
            map(list, (item, i) => (
                <Accordion open={open === i} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(open === i ? -1 : i, item)}>{item.name}</AccordionHeader>
                    <AccordionBody>
                        <ReactMarkdown>
                            {item.description}
                        </ReactMarkdown>
                        {
                            item.answerType == "code" ? <Textarea label="Cavab" onChange={(e) => handleUpdate(e.target.value, "code")} value={activeTask?.code} /> : null
                        }
                        {
                            item.answerType == "file" ? <File onChange={(f: any) => { handleUpdate(f, "file") }} value={activeTask?.file} /> : null
                        }
                        <Button onClick={() => handleUpdateAnswer()}>Gonder</Button>

                        {
                            item?.answerType == "code" && item?.code ?
                                <Code>
                                    {item?.code}
                                </Code> : null
                        }
                    </AccordionBody>
                </Accordion>
            ))
        }

        </>
    );
}