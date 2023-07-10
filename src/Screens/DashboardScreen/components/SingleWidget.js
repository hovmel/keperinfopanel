import React, {useEffect, useState} from 'react';
import {getWidgetData} from '../../../Utils/API/Dashboards';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from '../../StatesScreen/styles';
import Colors from '../../../Constants/Colors';
import GraphCard from '../../../Components/GraphCard';
import TableCard from '../../../Components/TableCard';
import useTranslation from '../../../Translations';
import Gradient from '../../../Components/Gradient';

const SingleWidget = ({
  board,
  widget,
  from,
  to,
  activeScreen = 'graphs',
  refresh,
}) => {
  const [loading, setLoading] = useState(false);
  const [statesChunks, setStatesChunks] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [gradient, setGradient] = useState({});

  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      if (widget?.Id && board?.Id) {
        setLoading(true);
        const data =
          (await getWidgetData(
            board.Id,
            widget.Id,
            from,
            to,
            widget.ChartParameters,
          )) || [];

        if (data.isGradient) {
          setGradient(data.Table);
        } else {
          const [statesChunks, statesList] = data;

          if (statesChunks?.length) {
            setStatesChunks(statesChunks);
            setStatesList(statesList);
          } else {
            setStatesChunks([]);
            setStatesList([]);
          }
        }

        setLoading(false);
      }
    })();
  }, [board, widget, from, to, refresh]);

  return loading ? (
    <View style={styles.loadingView}>
      <ActivityIndicator size={'large'} color={Colors.main} />
    </View>
  ) : !statesChunks?.length && !gradient?.Headers ? (
    <View style={styles.loadingView}>
      <Text>{t('no_data')}</Text>
    </View>
  ) : activeScreen === 'graphs' ? (
    gradient?.Headers ? (
      <Gradient data={gradient} />
    ) : (
      statesChunks?.map((item, index) => (
        <GraphCard dataList={item} key={index + '$'} />
      ))
    )
  ) : activeScreen === 'table' ? (
    <TableCard dataList={statesList} />
  ) : (
    <Text>Page under construction</Text>
  );
};

export default SingleWidget;
