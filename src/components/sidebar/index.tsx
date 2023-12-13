import React, { useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
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

  const selected = (path:string): boolean=>{

    if(router.pathname === path) return true;

    return false;
  }

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 flex flex-col">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className="flex flex-col basis-full">
      <Link href={'/'}>
        <ListItem selected={selected('/')} className="flex items-center rounded-2xl">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox         
        </ListItem>
        </Link>
        <Link href={'/lessons'}>
          <ListItem selected={selected('/lessons')} className="rounded-2xl">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Lessons
          </ListItem>
        </Link>
        {
          isAdmin ?
            <>
              <Link href={'/lessons/edit'}>
                <ListItem selected={selected('/lessons/edit')} className="rounded-2xl">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Edit Lessons
                </ListItem>
              </Link>
              <Link href={'/users'}>
                <ListItem selected={selected('/users')} className="rounded-2xl">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Users
                </ListItem>
              </Link>
            </>
            : null
        }
        <ListItem className="mt-auto" onClick={() => signOut()}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
      <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features
          and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert>
    </div>
  );
}


export default Sidebar;