import {getSundraxAPI} from './Task';
import {loadDevicesAuthToken, rootApiToken} from '../../Constants/API';
import _ from 'lodash';
import moment from 'moment';
import data from '../../Screens/StatesScreen/data';
import logger from 'js-to-ts-converter/dist/logger';

export const getStatesByObjectId = async (objectId): Promise<any> => {
  const sundraxAPI = await getSundraxAPI();

  const fields = await fetch(sundraxAPI + 'fields?' + 'ObjectId=' + objectId, {
    method: 'GET',
    headers: {
      'Authorization-Token': rootApiToken,
      'Content-Type': 'application/json',
    },
  });

  const to = moment().format('YYYY-MM-DD');
  const from = moment().subtract(1, 'days').format('YYYY-MM-DD');

  const stateItem = await getStates(objectId, from, to, true);

  if (!fields) {
    return [];
  }
  const fieldsJson = await fields.json();

  if (!stateItem || !fieldsJson || !fieldsJson.length) {
    return [];
  }

  return fieldsJson.filter(
    item => item.UnitInfo && isFinite(stateItem[item.Field]),
  );
};

export const getStatesInfo = async (ProviderType, DeviceType) => {
  try {
    const sundraxAPI = await getSundraxAPI();
    const authToken = await loadDevicesAuthToken();
    const res = await fetch(
      sundraxAPI +
        'Catalogs/ProvidersAndTypes/' +
        ProviderType +
        '?DataTypes=' +
        DeviceType,
      {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: authToken,
        },
      },
    );

    return await res.json();
  } catch (e) {
    console.log('Error while getting states info', e);
  }
};

export const getStates = async (
  objectId: string,
  from: string,
  to: string,
  notConverted?: boolean,
  ProviderType?: string,
  DeviceType?: string,
): Promise<any> => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  const url =
    sundraxAPI +
    'states?' +
    'ObjectId=' +
    objectId +
    '&From=' +
    from +
    '&To=' +
    to;
  try {
    const fieldsInfoRes = await fetch(
      sundraxAPI + 'States/ChartsSettings/' + objectId,
      {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: authToken,
        },
      },
    );

    let fieldsInfo = [];

    if (fieldsInfoRes.status === 200) {
      try {
        fieldsInfo = await fieldsInfoRes?.json();
      } catch (e) {
        console.warn('Cannot convert fieldsInfoRes to json');
      }
    }

    /*    if (!fieldsInfo?.length) {
      return [];
    }*/

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    if (response.status === 200) {
      const statesJson = await response.json();
      statesJson.forEach(item => (item.Data = JSON.parse(item.Data)));

      if (notConverted) {
        return statesJson[0];
      }

      const onlyTable = !fieldsInfo?.length;
      let fields = [];

      const fieldsRes = await fetch(
        sundraxAPI + 'Catalogs/ProvidersAndTypes/' + ProviderType,
        {
          method: 'GET',
          headers: {
            accept: 'text/plain',
            Authorization: authToken,
          },
        },
      );

      if (fieldsRes?.status === 200) {
        fields = await fieldsRes.json();
        fields =
          fields?.find(item => item.DataType === DeviceType)?.Fields || [];
      }

      if (statesJson.length) {
        return convertedStates(
          statesJson,
          fields,
          undefined,
          fieldsInfo,
          false,
          onlyTable,
        );
      }

      console.log('States are empty');
      return [];
    } else {
      console.log("No information about this object's states");
    }
  } catch (error) {
    console.error('Getting states error', error);
  }
  return [];
};

const countStep = val => {
  if (val > 1000) {
    const valLength = val.toString().split('.')[0].length - 2;
    const coef = Math.round(val / 10 ** valLength);
    const newVal = coef * 10 ** valLength;
    return newVal;
  }
  return val;
};

export const convertedStates = (
  states: Array<any>,
  fields?: Array<any>,
  countPerOne = 2,
  fieldsInfo?: Array<any>,
  isDashboard = false,
  onlyTable = false,
) => {
  const singleObject = <singleObjectModel>{};
  const forTable = [];

  if (isDashboard) {
    states?.forEach(stateItem => {
      const statesList = Object.keys(stateItem);

      statesList.forEach(field => {
        const stateInfo = fieldsInfo?.find(item => item.ValueField === field);
        if (field === 'TimeStamp' || !stateInfo) {
          return;
        }
        if (singleObject[stateInfo.Field]) {
          singleObject[stateInfo.Field].data.push(countStep(stateItem[field]));
          singleObject[stateInfo.Field].timeStamps.push(stateItem.TimeStamp);
        } else {
          singleObject[stateInfo.Field] = <singleObjectItemModel>{
            data: [countStep(stateItem[field])],
            measureType: stateInfo.UnitInfo,
            timeStamps: [stateItem.TimeStamp],
            name: stateInfo.ValueField,
          };
        }
      });
    });
  } else {
    const fields2 =
      fieldsInfo?.length &&
      fieldsInfo?.reduce((prev, curr) => [...prev, ...curr.Fields], []);

    states.forEach(stateItem => {
      const addToTable: any = {Date: stateItem.TS};

      if (!onlyTable) {
        const statesList = Object.keys(stateItem.Data);
        statesList.forEach(field => {
          const tableStateInfo = fields?.find(item => item.Field === field);
          if (tableStateInfo?.Name) {
            addToTable[getTableColumnName(tableStateInfo)] =
              stateItem.Data[field];
          }
          const stateInfo = fields2?.find(item => item.Field === field);
          if (stateInfo) {
            if (singleObject[field]) {
              singleObject[field].data.push(countStep(stateItem.Data[field]));
              singleObject[field].timeStamps.push(stateItem.TS);
            } else {
              singleObject[field] = <singleObjectItemModel>{
                data: [countStep(stateItem.Data[field])],
                measureType: stateInfo.Unit,
                timeStamps: [stateItem.TS],
                name: stateInfo.Name,
              };
            }
          }
        });
      } else {
        const statesList = Object.keys(stateItem.Data);
        statesList.forEach(field => {
          const tableStateInfo = fields?.find(item => item.Field === field);
          if (tableStateInfo?.Name) {
            addToTable[getTableColumnName(tableStateInfo)] =
              stateItem.Data[field];
          }
        });
      }

      fields?.forEach(item => {
        if (
          item?.Field &&
          addToTable[getTableColumnName(item)] !== 0 &&
          !addToTable[getTableColumnName(item)]
        ) {
          addToTable[getTableColumnName(item)] = null;
        }
      });
      forTable.push(addToTable);
    });
  }

  if (onlyTable) {
    return [null, forTable];
  }

  const neededFields = [];
  const neededFieldsIndexed = {};

  if (isDashboard) {
    fieldsInfo?.forEach((chartItem, chartIndex) => {
      neededFields.push(chartItem.Field);
      neededFieldsIndexed[chartItem.Field] = {
        index: 0,
        ...chartItem,
      };
    });

    const dataList = Object.keys(singleObject)
      .map(name => {
        return neededFields.includes(name)
          ? {
              ...singleObject[name],
              average: _.mean(singleObject[name].data),
              minIndex: singleObject[name].data.indexOf(
                Math.min(...singleObject[name].data),
              ),
              maxIndex: singleObject[name].data.indexOf(
                Math.max(...singleObject[name].data),
              ),
              firstIndex: 0,
              lastIndex: singleObject[name].data.length - 1,
              serverParamName: name, //p1 p8 ...
              ...neededFieldsIndexed[name],
            }
          : undefined;
      })
      .filter(item => item);

    const finalData = [];
    dataList.forEach(item => {
      const neededIndex = neededFieldsIndexed[item.serverParamName].index;
      if (finalData[neededIndex]) {
        finalData[neededIndex].push(item);
      } else {
        finalData[neededIndex] = [item];
      }
    });

    return [finalData, forTable];
  } else {
    fieldsInfo?.forEach((chartItem, chartIndex) => {
      chartItem.Fields.forEach(item => {
        neededFields.push(item.Field);
        neededFieldsIndexed[item.Field] = {
          index: chartIndex,
          ...item,
        };
      });
    });

    const dataList = Object.keys(singleObject)
      .map(name => {
        return neededFields.includes(name)
          ? {
              ...singleObject[name],
              average: _.mean(singleObject[name].data),
              minIndex: singleObject[name].data.indexOf(
                Math.min(...singleObject[name].data),
              ),
              maxIndex: singleObject[name].data.indexOf(
                Math.max(...singleObject[name].data),
              ),
              firstIndex: 0,
              lastIndex: singleObject[name].data.length - 1,
              serverParamName: name, //p1 p8 ...
              ...neededFieldsIndexed[name],
            }
          : undefined;
      })
      .filter(item => item);

    const finalData = [];
    dataList.forEach(item => {
      const neededIndex = neededFieldsIndexed[item.serverParamName].index;
      if (finalData[neededIndex]) {
        // finalData[neededIndex].push({...item, data: item.data.slice(1, 5)});
        finalData[neededIndex].push(item);
      } else {
        // finalData[neededIndex] = [{...item, data: item.data.slice(1, 5)}];
        finalData[neededIndex] = [item];
      }
    });

    return [finalData, forTable];
  }
};

const getTableColumnName = item => {
  let res = '';
  if (item.Name) {
    res += item.Name;
  } else {
    res += item.Field;
  }

  if (item.Unit) {
    res += ` (${item.Unit})`;
  }

  return res;
};

interface singleObjectItemModel {
  data: Array<number>;
  timeStamps: Array<string>;
  measureType: String;
}

interface singleObjectModel {
  [name: string]: singleObjectItemModel;
}
