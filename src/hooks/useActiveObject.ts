import {useSelector} from 'react-redux';
import {setActiveObjectSelector} from '../models/markers/selectors';
import {useActionWithPayload} from './useAction';
import {markerActions} from '../models/markers';

export default () => {
  const setActiveObject = useActionWithPayload(markerActions.setActiveObject);
  const activeObject = useSelector(setActiveObjectSelector);
  return [activeObject, setActiveObject];
};
