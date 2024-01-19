import { useEffect, useState } from "react";
import Table from "@/components/crudTable";
import { CrudDataType } from "@/types/crudDataType";
import { Lesson } from "@/models/lesson";
import fetcher from "@/utilities/fetcher";
import { Response } from "@/types/response";

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const types: CrudDataType[] = [
  {
    prop: '_id',
    name: "_id",
    type: "link",
    url: "/lessons/"
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
    prop: 'description',
    name: "Description",
    type: "string",
    show: true
  },
  {
    prop: 'infos',
    name: "Info",
    type: "array",
    defaultValue: {
      title: "",
      description: ""
    },
    props: [
      {
        prop: 'title',
        name: "Title",
        type: "string",
      },
      {
        prop: 'description',
        name: "Description",
        type: "editor",
      }
    ]
  },
  {
    prop: 'videos',
    name: "Video",
    type: "array",
    defaultValue: {
      title: "",
      url: ""
    },
    props: [
      {
        prop: 'title',
        name: "Title",
        type: "string",
      },
      {
        prop: 'url',
        name: "Video",
        type: "string",
      }
    ]
  },
  {
    prop: 'files',
    name: "File",
    type: "array",
    defaultValue: {
      title: "",
      type: "",
      url: ""
    },
    props: [
      {
        prop: 'title',
        name: "Title",
        type: "string",
      },
      {
        prop: 'type',
        name: "Type",
        type: "select",
        options: [
          'pdf',
          'word',
          'media'
        ]
      },
      {
        prop: 'url',
        name: "File",
        type: "string",
      }
    ]
  },

]

const defaultValue: Lesson = {
  videos: [],
  infos: [],
  files: [],
  description: "",
  tasks:[],
  name: ""
}

export default function Edit() {


  const [list, setList] = useState<Lesson[]>([])

  const handleData = () => {
    fetcher('/api/lessons').then((data: Response<Lesson[]>) => {
      setList(data.data || [])
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
