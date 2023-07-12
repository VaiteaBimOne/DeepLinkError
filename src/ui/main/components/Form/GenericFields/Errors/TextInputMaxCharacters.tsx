import React from 'react';
import { useTranslation } from 'react-i18next';
import ErrorText from '../ErrorText';

export interface Props {
  value: string | undefined;
  maxLength: number | undefined;
}

const TextInputMaxCharacters = ({ value, maxLength }: Props) => {
  const { t } = useTranslation();
  const hasValueReached = value && maxLength && value.length === maxLength;

  const maxCharactersReached = () => {
    if (hasValueReached) {
      return t('errors:characterLimitReached').replace('XXXXX', maxLength.toString());
    }

    return undefined;
  };

  return hasValueReached ? <ErrorText variant={{ type: 'error' }}>{maxCharactersReached()}</ErrorText> : <></>;
};

export default TextInputMaxCharacters;
