export type CrudDataTypeString = {
    prop: string,
    type: "string" | "text" | "editor" | "image" | "video",
    name: string,
    show?: boolean,
}

export type ValueName = { value: string, name: string }

export type CrudDataTypeLink = {
    prop: string,
    type: "link",
    name: string,
    show?: boolean,
    url: string
}

export type CrudDataTypeSelect = {
    prop: string,
    type: "select",
    name: string,
    show?: boolean
    options: string[],
}

export type CrudDataTypeArray = {
    prop: string,
    type: 'array',
    name: string,
    show?: boolean,
    defaultValue: any,
    props: CrudDataType[]
}

export type CrudDataType =
    CrudDataTypeString |
    CrudDataTypeArray |
    CrudDataTypeSelect |
    CrudDataTypeLink;
    