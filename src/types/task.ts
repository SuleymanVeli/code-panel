export type CodeTypeSimple = {
   code: string  
}

export type CodeHtmlSccType = {
   html: string,
   css: string
}

 export type CodeHtmlCssJsType = {
   html: string,
   css: string,
   js: string,
 }

export type CodeCsharpType = {
   csharp: string  
}

export type CodeType = CodeTypeSimple | CodeHtmlSccType | CodeHtmlCssJsType | CodeCsharpType;