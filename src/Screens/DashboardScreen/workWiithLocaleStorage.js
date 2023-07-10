import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllBoards = async () => {
  const boards = await AsyncStorage.getItem('boards');
  if (!boards) {
    return [];
  }
  return JSON.parse(boards);
};

export const getBoardByName = async name => {
  const allBoards = await getAllBoards();
  const foundBoard = allBoards.find(item => item.name === name);
  return {board: foundBoard, allBoards};
};

export const setBoards = async boards => {
  await AsyncStorage.setItem('boards', JSON.stringify(boards));
};

export const addBoardToStorage = async (name, object) => {
  const allBoards = await getAllBoards();
  const matchingName = allBoards.find(item => item.name === name);
  if (matchingName) {
    return false;
  }
  allBoards.push({name, object, widgets: []});
  await setBoards(allBoards);
  return true;
};

export const addWidgetToStorage = async (boardName, name, states) => {
  const {board, allBoards} = await getBoardByName(boardName);
  if (!board) {
    return false;
  }
  const matchingName = board.widgets.find(item => item.name === name);
  if (matchingName) {
    return false;
  }
  console.log({name, states});
  board.widgets.push({name, states});
  await setBoards(allBoards);
  return true;
};
