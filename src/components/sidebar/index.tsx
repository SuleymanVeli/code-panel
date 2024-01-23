import React, { useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { FaTasks } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";

import { MdOutlinePlayLesson, MdPlayLesson } from "react-icons/md";
import Link from "next/link";

import { getSession, signOut} from 'next-auth/react';
import { useRouter } from "next/router";

import 'react-tooltip/dist/react-tooltip.css'

import { Tooltip } from 'react-tooltip'

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(false);


  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session: any = await getSession();
      if (session?.user?.role) {
        setIsAdmin(session?.user?.role == "admin")
      }
    };

    checkSession();
  }, []);

  const selected = (path: string): boolean => {

    if (router.pathname === path) return true;

    return false;
  }

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="h-[calc(100vh-2rem)] p-2 flex flex-col ">
      <Tooltip id="link-tooltip" place="right" style={{ backgroundColor:"#e9eef5", color:"#1e293b", padding:"3px 10px"}} className="z-50" />
      <div className="mb-2 flex items-center gap-4 p-4">       

      </div>
      <List className="flex flex-col min-w-min gap-3 basis-full">
        <Link href={'/'} 
         data-tooltip-id="link-tooltip"
         data-tooltip-content="Home"
        >
          <Button color="white" className="flex p-3 items-center rounded-xl">
            <InboxIcon className="h-6 w-6" />
          </Button>
        </Link>
        <Link href={'/lessons'}
        data-tooltip-id="link-tooltip"
        data-tooltip-content="Lessons">
          <Button color="white" className="flex p-3 items-center rounded-xl">
            <MdOutlinePlayLesson className="h-6 w-6" />
          </Button>
        </Link>
        <Link href={'/tasks'}
        data-tooltip-id="link-tooltip"
        data-tooltip-content="Tasks">
          <Button color="white" className="flex p-3 items-center rounded-xl">
            <FaTasks className="h-6 w-6" />
          </Button>
        </Link>
        {
          isAdmin ?
            <>
              <Link href={'/lessons/edit'}
              data-tooltip-id="link-tooltip"
              data-tooltip-content="Lessons edit"
              >
                <Button color="white" className="flex p-3 items-center rounded-xl">
                  <MdPlayLesson className="h-6 w-6" />
                </Button>
              </Link>
              <Link href={'/group'}
              data-tooltip-id="link-tooltip"
              data-tooltip-content="Group"
              >
                <Button color="white" className="flex p-3 items-center rounded-xl">
                  <FaUserGroup  className="h-6 w-6" />
                </Button>
              </Link>
              <Link href={'/tasks/edit'}
              data-tooltip-id="link-tooltip"
              data-tooltip-content="Tasks Edit">
                <Button color="white" className="flex p-3 items-center rounded-xl">
                  <FaTasks className="h-6 w-6" />
                </Button>
              </Link>
              <Link href={'/users'}
              data-tooltip-id="link-tooltip"
              data-tooltip-content="Users">
                <Button color="white" className="flex p-3 items-center rounded-xl">
                  <UserCircleIcon className="h-6 w-6" />
                </Button>
              </Link>
            </>
            : null
        }
        <ListItem 
          data-tooltip-id="link-tooltip"
          data-tooltip-content="Sign out"
          className="mt-auto" onClick={() => signOut()}>
          <PowerIcon className="h-6 w-6" />
        </ListItem>
      </List>
    </div>
  );
}


export default Sidebar;