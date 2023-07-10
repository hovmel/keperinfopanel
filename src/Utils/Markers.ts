import {MapFilters, MarkerData, Position} from '../Screens/MapScreen/Map.types';
import _ from 'lodash';

export const findMarkerById = (
  markers: MarkerData[],
  id: string | undefined,
) => {
  console.log('Finding marker params', markers, id);
  return markers.find(mark => mark.id === id);
};

export const filterMarkersToRender = (
  allMarkers: MarkerData[],
  /*mapFilters: MapFilters,*/
): MarkerData[] => {
  let tmpMarkersToRender = [];
  const coordinatesList: Position[] = [];

  for (const point of allMarkers) {
    /*if (mapFilters.showOnlyJacks && point.DeviceType !== 'Jack') {
      continue;
    }*/

    let coordinates = point?.coordinates;

    if (coordinatesList.length) {
      coordinatesList.push({...coordinates});
      coordinates.lon =
        coordinates.lon +
        (0.2 * objectIncludesCount(coordinates, coordinatesList)) / 3000;
      /*for (const el of coordinatesList) {
        if (_.isEqual(el, coordinates)) {
          coordinates.lon = coordinates.lon + 0.1 / 3000;
        } else {
          coordinatesList.push(coordinates);
        }
      }*/
    } else {
      coordinatesList.push(coordinates);
    }

    if (coordinates && coordinates.lat && coordinates.lon) {
      tmpMarkersToRender.push(point);
    } else {
      console.log('marker does not have coordinates');
    }
  }

  return tmpMarkersToRender;
};

const objectIncludesCount = (coordinates, coordinatesList) => {
  let count = 0;
  for (const el of coordinatesList) {
    if (_.isEqual(el, coordinates)) {
      count++;
    }
  }
  return count;
};
