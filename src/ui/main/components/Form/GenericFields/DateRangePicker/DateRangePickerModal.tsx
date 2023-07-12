import DateRange from 'core/main/types/DateRange';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import styled, { useTheme } from 'styled-components/native';
import { normalize } from 'ui/main/utils/scalingUtils';
import Button from '../../../Button';
import { CalendarLocales, getCalendarTheme } from '../DatePicker/DatePickerConfigs';
import DateRangeCalendar from './DateRangeCalendar';

LocaleConfig.locales = CalendarLocales;
LocaleConfig.defaultLocale = 'en';

const ActionButton = styled(Button)`
  padding-left: ${(props) => props.theme.metrics.spacing[1]}px;
  padding-right: ${(props) => props.theme.metrics.spacing[1]}px;
  padding-bottom: 0;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ButtonRow = styled.View`
  flex-direction: row;
`;

const ModalContainer = styled.View`
  max-width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
`;

interface Props {
  showDatePicker: boolean;
  value?: DateRange;
  onChange: (props?: DateRange) => void;
  setSavedDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  savedDate?: DateRange;
  useMinimumDate?: boolean;
}

export type CalendarRefType = {
  resetDates: () => void;
};

const CALENDAR_WIDTH = 340;

const DateRangePickerModal = ({ showDatePicker, value, onChange, setSavedDate, savedDate, setShowDatePicker }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const calendarRef = useRef<CalendarRefType>();
  const calendarWidth = Dimensions.get('screen').width < CALENDAR_WIDTH + 50 ? Dimensions.get('screen').width - 50 : CALENDAR_WIDTH;

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
    setSavedDate(value);
  };

  const handleClear = () => {
    calendarRef.current?.resetDates();
  };

  return (
    <>
      {showDatePicker && (
        <Modal
          useNativeDriver
          onBackdropPress={handleCloseDatePicker}
          onBackButtonPress={handleCloseDatePicker}
          hasBackdrop={true}
          isVisible={showDatePicker}
          onSwipeComplete={handleCloseDatePicker}
          swipeDirection={['down']}
          style={{ alignSelf: 'center', maxWidth: normalize(375) }}>
          <ModalContainer>
            <DateRangeCalendar
              markingType={'period'}
              style={{ width: normalize(calendarWidth) }}
              startDate={savedDate?.start}
              endDate={savedDate?.end}
              onChange={(minDate?: string, maxDate?: string) => setSavedDate({ end: maxDate, start: minDate })}
              theme={getCalendarTheme(theme)}
              ref={calendarRef}
            />
            <Row>
              <ActionButton variant='subtleDestructive' onPress={handleClear} label={t('common:clear')} />
              <ButtonRow>
                <ActionButton variant='subtle' onPress={handleCloseDatePicker} label={t('common:cancel')} />
                <ActionButton variant='subtle' testID={'apply-date-range'} onPress={() => onChange(savedDate)} label={t('form:apply')} />
              </ButtonRow>
            </Row>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

export default DateRangePickerModal;
