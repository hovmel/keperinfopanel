export const convertNestedObjects = nestedObjects => {
  const newList = [];
  nestedObjects.forEach(item => {
    newList.push({
      ...item,
      Items: undefined,
    });
    item?.Items?.forEach(item2 => {
      newList.push({
        ...item2,
        Items: undefined,
        ParentName: item?.Name,
      });
      item2?.Items?.forEach(item3 => {
        newList.push({
          ...item3,
          Items: undefined,
          ParentName: item2?.Name,
        });
        item3?.Items?.forEach(item4 => {
          newList.push({
            ...item4,
            Items: undefined,
            ParentName: item3?.Name,
          });
          item4?.Items?.forEach(item5 => {
            newList.push({
              ...item5,
              Items: undefined,
              ParentName: item4?.Name,
            });
          });
        });
      });
    });
  });
  return newList;
};

export const filterMarkersToRender = allMarkers => {
  let tmpMarkersToRender = [];
  const coordinatesList = [];

  for (const point of allMarkers) {
    let coordinates = point.Coordinates;

    if (!isFinite(coordinates?.Longitude)) {
      //console.log(point, '1212121');
      continue;
    }

    coordinates.Longitude =
      coordinates.Longitude +
      (Math.random() / 10 + Math.random() / 10 + Math.random() / 10) / 3000;

    if (coordinatesList.length) {
      coordinatesList.push({...coordinates});
    } else {
      coordinatesList.push(coordinates);
    }

    if (
      coordinates &&
      isFinite(coordinates.Latitude) &&
      isFinite(coordinates.Longitude)
    ) {
      tmpMarkersToRender.push(point);
    } else {
      console.log('Marker does not have coordinates');
    }
  }
  return tmpMarkersToRender;
};

export const convertMarkersToRender = (nestedObjects, allObjects) => {
  const flatObjects = convertNestedObjects(nestedObjects);
  const allObjectsChanged = filterMarkersToRender(allObjects);
  return flatObjects
    .map(item => {
      const currentObject = allObjectsChanged.find(item2 => {
        return item2.Id === item.Id;
      });
      if (!currentObject) {
        //console.log('NO CURRENT OBJECT');
        return undefined;
      }
      return {
        name: item.Name,
        Name: item.Name,
        coordinates: {
          ...currentObject.Coordinates,
          lat: currentObject.Coordinates?.Latitude,
          lon: currentObject.Coordinates?.Longitude,
        },
        Coordinates: {
          ...currentObject.Coordinates,
          lat: currentObject.Coordinates?.Latitude,
          lon: currentObject.Coordinates?.Longitude,
        },
        id: item.Id,
        Id: item.Id,
        DeviceType: item.DeviceType,
        status: currentObject.Status,
        Status: currentObject.Status,
        level: currentObject.Level,
        ParentName: item?.ParentName,
      };
    })
    .filter(item => item)
    .map(item => ({
      point: item?.coordinates,
      data: item,
    }))
    .filter(item => item.point && Object.keys(item.point).length);
};
