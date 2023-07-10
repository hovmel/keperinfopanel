import {translate} from '../../Translations';
import {errorsGPS} from '../../Constants/ErrorsGPS';

export type Position = {
  lon: number;
  lat: number;
};

export type MapFilters = {
  showPlugShare: boolean;
  showOnlyJacks: boolean;
};

export type GeolocationError = {
  message: string;
  type: string;
};

export type MarkerData = {
  name: string;
  coordinates: Position;
  id: string;
  DeviceType: string;
};

export type PlugShareMarker = {
  lon: number;
  lat: number;
};
