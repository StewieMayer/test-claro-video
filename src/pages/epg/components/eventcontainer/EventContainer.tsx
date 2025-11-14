import { Event } from "@/types/channelTypes";
import { Button } from "@headlessui/react";
import { useEventContainer } from "./hooks/useEventContainer";

interface EventProps {
  event: Event;
}

export const EventContainer = ({ event }: EventProps) => {
  const { width, handleSetEvent, schedule } = useEventContainer(event);

  /* 
    Se recomienda no utilizar estilos inline. 
    En esta ocasión es necesario debido a la naturaleza "dinamica" del width
   */
  return (
    <div
      className="flex flex-col p-2 bg-white/10 border border-gray-500 hover:cursor-pointer hover:bg-white/50 truncate"
      style={{ minWidth: width }}
      onClick={handleSetEvent}
    >
      <span className="text-xl font-bold truncate">{event.name}</span>
      <div className="truncate">{schedule}</div>
      <div className="flex justify-end">
        <Button className='flex rounded-full'>...</Button>
      </div>
    </div>
  );
};
