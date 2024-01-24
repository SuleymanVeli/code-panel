import { Card } from "@material-tailwind/react";
import useSWR from "swr";
import { Response } from "@/types/response";
import { Lesson } from "@/types/lesson";
import { map } from "lodash";
import fetcher from "@/utilities/fetcher";
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";

export default function Lessons() {

  const { data, error, isLoading } = useSWR<Response<Lesson[]>>('/api/lessons', fetcher)

  return (
    <div className="grid gap-3">

      {map(data?.data, (item:any, i) => (<Link href={`/lessons/${item?._id}`}>
        <Card shadow={false} className='h-24 bg-blue-50/40 hover:bg-blue-50/80 p-4 flex flex-row items-center gap-6'>
            <div className='p-2'>
              <Image src='/images/videobook.png' className='w-12 h-12' width={40} height={40} alt='' />
            </div>
            <div className='text-blue-900 mr-auto'>
              <p className='font-bold'>{item?.name}</p>
              <p>{item?.description}</p>
            </div>
            
            <div className='text-indigo-700  text-[25px]'>
              <FaYoutube/>
            </div>
            <div className='text-indigo-700 text-[25px] mr-4'>
              <FaRegFileAlt />
            </div>
            
            {/* <Link href={`/lessons/${item?._id}/tasks`}>            
              <div className='bg-blue-50 rounded-full py-2 px-4 text-deep-purple-500 hover:text-deep-purple-900 flex flex-wrap items-center gap-3'>              
                <p>Tapşırıqlar</p><FiExternalLink />
              </div>
            </Link> */}
        </Card></Link>
      ))}
    </div>
  )
}
