import Image from "next/image"
import Sidebar from "../sidebar"
import { useUser } from "@/providers/userProvider"

type PropType = {
  children: JSX.Element
}

export default function Layout({ children }: PropType) {
  const {user} = useUser()

  return (
    <div className="flex">
      <Sidebar />
      <div className="basis-full">
        <div className="h-16 p-3 bg-navColor border-solid border-b border-b-borderColor sticky top-0 z-10 items-center gap-3 flex">
          <p className="ml-auto text-blue-700 ">{user?.email}</p>
          <div className=" rounded-full w-10 h-10 overflow-hidden">
            <Image src={user?.image} alt="" width={100} height={100}/>
          </div>
          
        </div>
        <main className=' p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}