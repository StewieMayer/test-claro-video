import { useState } from "react"

export const useApp = ()=>{

    const [show,setShow] = useState<boolean>(false)
    const handleShow=()=>setShow(!show)

    return {
        show,
        handleShow
    }

}