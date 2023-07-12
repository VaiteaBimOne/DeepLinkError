import React from 'react';
import { useTranslation } from 'react-i18next';
import { Action } from 'ui/issues/components/IssuesError';
import { EmptyViewer } from 'ui/main/assets/icons';
import ErrorSlate from 'ui/main/components/slates/ErrorSlate';

interface Props {
  action: Action;
  resource?: string;
  from?: string;
}

const NotFoundSlate: React.FunctionComponent<Props> = ({ from, resource, action }) => {
  const { t } = useTranslation(['errors']);

  return (
    <ErrorSlate
      from={from}
      SvgImage={EmptyViewer}
      text={t('resourceNotFound', { resource })}
      subText={t('resourceNotFoundSubMsg', { resource })}
      action={action}
    />
  );
};

export default NotFoundSlate;
