import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyViewer } from 'ui/main/assets/icons';
import ErrorSlate from 'ui/main/components/slates/ErrorSlate';
import { AppStackKey, HubsKey } from 'ui/main/navigation/navigationKeys';

interface Props {
  nbDay: number | undefined;
}

const TrialEndedSlate: React.FunctionComponent<Props> = ({ nbDay }) => {
  const { t } = useTranslation(['subscriptions']);

  const navigation = useNavigation();
  let nbOfDaysLeft = 30;
  if (nbDay) {
    nbOfDaysLeft = 30 - Math.abs(nbDay);
  }

  return (
    <ErrorSlate
      SvgImage={EmptyViewer}
      text={t('subscriptions:trialEndTitle')}
      subText={t('subscriptions:trialEndSub', {
        count: nbOfDaysLeft,
      })}
      action={{
        actionLabel: t('common:goBackToHubs'),
        onAction: () =>
          navigation.navigate(AppStackKey, {
            screen: HubsKey,
          }),
      }}
    />
  );
};
export default TrialEndedSlate;
