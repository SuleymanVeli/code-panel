import CardList from '@/components/cards/lessonListCard'
import { Card, ListItem } from "@material-tailwind/react";
import useSWR from "swr";
import { Response } from "@/types/response";
import { Lesson } from "@/types/lesson";
import { map } from "lodash";
import fetcher from "@/utilities/fetcher";
import Image from 'next/image';
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Link from 'next/link';


export default function Home() {

  const { data, error, isLoading } = useSWR<Response<Lesson[]>>('/api/lessons', fetcher)

  return (
    <div className="grid gap-3">

      {map(data?.data, (item:any, i) => (
        <Card shadow={false} className='h-24 bg-blue-50/40 p-4 flex flex-row items-center gap-6'>
            <div className=''>#1</div>
            <div className='bg-blue-50 rounded-full p-2'>
              <Image src='/images/grip-solid.svg' className='w-10 h-10' width={40} height={40} alt='' />
            </div>
            <div className='text-blue-900 mr-auto'>
              <p className='font-bold'>Name</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <Link href={`/lessons/${item._id}`}>
              <div className='bg-blue-50 rounded-full py-2 px-4 text-deep-purple-500 hover:text-deep-purple-900 flex flex-warp items-center gap-3'>             
                <p>Məlumatlar</p> <FiExternalLink />
              </div>
            </Link>
            <Link href={`/lessons/${item._id}/tasks`}>            
              <div className='bg-blue-50 rounded-full py-2 px-4 text-deep-purple-500 hover:text-deep-purple-900 flex flex-wrap items-center gap-3'>              
                <p>Tapşırıqlar</p><FiExternalLink />
              </div>
            </Link>
        </Card>
      ))}
    </div>
  )
}
