import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action } from 'ui/issues/components/IssuesError';
import { IssuesBlankSlate } from 'ui/main/assets/icons';
import ErrorSlate from './ErrorSlate';

interface Props {
  resource?: string;
  action: Action;
}

const NotFoundOfflineSlate: React.FC<Props> = ({ resource, action }) => {
  const { t } = useTranslation(['errors']);

  return <ErrorSlate SvgImage={IssuesBlankSlate} text={t('notFoundOffline', { resource })} action={action} />;
};

export default NotFoundOfflineSlate;
