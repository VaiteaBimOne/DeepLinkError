import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action } from 'ui/issues/components/IssuesError';
import { EmptyViewer } from 'ui/main/assets/icons';
import ErrorSlate from 'ui/main/components/slates/ErrorSlate';

interface Props {
  resource?: string;
  action: Action;
}

const ForbiddenSlate: React.FunctionComponent<Props> = ({ resource, action }) => {
  const { t } = useTranslation(['errors']);

  return <ErrorSlate SvgImage={EmptyViewer} text={t('forbidden', { resource })} subText={t('forbiddenSubMsg', { resource })} action={action} />;
};

export default ForbiddenSlate;
