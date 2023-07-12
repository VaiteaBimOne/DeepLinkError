import { IssuesTypes } from 'core/issues/hooks/useControllers';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { IssuesBlankSlate } from 'ui/main/assets/icons';
import EmptySlate from 'ui/main/components/slates/EmptySlate';
import Label from '../Label';

styled(Label)`
  color: ${(props) => props.theme.colors.grey.medium};
  text-align: center;
`;

styled(Label)`
  text-align: center;
`;

styled(Label)`
  padding-top: ${(props) => props.theme.metrics.spacing[3]}px;
`;

interface Props {
  type: IssuesTypes;
}

const NoResultsSlate: React.FC<Props> = ({ type }) => {
  const { t } = useTranslation('issues');

  const text = type === IssuesTypes.Draft ? t('filters.noFilterDraftError') : t('filters.noItemsTitle');

  return <EmptySlate testID='no-filter-empty-state' SvgImage={IssuesBlankSlate} text={text} subText={t('filters.noItemsDescription')} />;
};

export default NoResultsSlate;
