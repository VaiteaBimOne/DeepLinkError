import DateTime, { DateFormat } from 'core/main/types/DateTime';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import styled, { useTheme } from 'styled-components/native';
import { normalize } from 'ui/main/utils/scalingUtils';
import Button from '../../../Button';
import { CalendarLocales, getCalendarTheme } from './DatePickerConfigs';

LocaleConfig.locales = CalendarLocales;
LocaleConfig.defaultLocale = 'en';

const CALENDAR_WIDTH = 340;

interface Props {
  defaultValue?: string;
  showDatePicker: boolean;
  value?: string;
  onChange: (date?: string) => void;
  setSavedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  savedDate?: string;
  useMinimumDate?: boolean;
  preventClear?: boolean;
}

const DatePickerModal: React.FC<Props> = ({
  defaultValue,
  showDatePicker,
  value,
  onChange,
  setSavedDate,
  savedDate,
  setShowDatePicker,
  useMinimumDate = true,
  preventClear = false,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const calendarWidth = Dimensions.get('screen').width < CALENDAR_WIDTH + 50 ? Dimensions.get('screen').width - 50 : CALENDAR_WIDTH;

  const handleCloseDatePicker = () => {
    setShowDatePicker(false);
    setSavedDate(value);
  };

  const initialDate = () => {
    if (savedDate) {
      return DateTime.fromLocal(savedDate).format(DateFormat.SimpleDate);
    }
    if (defaultValue) {
      return defaultValue;
    }

    return '';
  };

  const initialDateString = initialDate();
  setSavedDate(initialDateString);

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
            <Calendar
              theme={getCalendarTheme(theme)}
              style={{ width: normalize(calendarWidth) }}
              markedDates={{
                [initialDateString]: { selected: true, selectedColor: theme.colors.primary.primary },
              }}
              current={initialDateString}
              minDate={useMinimumDate ? DateTime.now().format(DateFormat.ISO8601) : undefined}
              onDayPress={(date) => setSavedDate(date.dateString)}
            />
            <Row>
              {!preventClear && <ActionButton variant='subtleDestructive' onPress={() => onChange()} label={t('common:clear')} />}
              <ButtonRow>
                <ActionButton variant='subtle' onPress={handleCloseDatePicker} label={t('common:cancel')} />
                <ActionButton variant='subtle' onPress={() => onChange(savedDate)} label={t('form:apply')} />
              </ButtonRow>
            </Row>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

export default DatePickerModal;

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
  flex: 1
  flex-direction: row;
  justify-content: flex-end
`;

const ModalContainer = styled.View`
  max-width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.metrics.borderRadius[4]}px;
  padding: ${(props) => props.theme.metrics.spacing[2]}px;
`;
