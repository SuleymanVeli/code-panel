import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'

type PropType = {
  children: any
}

export default function ReactMarkdown({ children }: PropType) {


  return (
    <Markdown remarkPlugins={[remarkGfm]} components={{
        code(props) {
          const { className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (<div className='rounded-md overflow-hidden'>
               <SyntaxHighlighter             
              PreTag="div"             
              language={match[1]}
              style={vscDarkPlus}
            >
              {String(props.children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </div>
          
          ) : (
            <code {...rest} className={className}>
              {props.children}
            </code>
          )
        }
      }}>{children}</Markdown>
  )
}