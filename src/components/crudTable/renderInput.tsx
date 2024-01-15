import { Avatar, IconButton, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { map, toNumber } from "lodash";
import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/24/solid";
import uploadImage from "@/utilities/uploadImage";
import getImageInfoFromURL from "@/utilities/getImageInfoFromURL";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";


const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);


type PropType = {
    label: string,
    value: any,
    options?: string[],
    type: "string" | "text" | "editor" | "image" | "video" | "select" | "link" | "number",
    onChange: (value: any) => Promise<void> | void,
}


export default function RenderInput({ label, value, options, type, onChange }: PropType) {


    const renderString = (label: string, value: string, onChange: (value: any) => void) => (
        <Input crossOrigin label={label}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }}
        />);

    const renderNumber = (label: string, value: string, onChange: (value: any) => void) => (
        <Input crossOrigin type="number" label={label}
            value={value}
            onChange={(e) => {
                if(e.target.value) onChange(toNumber(e.target.value))
                else onChange(0)
            }}
        />);

    const renderText = (label: string, value: string, onChange: (value: any) => void) => (
        <Textarea label={label}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }}
        />);

    const renderSelect = (label: string, value: string, onChange: (value: any) => void, options?: string[]) => (
        <Select label={label} value={value} onChange={(e) => onChange(e)}>
            {
                map(options, (option, i) => (<Option value={option} key={i}>{option}</Option>))
            }
        </Select>);

    const renderImage = (label: string, value: string, onChange: (value: any) => void) => (
        <div>
            {value ?
                <div className="flex items-center gap-4">
                    <Avatar src={value} alt="avatar" variant="rounded" />
                    <div>
                        <Typography variant="small" color="gray" className="font-normal">
                            {getImageInfoFromURL(value)}
                        </Typography>
                    </div>
                    <IconButton variant="text" onClick={() => {
                        onChange(null)
                    }}>
                        <TrashIcon className="h-4 w-4 text-red-500" />
                    </IconButton>
                </div>
                :
                <input type="file"
                    className={
                        classNames({
                            // button colors
                            "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
                            // button shape and spacing
                            "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
                            "file:px-4 file:py-2 file:mr-4 file:border-none": true,
                            // overall input styling
                            "hover:cursor-pointer border rounded-lg text-gray-400": true,
                        })
                    }
                    // label={label}
                    value={value}
                    onChange={(e) => {
                        if (e.target.files) {
                            const file: any = e.target.files[0];

                            uploadImage(file).then((value)=>{
                                onChange(value?.path)
                            })                           
                        }
                    }}
                />}
        </div>
    );

    const renderEditor = (label: string, value: string, onChange: (value: any) => void) => (
        <MDEditor
            value={value}
            onChange={onChange}
        />
    )
      

    if (type === 'string') return (
        <div className=" mb-3">
            {renderString(label, value, onChange)}
        </div>
    )

    if (type === 'number') return (
        <div className=" mb-3">
            {renderNumber(label, value, onChange)}
        </div>
    )

    if (type === 'text') return (
        <div className="mb-3">
            {renderText(label, value, onChange)}
        </div>
    )

    if (type === 'select') return (
        <div className="mb-3">
            {renderSelect(label, value, onChange, options)}
        </div>
    )

    if (type === 'image') return (
        <div className="mb-3">
            {renderImage(label, value, onChange)}
        </div>
    )

    if (type === 'editor') return (
        <div className="mb-3">
            {renderEditor(label, value, onChange)}
        </div>
    )

}
