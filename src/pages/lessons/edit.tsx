import { useEffect, useState } from "react";
import Table from "@/components/crudTable";
import { CrudDataType } from "@/types/crudDataType";
import { Lesson } from "@/models/lesson";
import fetcher from "@/utilities/fetcher";
import { Response } from "@/types/response";

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const types: CrudDataType[] = [
  {
    prop: 'name',
    name: "_id",
    type: "link",
    url: "/lessons/"
  },
  {
    prop: 'name',
    name: "Name",
    type: "string",
    show: true
  },
  {
    prop: 'text',
    name: "Text",
    type: "editor",    
  },
  {
    prop: 'text1',
    name: "Text 1",
    type: "select",    
    options:[
      "aaa",
      "bbbb",
      "sssss"
    ]
  },
  {
    prop: 'list',
    name: "List",
    type: "array",
    defaultValue:{
      name:"",
      video:""
    },
    props:[
      {
        prop: 'name',
        name: "Name",
        type: "string",
      }, 
      {
        prop: 'video',
        name: "Video",
        type: "string",
      }
    ]
  }
]

const defaultValue: Lesson = {
  list:[],
  text:"",
  text1:"",
  name: ""
}

export default function Edit() {


  const [list, setList] = useState<Lesson[]>([])

  const handleData = ()=>{
    fetcher('https://jsonplaceholder.typicode.com/todos').then((data: Response<Lesson[]>)=>{
     // setList(data.data || [])
    })  
  }

  useEffect(() => {
    handleData()
  }, [])

  const handleSave = async (value: Lesson): Promise<void> => {
    await fetch('/api/lessons', { method: 'POST', body: JSON.stringify(value) })
    handleData()
    return;
  }

  const handleDelete = async (value: Lesson): Promise<void> => {
    await fetch('/api/lessons', { method: 'DELETE', body: JSON.stringify(value) })
    handleData()
    return;
  }

  return (
      <Table data={list} types={types} save={handleSave} deleteValue={handleDelete} title="Lesson" defaultValue={defaultValue} />
  )
}
