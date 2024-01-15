import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'


const Code = ({children}:any) => {
    return (
      <SyntaxHighlighter language="javascript" style={vscDarkPlus} >
        {children}
      </SyntaxHighlighter>
    );
  };

export default Code;