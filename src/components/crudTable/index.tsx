import { PencilIcon, TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { CrudDataType } from "@/types/crudDataType";
import { cloneDeep, filter, isArray, map, noop } from "lodash";
import RenderInput from "./renderInput";
import Link from "next/link";
import classNames from "classnames";
import { FaAngleDown } from "react-icons/fa6";


type PropType<T> = {
    title: string,
    data: T[],
    types: CrudDataType[],
    save: (data: T) => Promise<void>,
    deleteValue: (data: T) => Promise<void>,
    defaultValue: T
}

export default function CrudTable<T>({ data, types, title, save, defaultValue, deleteValue }: PropType<T>) {

    const [open, setOpen] = useState(false);

    const [openItem, setOpenItem] = useState('');
    const [openDelete, setOpenDelete] = useState<any>(null);

    const [dataValue, setDataValue] = useState<any>();

    const handleUpdateProp = (value: any, type: string) => {
        const updated = { ...dataValue }
        updated[type] = value;
        setDataValue(updated)
    }

    const handleUpdateArrayProp = (value: any, type: string, type2: string, index: number) => {
        const updated = { ...dataValue }
        if (updated && updated[type] && updated[type][index])
            updated[type][index][type2] = value;
        setDataValue(updated)
    }

    const handleAddArrayProp = (defaultValue: any, type: string) => {
        const updated = { ...dataValue }
        const prop = updated[type]
        if (isArray(prop)) prop.push(cloneDeep(defaultValue))
        setDataValue(updated)
    }

    const handleRemoveArrayProp = (value: any, type: string) => {
        const updated = { ...dataValue }
        const prop = updated[type]
        if (isArray(prop)) updated[type] = filter(prop, p => p != value)
        setDataValue(updated)
    }

    const handleAdd = () => {
        setDataValue(cloneDeep(defaultValue))
        setOpen(true)
    };
    const handleUpdate = (value: any) => {
        setDataValue(value)
        setOpen(true)
    };

    const handleDelete = (value: any) => {
        setOpenDelete(value)
    };

    const handleSave = () => {
        save(dataValue).then(() =>
            setOpen(false)
        )
    }

    const handleClose = () => {
        setDataValue(null)
        setOpen(false)
    }

    return (
        <>
            <Card shadow={false} className="h-full w-full border">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 px-4 flex gap-3 md:items-center">
                        <Typography variant="h5" color="blue-gray">
                            {title}
                        </Typography>
                        <Tooltip content="Add">
                            <IconButton variant="text" onClick={handleAdd}>
                                <PlusIcon className="h-6 w-6" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {map(filter(types, (t: CrudDataType) => t.show || t.type === "link"), (type: CrudDataType, i) => (
                                    <th
                                        key={i}
                                        className="border-y border-blue-gray-100  p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {type.name}
                                        </Typography>
                                    </th>
                                ))}
                                <th
                                    className="border-y border-blue-gray-100"
                                >

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {map(data,
                                (
                                    item,
                                    i,
                                ) => {
                                    const isLast = i === data.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={i}>
                                            {
                                                map(filter(types, (t: CrudDataType) => t.show || t.type === "link"), (type: CrudDataType, index: number) => (
                                                    <td key={index} className={classes}>
                                                        {
                                                            type.type === "link" ?
                                                                <Link href={type.url + (item as any)[type.prop]} >
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-bold text-light-blue-700 cursor-pointer hover:text-light-blue-900"
                                                                    >
                                                                        {(item as any)[type.prop]}
                                                                    </Typography>
                                                                </Link> :
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {(item as any)[type.prop]}
                                                                </Typography>
                                                        }
                                                    </td>
                                                ))
                                            }
                                            <td className={classes + " text-end"}>
                                                <Tooltip content="Edit">
                                                    <IconButton variant="text" onClick={() => handleUpdate(item)}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Delete">
                                                    <IconButton variant="text" onClick={() => handleDelete(item)}>
                                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                                    </IconButton>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton variant="outlined" size="sm">
                            1
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            2
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            3
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            ...
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            8
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            9
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            10
                        </IconButton>
                    </div>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </CardFooter> */}
            </Card>
            <Dialog size="lg" open={open} handler={noop} className="overflow-hidden">
                <div className="overflow-y-auto max-h-[80vh] relative">
                    <DialogHeader>Create</DialogHeader>
                    <DialogBody className="static">
                        {
                            map(types, (type, i) => {
                                if (type.type !== "array" && type.type !== "select") return (
                                    <RenderInput
                                        label={type?.name}
                                        key={i}
                                        type={type.type}
                                        value={dataValue && dataValue[type?.prop]}
                                        onChange={(value) => { handleUpdateProp(value, type?.prop) }}
                                    />
                                )
                                if (type.type === "select") return (
                                    <RenderInput
                                        label={type?.name}
                                        key={i}
                                        type={type.type}
                                        value={dataValue && dataValue[type?.prop]}
                                        options={type.options}
                                        onChange={(value) => { handleUpdateProp(value, type?.prop) }}
                                    />
                                )
                                if (type.type === "array") {
                                    return <div className="mb-4 border-b">
                                        <Button color="deep-orange" size="sm" className="flex items-center gap-3 mb-2" onClick={() => {
                                            handleAddArrayProp(type.defaultValue, type.prop)
                                            setOpenItem('')
                                        }}>
                                            Add {type.name}  <PlusIcon className="h-6 w-6" />
                                        </Button>
                                        {dataValue && map(dataValue[type?.prop], (dataArrayValue, ind: number) => {
                                            return <div key={ind}>
                                                <div className="flex gap-3 items-center">
                                                    <Typography className="my-2 font-sans ml-4 text-sm font-bold text-black">
                                                        {type.name + " " + (ind + 1)}
                                                    </Typography>
                                                    <IconButton variant="text" onClick={() => {
                                                        handleRemoveArrayProp(dataArrayValue, type.prop)
                                                        setOpenItem('')
                                                    }}>
                                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                                    </IconButton>
                                                    <IconButton className="ml-auto" variant="text" onClick={() => {
                                                        setOpenItem(openItem === `${i}-${ind}` ? '' : `${i}-${ind}`)
                                                    }}>
                                                        <FaAngleDown className="h-4 w-4" />
                                                    </IconButton>
                                                </div>
                                                <div className={classNames({ "hidden": openItem !== `${i}-${ind}` })}>
                                                    {map(type.props, (typeArray, i2) =>
                                                        typeArray.type != "array" && (
                                                            typeArray.type !== "select" ? <RenderInput
                                                                label={typeArray?.name}
                                                                key={i2}
                                                                type={typeArray.type}
                                                                value={dataArrayValue && dataArrayValue[typeArray?.prop]}
                                                                onChange={(value) => {
                                                                    handleUpdateArrayProp(value, type.prop, typeArray?.prop, ind)
                                                                }}
                                                            /> : <RenderInput
                                                                label={typeArray?.name}
                                                                key={i2}
                                                                type={typeArray.type}
                                                                options={typeArray.options}
                                                                value={dataArrayValue && dataArrayValue[typeArray?.prop]}
                                                                onChange={(value) => {
                                                                    handleUpdateArrayProp(value, type.prop, typeArray?.prop, ind)
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                }
                                return null;
                            })
                        }
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleClose}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleSave}>
                            <span>Save</span>
                        </Button>
                    </DialogFooter>
                </div>
            </Dialog>
            <Dialog size="xs" open={openDelete !== null} handler={() => setOpenDelete(null)}>
                <DialogHeader>
                    <Typography variant="h5" color="blue-gray">
                        Delete
                    </Typography>
                </DialogHeader>
                <DialogFooter className="space-x-2">
                    <Button variant="gradient" onClick={() => {
                        deleteValue(openDelete).then(() => {
                            setOpenDelete(null)
                        })
                    }}>
                        Delete
                    </Button>
                </DialogFooter>
            </Dialog>

        </>

    );
}