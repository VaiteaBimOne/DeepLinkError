import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action } from 'ui/issues/components/IssuesError';
import { EmptyViewer } from 'ui/main/assets/icons';
import ErrorSlate from 'ui/main/components/slates/ErrorSlate';

interface Props {
  action: Action;
  resource?: string;
}

const UnderMaintenanceSlate: React.FunctionComponent<Props> = ({ resource, action }) => {
  const { t } = useTranslation(['errors']);

  return (
    <ErrorSlate
      SvgImage={EmptyViewer}
      text={t('underMaintenance', { resource })}
      subText={t('underMaintenanceSubMsg', { resource })}
      action={action}
    />
  );
};

export default UnderMaintenanceSlate;
