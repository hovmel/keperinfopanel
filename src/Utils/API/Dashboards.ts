import {getSundraxAPI} from './Task';
import {loadDevicesAuthToken} from '../../Constants/API';
import {convertedStates} from './States';

export const getBoards = async () => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + 'Dashboard/boards', {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error while getting boards:', error);
    return false;
  }
};

export const getWidgets = async boardId => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(sundraxAPI + `Dashboard/${boardId}/widgets`, {
      method: 'GET',
      headers: {
        accept: 'text/plain',
        Authorization: authToken,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error while getting widgets', error);
    return false;
  }
};

export const getWidgetData = async (
  boardId,
  widgetId,
  from,
  to,
  ChartParameters,
) => {
  const sundraxAPI = await getSundraxAPI();
  const authToken = await loadDevicesAuthToken();
  try {
    const response = await fetch(
      sundraxAPI +
        `Dashboard/widget/data?BoardId=${boardId}&WidgetId=${widgetId}&From=${from}&To=${to}`,
      {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: authToken,
        },
      },
    );

    if (response.status !== 200) {
      return null;
    }

    const data = await response.json();

    if (data?.Items?.length) {
      return convertedStates(
        data?.Items || [],
        [],
        undefined,
        ChartParameters,
        true,
      );
    } else if (data?.Table) {
      return {...data, isGradient: true};
    }

    return [];
  } catch (error) {
    console.error('Error while getting widget data:', error);
    return false;
  }
};
