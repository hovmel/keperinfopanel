import {
  loadDevicesAuthToken,
  rootApiToken,
  rootApiUrl,
} from '../../Constants/API';
import {MarkerData, PlugShareMarker} from '../../Screens/MapScreen/Map.types';
import {
  Jack,
  JacksFullData,
} from '../../Components/MarkerOverlay/MarkerOverlay.types';
import blobToBase64 from 'blob-to-base64';
import {getSundraxAPI} from './Task';
import moment from 'moment';
import getFromTo from '../getFromTo';

export const getJacks = async (markerId: string): Promise<JacksFullData> => {
  const sundraxAPI = await getSundraxAPI();
  const url = sundraxAPI + 'jacks/' + markerId;
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const json = await response.json();
      const jacks: Jack[] = [];
      json?.Modes?.Jacks?.map((item: any) => {
        jacks.push({
          itemId: item.ItemId,
          value: item.Value,
        });
      });
      const telemetry = json.Telemetry;
      return {
        jacks: jacks,
        telemetry: [telemetry.p19, telemetry.p20, telemetry.p21],
      };
    } else {
      console.log('marker has no information about jacks');
    }
  } catch (error) {
    console.error('Loading jacks statuses error', error);
  }
  return {
    jacks: [],
    telemetry: [],
  };
};

export const getDeviceBranches = async () => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + 'objects/tree/all', {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Loading marker groups error', error);
  }
};

const getObjectChildren = async (branchId: string) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + 'Objects/Children/' + branchId, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Loading branch objects error', error);
  }
};

export const getAllMarkersIcons = async () => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + 'Catalogs/ProvidersAndTypes', {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error while getting all markers icons', error);
  }
};

export const loadAllMarkers = async (branches): Promise<MarkerData[]> => {
  let allMarkers: MarkerData[] = [];
  for (const branch of branches) {
    let markers: MarkerData[] = [];
    if (branch?.Items?.length) {
      for (const device of branch?.Items) {
        markers = markers.concat(await loadDevicesInfo(device));
        if (device?.Items?.length) {
          for (const child of device?.Items) {
            markers = markers.concat(await loadDevicesInfo(child));
            if (child?.Items?.length) {
              for (const item of child?.Items) {
                markers = markers.concat(await loadDevicesInfo(item));
              }
            }
          }
        }
      }
    }
    allMarkers = allMarkers.concat(markers);
  }
  return allMarkers;
};

export const getAllNestedItems = async () => {
  const branches = await getDeviceBranches();

  /*  for (const branch of branches) {
    if (branch.HasChildren) {
      const branchDevices = await getObjectChildren(branch.Id);

      for (const device of branchDevices) {
        if (device.HasChildren) {
          const children = await getObjectChildren(device.Id);

          for (const child of children) {
            if (child.HasChildren) {
              child.children = await getObjectChildren(child.Id);
            }
          }
          device.children = children;
        }
      }

      branch.children = branchDevices;
    }
  }*/

  return branches;
};

export const getAllItems = async () => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + 'objects/status', {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error while getting all items:', error);
    return false;
  }
};

export const getObjectControls = async ObjectId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    //console.log(sundraxAPI + `controls/${ObjectId}`);
    const response = await fetch(sundraxAPI + `controls/${ObjectId}`, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    if (response.status !== 200) {
      console.log('Controls error');
      return false;
    }

    const json = await response.json();

    if (json?.ControlValues?.Jacks) {
      if (json?.ControlValues?.Coils) {
        json.ControlValues.Coils = [
          ...json.ControlValues.Coils,
          ...json.ControlValues.Jacks,
        ];
      } else {
        json.ControlValues.Coils = json.ControlValues.Jacks;
      }
    }
    return json;
  } catch (error) {
    console.error('Error while getting object controls:', error);
    return false;
  }
};

export const getObjectPassports = async ObjectId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    console.log(sundraxAPI + `objects/${ObjectId}/passport`);
    const response = await fetch(sundraxAPI + `objects/${ObjectId}/passport`, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });
    if (response.status !== 200) {
      console.log('Passports error');
      return false;
    }

    return await response.json();
  } catch (error) {
    console.error('Error while getting object passports:', error);
    return false;
  }
};

export const getObjectStatus = async ObjectId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    //console.log(sundraxAPI + 'objects/status/' + ObjectId);
    const response = await fetch(sundraxAPI + 'objects/status/' + ObjectId, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    if (response.status !== 200) {
      console.log('Status error');
      return false;
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.warn('Error while getting object status:', error);
  }
};

export const getObjectTelemetry = async ObjectId => {
  console.log('getting object telemetry');
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const url = sundraxAPI + `jacks/${ObjectId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    if (response.status === 200) {
      return await response.json();
    }
    return {};
  } catch (error) {
    console.error('Error while getting object telemetry:', error);
  }
};

export const getObjectPhotos = async ObjectId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const url = sundraxAPI + `States/Photos/${ObjectId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    if (response.status === 200) {
      return await response.json();
    }
    return {};
  } catch (error) {
    console.error('Error while getting object photos:', error);
  }
};

export const getSinglePhoto = async PhotoId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const url = sundraxAPI + `States/Photo/${PhotoId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    const blob = await response.blob();
    const promise = new Promise((resolve, reject) => {
      blobToBase64(blob, (err, base64) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve(base64);
        }
      });
    });

    return await promise;
  } catch (error) {
    console.error('Error while getting single photo:', error);
  }
};

export const setObjectSliderValue = async (ObjectId, val) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const data = {};
  console.log({ObjectId, val});
  try {
    const response = await fetch(sundraxAPI + `jacks/${ObjectId}`, {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('Error while setting object slider value:', error);
  }
};

export const getObjectById = async ObjectId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + `Objects/${ObjectId}`, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error while getting object by id:', error);
  }
};

export const getFilePreview = async FileId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(
      sundraxAPI + `Objects/Files/Preview/${FileId}?width=${128}&height=${96}`,
      {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
      },
    );
    const blob = await response.blob();
    const promise = new Promise((resolve, reject) => {
      blobToBase64(blob, (err, base64) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve(base64);
        }
      });
    });

    return await promise;
  } catch (error) {
    console.error('Error while getting file preview:', error);
  }
};

export const getMarkerIcon = async (provider, type) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(
      sundraxAPI + `Catalogs/ProvidersAndTypes/${provider}/${type}`,
      {
        method: 'GET',
        headers: {
          Authorization: authToken,
        },
      },
    );
    console.log({response});
    const blob = await response.blob();
    const promise = new Promise((resolve, reject) => {
      blobToBase64(blob, (err, base64) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve(base64);
        }
      });
    });

    return await promise;
  } catch (error) {
    console.error('Error while getting marker icon:', error);
  }
};

export const getFile = async FileId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + `Objects/Files/${FileId}`, {
      method: 'GET',
      headers: {
        Authorization: authToken,
      },
    });
    const blob = await response.blob();
    const promise = new Promise((resolve, reject) => {
      blobToBase64(blob, (err, base64) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          resolve(base64);
        }
      });
    });

    return await promise;
  } catch (error) {
    console.error('Error while getting file:', error);
  }
};

export const loadDevicesInfo = async (marker: any): Promise<MarkerData[]> => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  console.log(sundraxAPI + `Objects/${marker.Id}/Passport`, authToken);
  try {
    const passportResponse = await fetch(
      sundraxAPI + `Objects/${marker.Id}/Passport`,
      {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: authToken,
        },
      },
    );
    const passportsData = await passportResponse.json();
    const statusResponse = await fetch(
      sundraxAPI + `Objects/Status/${marker.Id}`,
      {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: authToken,
        },
      },
    );
    const statusData = await statusResponse.json();

    let markers: MarkerData[] = [];

    const coordinates = passportsData?.Categories?.find(
      item => item.Type === 'Coordinates',
    )?.Properties[1]?.Value;

    //const iconUri  = await fetch();

    if (coordinates) {
      const markerData = {
        name: marker.Name,
        coordinates: {
          lat: coordinates.Latitude,
          lon: coordinates.Longitude,
        },
        id: marker.Id,
        DeviceType: marker.DeviceType,
        status: statusData[0]?.Status,
      };
      markers.push(markerData);
    }
    // returned object example:
    // {
    //   "DeviceType":"Meteo",
    //   "Id":"30016267-f06e-4a90-99f4-08d7b456483d",
    //   "Name":"км 17+200",
    //   "Order":0,
    //   "ParentId":"ce1a5281-4a4e-44d1-6e79-08d774de5de1",
    //   "Properties":[...];
    //   "TemplateId":"573d2b96-a2dc-4047-a190-08d7a66bebc8"
    // }
    /*const devicesWithCoordinates = json.Properties.filter(
      (item: any) => item.PropertyType === 'Coordinates',
    );
    if (devicesWithCoordinates) {
      for (const device of devicesWithCoordinates) {
        const coordsString = device.Value.StringValue;
        if (json.Name === 'PLC') {
          console.log('plc coords', coordsString);
        }
        const [latitude, longitude] = coordsString
          .split(',')
          .map((item: any) => parseFloat(item));
        const markerData: MarkerData = {
          name: json.Name,
          coordinates: {
            lat: latitude,
            lon: longitude,
          },
          id: json.Id,
          DeviceType: json.DeviceType,
        };
        markers.push(markerData);
      }
    }*/
    return markers;
  } catch (error) {
    console.error('Loading marker [' + markerId + '] info error', error);
  }
  return [];
};

export const getAllChildren = async (markerId: string): Promise<any[]> => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  let children: any[] = await getObjectChildren(markerId);
  for (const child of children) {
    if (child.HasChildren) {
      children = children.concat(await getObjectChildren(child.Id));
    }
  }
  return children;
};

export const changeControls = async (
  deviceId: string,
  switchId: string,
  jackStatus: string,
) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const url = sundraxAPI + 'controls/' + deviceId;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: authToken,
      },
      body: JSON.stringify({
        id: deviceId,
        controlValues: {
          jacks: [
            {
              ItemId: switchId.toString(),
              Value: jackStatus.toString(),
            },
          ],
        },
      }),
    });
    if (response.status === 200 || response.status === 204) {
      console.log('Changing succeded');
      return true;
    }
    console.log('Controls changing response status:', response.status);
    return false;
  } catch (error) {
    console.error('Changing controls status error', error);
    return false;
  }
};

export const changeSliderValue = async (deviceId: string, value: string) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const url = sundraxAPI + 'controls/' + deviceId;
    console.log(url);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: authToken,
      },

      body: JSON.stringify({
        id: deviceId,
        controlValues: {
          slider: {
            value: value.toString(),
          },
        },
      }),
    });
    if (response.status === 200 || response.status === 204) {
      console.log('Changing succeded');
      return true;
    }
    console.log('Slider value changing response status:', response.status);
    return false;
  } catch (error) {
    console.error('Slider value changing error', error);
    return false;
  }
};

export const changeArchMode = async (deviceId: string, value: string) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const url = sundraxAPI + 'controls/' + deviceId;
    console.log(url);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: authToken,
      },

      body: JSON.stringify({
        id: deviceId,
        controlValues: {
          archModes: {
            itemId: value,
          },
        },
      }),
    });
    if (response.status === 200 || response.status === 204) {
      console.log('Changing succeded');
      return true;
    }
    console.log('ArchMode changing response status:', response.status);
    return false;
  } catch (error) {
    console.error('ArchMode changing error', error);
    return false;
  }
};

export const getPlugShareDevices = async (): Promise<PlugShareMarker[]> => {
  const url = rootApiUrl + 'provider';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization-Token': rootApiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        class: 'CIBlockElement',
        method: 'GetList',
        parameters: {
          arOrder: {
            ID: 'ASC',
          },
          arFilter: {
            IBLOCK_ID: 70,
          },
          arGroupBy: false,
          arNavStartParams: false,
          GetPropertyValues: [
            'NAME',
            'PROPERTY_START_SESSION',
            'PROPERTY_LATITUDE',
            'PROPERTY_LONGITUDE',
            'PROPERTY_station_id',
          ],
        },
      }),
    });
    if (response.status === 200) {
      let json = await response.json();
      // fix backend bug
      json = Array.isArray(json) ? json : [json];
      const devices = [];
      // return PlugShare Marker
      for (let i = 0; i < json.length; i++) {
        const elem = json[i];
        try {
          devices.push({
            lon: parseFloat(elem.PROPERTY_LONGITUDE_VALUE),
            lat: parseFloat(elem.PROPERTY_LATITUDE_VALUE),
          });
        } catch (error) {
          console.error('Add plug share marker error');
        }
      }
      return devices;
    } else {
      let text = await response.text();
      console.log('load plug share status invalid', text);
    }
  } catch (error) {
    console.error('Loading plug share error', error);
  }
  return [];
};

export const getDeviceStatus = async ObjectId => {
  try {
    const sundraxAPI = await getSundraxAPI();
    const authToken = await loadDevicesAuthToken();
    const url = sundraxAPI + `Objects/Status/${ObjectId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error, 'while getting status');
    return false;
  }
};

export const getDeviceEvents = async (ObjectId, dateFilter) => {
  try {
    const sundraxAPI = await getSundraxAPI();
    const authToken = await loadDevicesAuthToken();

    const [from, to] = getFromTo(dateFilter);

    const url =
      sundraxAPI + `events?ObjectId=${ObjectId}&To=${to}&From=${from}`;

    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });
    return await response.json();
  } catch (error) {
    console.warn(error, 'while getting object events');
    return false;
  }
};
