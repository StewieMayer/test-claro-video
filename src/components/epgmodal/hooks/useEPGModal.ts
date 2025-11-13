import { useLazyGetChannelsQuery } from "../../../app/features/channelsApi"
import { EPGContext, EPGContextType } from "../../../context/EPGContext"
import { useContext, useEffect } from "react"

export const useEPGModal = ()=>{

    const context = useContext<EPGContextType | undefined>(EPGContext)

    const [getChannels,{isLoading,isError,error}] = useLazyGetChannelsQuery()

    useEffect(()=>{
        getChannels().unwrap().then((channels)=>context?.setChannels(channels))
    },[])

    return {
        channels: context?.channels
    }
}