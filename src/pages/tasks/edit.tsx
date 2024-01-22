import { useEffect, useState } from "react";
import Table from "@/components/crudTable";
import { CrudDataType } from "@/types/crudDataType";
import { Task } from "@/models/task";
import fetcher from "@/utilities/fetcher";
import { Response } from "@/types/response";

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const types: CrudDataType[] = [
  {
    prop: '_id',
    name: "_id",
    type: "link",
    url: "/tasks/"
  },
  {
    prop: 'number',
    name: "No",
    type: "number",
    show: true
  },
  {
    prop: 'name',
    name: "Name",
    type: "string",
    show: true
  }, 
  {
    prop: 'items',
    name: "Items",
    type: "array",
    defaultValue: {
      name: "",
      description: "",
      answerType: "c#",
      answers: []
    },
    props: [
      {
        prop: 'name',
        name: "Name",
        type: "string",
      },
      {
        prop: 'description',
        name: "Description",
        type: "editor",
      },      
      {
        prop: 'answerType',
        name: "Answer Type",
        type: "select",
        options: [
          'html',
          'html,css',
          'html,css,javascript',
          'javascript',
          'c#'           
        ]
      },          
    ]
  },

]

const defaultValue: Task = {
  items:[],  
  name: "",
  number: 0
}

export default function Edit() {


  const [list, setList] = useState<Task[]>([])

  const handleData = () => {
    fetcher('/api/tasks').then((data: Response<Task[]>) => {
      setList(data.data || [])
    })
  }

  useEffect(() => {
    handleData()
  }, [])

  const handleSave = async (value: Task): Promise<void> => {
    await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(value) })
    handleData()
    return;
  }

  const handleDelete = async (value: Task): Promise<void> => {
    await fetch('/api/tasks', { method: 'DELETE', body: JSON.stringify(value) })
    handleData()
    return;
  }

  return (
    <Table data={list} types={types} save={handleSave} deleteValue={handleDelete} title="Task" defaultValue={defaultValue} />
  )
}
