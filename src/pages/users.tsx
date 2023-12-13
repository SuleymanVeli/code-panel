import { useEffect, useState } from "react";
import Table from "@/components/crudTable";
import { CrudDataType } from "@/types/crudDataType";
import fetcher from "@/utilities/fetcher";
import { Response } from "@/types/response";
import { User } from "@/models/user";

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const types: CrudDataType[] = [
  {
    prop: 'name',
    name: "Full name",
    type: "string",
    show: true
  },
  {
    prop: 'email',
    name: "Email",
    type: "string",    
  },
  {
    prop: 'image',
    name: "Image",
    type: "image",    
  },
  {
    prop: 'roole',
    name: "Roole",
    type: "select",    
    show: true,
    options:[
      "user",
      "admin"
    ]
  },
  {
    prop: 'status',
    name: "Status",
    type: "select",
    show: true,
    options:[
      "active",
      "admin"
    ]
  }
]

const defaultValue: User = { 
  name: "",
  email: "",
  roole: "",
  status: "",
  image: ""
}

export default function Edit() {


  const [list, setList] = useState<User[]>([])

  const handleData = ()=>{
    fetcher('/api/users').then((data: Response<User[]>)=>{
      setList(data.data || [])
    })  
  }

  useEffect(() => {
    handleData()
  }, [])

  const handleSave = async (value: User): Promise<void> => {
    await fetch('/api/users', { method: 'POST', body: JSON.stringify(value) })
    handleData()
    return;
  }

  const handleDelete = async (value: User): Promise<void> => {
    await fetch('/api/users', { method: 'DELETE', body: JSON.stringify(value) })
    handleData()
    return;
  }

  return (
      <Table data={list} types={types} save={handleSave} deleteValue={handleDelete} title="Users" defaultValue={defaultValue} />
  )
}
