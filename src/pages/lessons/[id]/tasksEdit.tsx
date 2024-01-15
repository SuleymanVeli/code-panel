import { useEffect, useState } from "react";
import Table from "@/components/crudTable";
import { CrudDataType } from "@/types/crudDataType";
import { Lesson, Task } from "@/models/lesson";
import fetcher from "@/utilities/fetcher";
import { Response } from "@/types/response";
import { useRouter } from "next/router";

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const types: CrudDataType[] = [ 
  {
    prop: 'name',
    name: "Name",
    type: "string",
    show: true
  },
  {
    prop: 'description',
    name: "Description",
    type: "editor",
    show: true
  },
  {
    prop: 'answerType',
    name: "Answer Type",
    type: "select",
    show: true,
    options: [
      'file',
      'code'
    ]
  },

]

const defaultValue: Task = { 
    answerType: "",
    answers:[],
    description: "",
    name: "" 
}

export default function Tasks() {
  const [list, setList] = useState<Task[]>([])

  const router = useRouter()

  const { id } = router.query;

  const handleData = () => {
    fetcher(`/api/lessons/${id}/tasks`).then((data: Response<Task[]>) => {
      setList(data.data || [])
    })
  }

  useEffect(() => {
    handleData()
  }, [])

  const handleSave = async (value: Task): Promise<void> => {
    await fetch(`/api/lessons/${id}/tasks`, { method: 'POST', body: JSON.stringify(value) })
    handleData()
    return;
  }

  const handleDelete = async (value: Task): Promise<void> => {
    await fetch(`/api/lessons${id}/tasks`, { method: 'DELETE', body: JSON.stringify(value) })
    handleData()
    return;
  }

  return (
    <Table data={list} types={types} save={handleSave} deleteValue={handleDelete} title="Task" defaultValue={defaultValue} />
  )
}
