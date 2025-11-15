type StringNull = string | null;

type Entry = {
  device_id: string;
  device_category: string;
  device_model: string;
  device_type: string;
  device_so: string;
  format: string;
  device_manufacturer: string;
  authpn: string;
  authpt: string;
  api_version: string;
  region: string;
  HKS: string;
  user_id: string;
  date_from: string;
  date_to: string;
  quantity: string;
};

export type Event = {
  channel_id?: string;
  source_uri?: string;
  id?: string;
  name: string;
  description: StringNull;
  talent?: StringNull;
  date_begin: string;
  date_end: string;
  unix_begin?: number;
  unix_end?: number;
  duration: string;
  language?: StringNull;
  type?: StringNull;
  group_id?: StringNull;
  confirmado?: StringNull;
  id_empleado?: StringNull;
  tms_id?: StringNull;
  event_alf_id?: StringNull;
  ext_ncont_id?: StringNull;
  ext_nevt_id?: StringNull;
  ext_actors?: StringNull;
  ext_director?: StringNull;
  ext_year?: StringNull;
  ext_country?: StringNull;
  ext_original_name?: StringNull;
  ext_ep_original_name?: StringNull;
  ext_series_id?: StringNull;
  ext_season_id?: StringNull;
  ext_episode_id?: StringNull;
  ext_language?: StringNull;
  ext_serie_short_desc?: StringNull;
  ext_serie_desc?: StringNull;
  image_base_horizontal?: string;
  image_base_vertical?: string;
  image_base_square?: string;
  ext_eventimage_name?: string;
  ext_eventimage_name_base?: string;
  ext_catchup?: StringNull;
  ext_startover?: StringNull;
  ext_recordable?: StringNull;
  parental_rating?: StringNull;
  aud_stereo?: StringNull;
  aud_dolby?: StringNull;
  vid_black_and_white?: StringNull;
  dvb_content?: StringNull;
  user_content?: StringNull;
  group_rel?: StringNull;
  gmt?: number;
};

type TechnologyData = {
  id: string;
  desc: string;
};

type Group = {
  common: {
    id: string;
    title: string;
    title_episode: StringNull;
    title_uri: string;
    title_original: string;
    description: string;
    description_large: string;
    short_description: StringNull;
    image_large: string;
    image_medium: string;
    image_small: string;
    image_still: StringNull;
    image_background: string;
    url_imagen_t1: string;
    url_imagen_t2: string;
    image_base_horizontal: string;
    image_base_vertical: string;
    image_base_square: string;
    image_clean_horizontal: string;
    image_clean_vertical: string;
    image_clean_square: string;
    image_sprites: string;
    image_frames: string;
    image_trickplay: string;
    image_external: StringNull;
    duration: StringNull;
    date: string;
    year: StringNull;
    preview: string;
    season_number: StringNull;
    episode_number: StringNull;
    format_types: string;
    live_enabled: string;
    live_type: string;
    live_ref: string;
    source_uri: string;
    timeshift: string;
    votes_average: number;
    rating_code: string;
    proveedor_name: string;
    proveedor_code: string;
    encoder_tecnology: TechnologyData;
    recorder_technology: TechnologyData;
    resource_name: StringNull;
    rollingcreditstime: StringNull;
    rollingcreditstimedb: StringNull;
    is_series: boolean;
    channel_number: string;
  };
};

export type Channel = {
  id: string;
  number: string;
  name: string;
  hd?: boolean;
  image: string;
  group_id?: string;
  liveref?: string;
  epg_url?: string;
  source_uri?: string;
  provider_metadata_id?: number;
  provider_metadata_name?: string;
  group?: Group;
  events: Array<Event>;
};

export type ResultData = {
  entry: Entry;
  response:{
    channels: Array<Channel>
  }
};
