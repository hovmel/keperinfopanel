import Colors from '../../Constants/Colors';
import {Fonts} from '../../Constants/Fonts';
import Switches from 'react-native-switches';
import React, {useEffect, useState} from 'react';
import {logIn} from "../../Utils/API/User";

type Props = {
  onChange: () => void;
  disabled: boolean;
  switchDefaultValue?: false;
};

const SimpleSwitch: React.FC<Props> = ({
  onChange,
  disabled = false,
  switchDefaultValue = false,
}) => {
  const [switched, setSwitched] = useState(switchDefaultValue);


  useEffect(() => {
      setSwitched(switchDefaultValue)
  }, [switchDefaultValue])
  return (
    <Switches
      shape={'pill'}
      onChange={() => {
        const newValue = !switched;
        // @ts-ignore
        setSwitched(newValue);
        setTimeout(onChange, 200);
      }}
      animationDuration={100}
      disabled={disabled}
      value={switched}
      borderWidth={0}
      colorSwitchOn={disabled ? Colors.switchMainDisabled : Colors.main}
      colorSwitchOff={disabled ? Colors.switchGrayDisabled : Colors.gray}
      buttonSize={17}
      sliderHeight={24}
      sliderWidth={40}
      buttonOffsetLeft={0}
      buttonOffsetRight={5}
      showText={false}
    />
  );
};

export default SimpleSwitch;
