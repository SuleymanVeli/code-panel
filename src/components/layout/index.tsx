import Image from "next/image"
import Sidebar from "../sidebar"
import { useUser } from "@/providers/userProvider"

type PropType = {
  children: JSX.Element
}

export default function Layout({ children }: PropType) {
  const {user} = useUser()

  return (
    <div className="flex bg-[url(../images/bg4.jpg)] min-h-screen">
      <Sidebar />
      <div className="basis-full flex flex-col pb-4 pr-4">
        <div className="h-16 p-3 z-10 items-center gap-3 flex">
          <p className="ml-auto font-bold text-blue-gray-900">{user?.email}</p>
          <div className=" rounded-full w-10 h-10 overflow-hidden">
            <Image src={user?.image} alt="" width={100} height={100}/>
          </div>
          
        </div>
        <main className='rounded-3xl p-6 bg-white h-full shadow-sm'>
          {children}
        </main>
      </div>
    </div>
  )
}