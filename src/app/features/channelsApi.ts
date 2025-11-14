import { ResultData, Channel } from "@/types/channelTypes";
import { baseApi } from "./baseApi";

interface DateProps {
  dateFrom: string;
  dateTo: string;
}

export const charactersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getChannels: build.query<Array<Channel>, DateProps>({
      query: ({dateFrom, dateTo}) => ({
        url: "channel",
        method: "GET",
        params: {
          device_id: "web",
          device_category: "web",
          device_model: "web",
          device_type: "web",
          device_so: "Chrome",
          format: "json",
          device_manufacturer: "generic",
          authpn: "webclient",
          authpt: "tfg1h3j4k6fd7",
          api_version: "v5.93",
          region: "mexico",
          HKS: "web61144bb49d549",
          user_id: "54343080",
          date_from: dateFrom,
          date_to: dateTo,
          quantity: "200",
        },
      }),
      transformResponse: (response: ResultData) => response.response.channels,
    }),
  }),
});

export const { useLazyGetChannelsQuery } = charactersApi;
