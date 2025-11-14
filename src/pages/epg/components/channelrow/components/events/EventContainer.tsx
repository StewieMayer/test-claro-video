import { selectChannels, setActiveEvent } from "@/app/features/channelSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Event } from "@/types/channelTypes";
import { Button } from "@headlessui/react";
import dayjs from "dayjs";

interface EventProps {
  event: Event;
}

export const EventContainer = ({ event }: EventProps) => {
  const getWidth = (
    duration: string,
    date_begin: string,
    date_end: string
  ): string => {
    const durationArr = duration.split(":").map((item) => parseInt(item));
    let minutesDuration =
      durationArr[0] * 240 + durationArr[1] * 4 + durationArr[2] / 15;

    const { dateFrom, dateTo } = useAppSelector((state: RootState) =>
      selectChannels(state)
    );

    const dateBegin = dayjs(date_begin);
    const dateEnd = dayjs(date_end);

    if (dateBegin.isBefore(dateFrom)) {
      minutesDuration += dateBegin.diff(dateFrom, "minutes") * 4;
    }

    if (dateEnd.isAfter(dateTo)) {
      console.log(dateEnd, dateTo);
      minutesDuration -= dateEnd.diff(dateTo, "minutes") * 4;
    }

    return `${minutesDuration}px`;
  };

  const parseDate = (date: string): string => dayjs(date).format("HH:mm");

  const width = getWidth(event.duration, event.date_begin, event.date_end);

  const dispatch = useAppDispatch();
  const handleSetEvent = () => dispatch(setActiveEvent(event));

  return (
    <div
      className="flex flex-col p-2 border border-gray-300 hover:cursor-pointer truncate"
      style={{ minWidth: width }}
      onMouseOver={handleSetEvent}
    >
      <span className="text-xl font-bold truncate">{event.name}</span>
      <div className="truncate">
        {parseDate(event.date_begin)}-{parseDate(event.date_end)}
      </div>
      <div className="flex justify-end">
        <Button>...</Button>
      </div>
    </div>
  );
};
