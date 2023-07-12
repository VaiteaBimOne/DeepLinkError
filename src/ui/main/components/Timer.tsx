import React, { useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Label, { LabelVariant } from './Label';

export interface TimerProps {
  start: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  labelVariant?: LabelVariant;
}

const Timer: React.FunctionComponent<TimerProps> = ({ start = false, style, labelStyle, labelVariant }) => {
  const [time, setTime] = useState(0);
  const [timerCallback, setTimerCallback] = useState<NodeJS.Timer | undefined>(undefined);

  const getFormattedTime = () => {
    const seconds = time % 60;
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`;

    const minutes = Math.floor(time / 60);
    const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`;

    return `${formattedMinutes} : ${formattedSeconds}`;
  };

  useEffect(() => {
    if (start && !timerCallback) {
      setTimerCallback(
        setInterval(() => {
          setTime((timer: number) => timer + 1);
        }, 1000),
      );
    }

    return () => {
      if (timerCallback) {
        clearInterval(timerCallback);
      }
    };
  }, [start, timerCallback]);

  return (
    <View style={style}>
      <Label variant={labelVariant} style={labelStyle}>
        {getFormattedTime()}
      </Label>
    </View>
  );
};

export default Timer;
