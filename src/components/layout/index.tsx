import Sidebar from "../sidebar"

type PropType = {
  children: JSX.Element
}

export default function Layout({ children }: PropType) {
  return (
    <div className="flex">
    <Sidebar/>   
    <main className='basis-full bg-blue-gray-50 p-6'>{children}</main>
    </div>
  )
}