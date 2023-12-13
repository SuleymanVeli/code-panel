import { Avatar, IconButton, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { map } from "lodash";
import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/24/solid";
import uploadImage from "@/utilities/uploadImage";
import getImageInfoFromURL from "@/utilities/getImageInfoFromURL";
import { useRef } from "react";
import { MDXEditor, MDXEditorMethods, headingsPlugin } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'
import InitializedMDXEditor from "../mdxEditor/InitializedMDXEditor";


type PropType = {
    label: string,
    value: any,
    options?: string[],
    type: "string" | "text" | "editor" | "image" | "video" | "select" | "link",
    onChange: (value: any) => Promise<void> | void
}


export default function RenderInput({ label, value, options, type, onChange }: PropType) {

    const ref = useRef<MDXEditorMethods>(null);

    const renderString = (label: string, value: string, onChange: (value: any) => void) => (
        <Input crossOrigin label={label}
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
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
        <>
           <button onClick={() => ref.current?.setMarkdown('new markdown')}>Set new markdown</button>
      <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
            <InitializedMDXEditor editorRef={ref} markdown='hello world' onChange={console.log} />        
        </>
    )
      

    if (type === 'string') return (
        <div className="w-72 mb-3">
            {renderString(label, value, onChange)}
        </div>
    )

    if (type === 'text') return (
        <div className="w-72 mb-3">
            {renderText(label, value, onChange)}
        </div>
    )

    if (type === 'select') return (
        <div className="w-72 mb-3">
            {renderSelect(label, value, onChange, options)}
        </div>
    )

    if (type === 'image') return (
        <div className="w-72 mb-3">
            {renderImage(label, value, onChange)}
        </div>
    )

    if (type === 'editor') return (
        <div className="w-72 mb-3">
            {renderEditor(label, value, onChange)}
        </div>
    )

}
