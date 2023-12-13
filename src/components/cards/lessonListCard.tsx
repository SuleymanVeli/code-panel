import { Button, Card, Typography } from "@material-tailwind/react"
import * as React from "react"

type PropType= {
    name:string
}

const index = ({ name}: PropType) => (
    <Button   
    className="h-[5rem] rounded-2xl w-full max-w-[28rem] blur-0 items-center justify-center overflow-hidden text-center"
  >
    <Typography variant="h5" className="text-gray-50">
      {name}
    </Typography>
  </Button>
)
export default index