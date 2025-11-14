import { selectChannels } from "@/app/features/channelSlice";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import dayjs, { Dayjs } from "dayjs";
import { Ref, useCallback, useMemo } from "react";

type Hour = {
  hour: string;
  width: string;
};

export const useTimeLine = () => {
  const { dateFrom, dateTo } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  const getwidth = useCallback(
    (currentDate: Dayjs, dateFrom: string, dateTo: string) => {
      let width = 120;

      if (currentDate.isSame(dateFrom)) {
        const minutesFrom = dayjs(dateFrom).get("minutes");
        width = (minutesFrom < 30 ? 30 - minutesFrom : 60 - minutesFrom) * 4;
      }

      if (currentDate.isAfter(dateTo)) {
        const minutesFrom = dayjs(dateTo).get("minutes");
        width -= (minutesFrom < 30 ? 30 - minutesFrom : 60 - minutesFrom) * 4;
      }

      return `${width}px`;
    },
    []
  );

  const hoursArr = useMemo(() => {
    const hoursArr: Array<Hour> = [];
    let currentHour = dayjs(dateFrom);

    while (currentHour.isBefore(dateTo)) {
      const hour = currentHour.get("hours");
      const minutes = currentHour.get("minutes");
      const formatedMinutes = minutes < 30 ? "00" : "30";

      const width = getwidth(currentHour, dateFrom, dateTo);

      hoursArr.push({
        hour: `${hour}.${formatedMinutes}hs.`,
        width,
      });
      currentHour = currentHour.add(30, "minutes");
    }

    return hoursArr;
  }, [dateFrom, dateTo]);

  return {
    hoursArr,
  };
};
