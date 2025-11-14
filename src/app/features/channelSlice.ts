import { Channel, Event } from "@/types/channelTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Dayjs } from "dayjs";

export type EPGContextType = {
  channels: Array<Channel>;
  activeEvent: Event | undefined;
  scrollLeft: number;
  dateFrom: Dayjs | undefined;
  dateTo: Dayjs | undefined;
};

const initialState: EPGContextType = {
  channels: [],
  activeEvent: undefined,
  scrollLeft: 0,
  dateFrom: undefined,
  dateTo: undefined,
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Array<Channel>>) => {
      state.channels = action.payload;
    },
    setActiveEvent: (state, action: PayloadAction<Event | undefined>) => {
      state.activeEvent = action.payload;
    },
    setScrollLeft: (state, action: PayloadAction<number>) => {
      state.scrollLeft = action.payload;
    },
    setDateFrom: (state, action: PayloadAction<Dayjs | undefined>) => {
      state.dateFrom = action.payload;
    },
    setDateTo: (state, action: PayloadAction<Dayjs | undefined>) => {
      state.dateTo = action.payload;
    },
  },
});

export const selectChannels = (state: RootState): EPGContextType =>
  state.channels;

export const {
  setActiveEvent,
  setChannels,
  setScrollLeft,
  setDateFrom,
  setDateTo,
} = channelSlice.actions;
export default channelSlice.reducer;
