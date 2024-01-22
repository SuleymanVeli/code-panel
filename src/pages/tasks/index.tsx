import { Card, ListItem } from "@material-tailwind/react";
import useSWR from "swr";
import { Response } from "@/types/response";
import { Lesson } from "@/types/lesson";
import { map } from "lodash";
import fetcher from "@/utilities/fetcher";
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { Task } from "@/models/task";

export default function Home() {

  const { data, error, isLoading } = useSWR<Response<Task[]>>('/api/tasks', fetcher)

  return (
    <div className="grid gap-3">

      {map(data?.data, (item:any, i) => (<Link href={`/tasks/${item?._id}`}>
        <ListItem className='bg-blue-50/40 hover:bg-blue-50/80 p-4 flex flex-row items-center gap-6'>
            <div className='text-blue-900 font-bold'>{item?.number}</div>                       
            <div className='text-blue-900'>{item?.name}</div>  
        </ListItem></Link>
      ))}
    </div>
  )
}
