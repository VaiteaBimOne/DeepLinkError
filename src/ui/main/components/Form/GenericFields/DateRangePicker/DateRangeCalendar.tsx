import DateTime, { DateFormat } from 'core/main/types/DateTime';
import React, { useImperativeHandle, useState } from 'react';
import { Calendar, CalendarProps } from 'react-native-calendars';
import { useTheme } from 'styled-components/native';
import { CalendarRefType } from './DateRangePickerModal';

interface MarkedDate {
  [date: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color?: string;
    textColor?: string;
  };
}

interface Props extends CalendarProps {
  startDate?: string;
  endDate?: string;
  onChange: (minDate?: string, maxDate?: string) => void;
  ref?: any;
}

const DateRangeCalendar: React.FunctionComponent<Props> = React.forwardRef<CalendarRefType, Props>(
  ({ startDate, endDate, onChange, ...props }, ref) => {
    const theme = useTheme();
    const [minDate, setMinDate] = useState<string | undefined>(startDate);
    const [maxDate, setMaxDate] = useState<string | undefined>(endDate);

    useImperativeHandle(ref, () => ({
      resetDates,
    }));

    const resetDates = () => {
      setMinDate(undefined);
      setMaxDate(undefined);
      onChange(undefined, undefined);
    };

    const handleChange = (newMinDate?: string, newMaxDate?: string) => {
      setMinDate(newMinDate);
      setMaxDate(newMaxDate);
      onChange(newMinDate, newMaxDate);
    };

    const getMarkedDates = () => {
      const markedDates: MarkedDate = {};

      if (minDate) {
        markedDates[minDate] = { color: theme.colors.primary.primary, startingDay: true, textColor: theme.colors.white };
      }

      if (minDate && maxDate) {
        const minDateTime = DateTime.fromLocal(minDate);
        const maxDateTime = DateTime.fromLocal(maxDate);

        const range = maxDateTime.differenceInCalendarDays(minDateTime);

        for (let i = 0; i <= range; i++) {
          const date = minDateTime.addDays(i);
          const dateString = date.format(DateFormat.SimpleDate);

          markedDates[dateString] = {
            color: theme.colors.primary.primary,
            endingDay: i === range,
            startingDay: i === 0,
            textColor: theme.colors.white,
          };
        }
      }

      return markedDates;
    };

    const onDayPress = (day: { dateString: string }) => {
      const hasNoMinDate = !minDate;
      const hasMinAndMaxDate = minDate && maxDate;
      const dateIsBeforePreviousMinDate = minDate
        ? DateTime.fromLocal(day.dateString).differenceInCalendarDays(DateTime.fromLocal(minDate)) < 0
        : false;

      if (hasNoMinDate || hasMinAndMaxDate || dateIsBeforePreviousMinDate) {
        return handleChange(day.dateString);
      }

      if (!maxDate && minDate) {
        const minDateTime = DateTime.fromUtc(minDate);
        const dayDateTime = DateTime.fromUtc(day.dateString);
        const isMaxDateBeforeMinDate = dayDateTime.differenceInCalendarDays(minDateTime) < 0;
        if (isMaxDateBeforeMinDate) {
          return handleChange(day.dateString, minDate);
        }

        return handleChange(minDate, day.dateString);
      }
    };

    return <Calendar current={minDate} markedDates={getMarkedDates()} onDayPress={onDayPress} {...props} />;
  },
);

export default DateRangeCalendar;
