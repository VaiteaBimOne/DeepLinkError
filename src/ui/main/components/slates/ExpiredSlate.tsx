import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyViewer } from 'ui/main/assets/icons';
import ErrorSlate from 'ui/main/components/slates/ErrorSlate';
import { AppStackKey, HubsKey } from 'ui/main/navigation/navigationKeys';

const ExpiredSlate: React.FunctionComponent = () => {
  const { t } = useTranslation(['errors']);

  const navigation = useNavigation();
  return (
    <ErrorSlate
      SvgImage={EmptyViewer}
      text={t('subscriptionExpired')}
      subText={t('subscriptionExpiredSubMsg')}
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
export default ExpiredSlate;
