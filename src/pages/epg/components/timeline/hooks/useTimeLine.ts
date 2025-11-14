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
  //State
  const { dateFrom, dateTo } = useAppSelector((state: RootState) =>
    selectChannels(state)
  );

  //Utils
   /*
    Calcula el width del div en base a los limites de la programación.
    Si el horario esta fuera de los limites, le resta tiempo.
    1 min= 4px
  */
  const getwidth = useCallback(
    (currentDate: Dayjs, dateFrom: string, dateTo: string) => {
      let width = 120;

      //Limite inferior
      if (currentDate.isSame(dateFrom)) {
        const minutesFrom = dayjs(dateFrom).get("minutes");
        width = (minutesFrom < 30 ? 30 - minutesFrom : 60 - minutesFrom) * 4;
      }

      //Limite superior
      if (currentDate.isAfter(dateTo)) {
        const minutesFrom = dayjs(dateTo).get("minutes");
        width -= (minutesFrom < 30 ? 30 - minutesFrom : 60 - minutesFrom) * 4;
      }

      return `${width}px`;
    },
    []
  );

  //Variables de utilidad
  /* 
    Crea un array de objetos que contienen el horario y el width del div
   */
  const hoursArr = useMemo(() => {
    const hoursArr: Array<Hour> = [];
    let currentHour = dayjs(dateFrom);

    //Itera los limites de transmision en intervalos de 30 minutos y obtiene el valor de texto y width
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
