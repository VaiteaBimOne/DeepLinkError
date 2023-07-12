import { Theme } from 'react-native-calendars/src/types';
import { DefaultTheme } from 'styled-components/native';
import { normalize } from 'ui/main/utils/scalingUtils';

export const CalendarLocales = {
  en: {
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
  },
  fr: {
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    today: "Aujourd'hui",
  },
};

export const getCalendarTheme = (theme: DefaultTheme): Theme => ({
  arrowColor: theme.colors.primary.primary,

  dayTextColor: theme.colors.black,
  // @ts-expect-error: Styling overrides must be provided in this form
  'stylesheet.day.basic': {
    base: {
      alignItems: 'center',
      height: normalize(34),
      width: normalize(34),
    },
    selected: {
      borderRadius: normalize(18),
    },
    text: {
      fontFamily: 'CircularStd-Book',
      fontSize: normalize(16),
      marginTop: normalize(6),
    },
  },
  'stylesheet.day.period': {
    base: {
      alignItems: 'center',
      height: normalize(34),
      width: normalize(34),
    },
    fillers: {
      flexDirection: 'row',
      height: normalize(34),
      left: 0,
      position: 'absolute',
      right: 0,
    },
    leftFiller: {
      flex: 1,
      height: normalize(34),
    },
    rightFiller: {
      flex: 1,
      height: normalize(34),
    },
  },
  'stylesheet.marking': {
    endingDay: {
      borderBottomRightRadius: normalize(2),
      borderTopRightRadius: normalize(10),
      marginRight: 4,
    },
    startingDay: {
      borderBottomLeftRadius: 2,
      borderTopLeftRadius: 2,
      marginLeft: 4,
    },
  },
  textColor: theme.colors.black,
  textDayFontFamily: 'CircularStd-Book',
  textDayFontSize: normalize(16),
  textDayHeaderFontFamily: 'CircularStd-Book',
  textDayHeaderFontSize: normalize(16),
  textDayStyle: { marginTop: normalize(6) },
  textMonthFontFamily: 'CircularStd-Book',
  textMonthFontSize: normalize(20),
  todayTextColor: theme.colors.black,
});
