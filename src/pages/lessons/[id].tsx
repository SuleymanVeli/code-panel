import Layout from "@/components/layout";

import CardList from '@/components/cards/lessonListCard'
import { Card } from "@material-tailwind/react";
import useSWR from "swr";

// const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

  return (
    <Layout>      
      <div className="grid grid-cols-3 gap-3">
        <Card shadow={false} className="col-span-3 h-20 rounded-2xl bg-[url('https://static.vecteezy.com/system/resources/thumbnails/008/070/315/small/geometric-low-poly-graphic-repeat-pattern-background-free-vector.jpg')] flex px-10 text-gray-50 font-bold text-2xl justify-center bg-teal-300">
          <p>Lessons</p>
        </Card>
       
      </div>
    </Layout>
  )
}
