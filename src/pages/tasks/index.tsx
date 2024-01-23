import { ListItem } from "@material-tailwind/react";
import useSWR from "swr";
import { Response } from "@/types/response";
import { filter, find, map, some } from "lodash";
import fetcher from "@/utilities/fetcher";
import Link from 'next/link';
import { Task } from "@/models/task";
import { useUser } from "@/providers/userProvider";

export default function Home() {

  const { data, error, isLoading } = useSWR<Response<Task[]>>('/api/tasks', fetcher)

  const { user } = useUser()
  console.log(user)

  return (
    <div className="grid gap-3">

      {map(data?.data, (item: any, i) => (<Link href={`/tasks/${item?._id}`}>
        <ListItem className='bg-blue-50/40 hover:bg-blue-50/80 p-4 flex flex-row items-center gap-6'>
          <div className='text-blue-900 font-bold'>{item?.number}</div>
          <div className='text-blue-900'>{item?.name}</div>

          <div className="ml-auto"></div>

          {some(item?.items, a => !a.answers?.length || !find(a.answers, ans => ans.userId == user._id)) &&
            <div className='text-white bg-light-blue-500 py-1 px-3 rounded-xl'>Yeni {
            filter(item?.items, a => !a.answers?.length || !find(a.answers, ans => ans.userId == user._id))?.length}
            </div>}
          {some(item?.items, a => some(a.answers, ans => ans.userId === user._id && ans.status === "success")) &&
            <div className='text-white bg-green-400 py-1 px-3  rounded-xl'>Düzgün {
            filter(item?.items, a => some(a.answers, ans => ans.userId === user._id && ans.status === "success"))?.length}
            </div>}
          {some(item?.items, a => some(a.answers, ans => ans.userId === user._id && ans.status === "wrong")) &&
            <div className='text-white bg-red-600 py-1 px-3  rounded-xl'>Səhv {
            filter(item?.items, a => some(a.answers, ans => ans.userId === user._id && ans.status === "wrong"))?.length}
            </div>}
          {some(item?.items, a => some(a.answers, ans => ans.userId === user._id && ans.status === "pending")) &&
            <div className='text-white bg-blue-gray-400 py-1 px-3  rounded-xl'>Yoxlamada {
            filter(item?.items, a => some(a.answers, ans => ans.userId === user._id && ans.status === "pending"))?.length}
            </div>}
        </ListItem></Link>
      ))}
    </div>
  )
}
