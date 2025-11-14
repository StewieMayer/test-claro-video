import { Ref } from "react";
import { useTimeLine } from "./hooks/useTimeLine";
import { Button } from "@headlessui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface TimeLineProps {
  ref: Ref<HTMLDivElement> | null;
  scrollLeft: VoidFunction;
  scrollRight: VoidFunction;
}

export const TimeLine = ({ ref, scrollLeft, scrollRight }: TimeLineProps) => {
  const { hoursArr } = useTimeLine();

  /* 
    Se recomienda no utilizar estilos inline. 
    En esta ocasión es necesario debido a la naturaleza "dinamica" del width
   */
  return (
    <div className="flex">
      <div
        ref={ref}
        className="text-white min-h-10 flex items-center overflow-x-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {hoursArr.map((hour) => (
          <div
            className="truncate"
            style={{ minWidth: hour.width }}
            key={hour.hour}
          >
            {hour.hour}
          </div>
        ))}
      </div>
      <div className="flex bg-black text-white">
        <Button
          className="p-2 hover:cursor-pointer hover:bg-white/50"
          onClick={scrollLeft}
        >
          <ChevronLeftIcon className="size-8" />
        </Button>
        <Button
          className="p-2 hover:cursor-pointer hover:bg-white/50"
          onClick={scrollRight}
        >
          <ChevronRightIcon className="size-8" />
        </Button>
      </div>
    </div>
  );
};
