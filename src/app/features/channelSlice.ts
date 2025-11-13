import { Channel, Event } from "@/types/channelTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type EPGContextType = {
  channels: Array<Channel>;
  activeEvent: Event | undefined;
};

const initialState: EPGContextType = {
  channels: [],
  activeEvent: undefined,
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
  },
});

export const selectChannels = (state: RootState): EPGContextType =>
  state.channels;

export const { setActiveEvent, setChannels } = channelSlice.actions;
export default channelSlice.reducer;
