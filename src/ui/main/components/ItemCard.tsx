import { SubscriptionInfoDto } from 'core/subscription/persistence/dtos/SubscriptionPersistenceDto';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components/native';
import { CaretRight, HubAndProjectBlankImage } from 'ui/main/assets/icons';
import Card from 'ui/main/components/Card';
import Label from 'ui/main/components/Label';
import { makeStyle } from 'ui/main/theme/makeStyles';
import { normalize } from 'ui/main/utils/scalingUtils';
import Badge from './Badge';
import ImageWithLoading from './ImageWithLoading';

const CardContainer = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${(props) => props.theme.metrics.spacing[1]}px;
`;

const Information = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const LabelContainer = styled.View`
  flex: 1;
`;

const ImageContainer = styled.View`
  margin-right: ${(props) => props.theme.metrics.spacing[2]}px;
`;

const StyledCaretRight = styled(CaretRight)`
  margin-right: ${(props) => props.theme.metrics.spacing[1]}px;
`;

export interface ItemCardProps {
  imageUrl: string | undefined;
  title: string;
  onPress: () => void;
  subscriptionInfo?: SubscriptionInfoDto | undefined;
}

const ItemCard: React.FunctionComponent<ItemCardProps> = ({ imageUrl, title, onPress, subscriptionInfo }) => {
  const { t } = useTranslation(['subscription']);
  const theme = useTheme();
  const styles = useStyles();

  return (
    <CardContainer testID='item-card' onPress={onPress} containerStyle={styles.cardSpacing}>
      <Information>
        <ImageContainer>
          <ImageWithLoading
            uri={imageUrl}
            height={normalize(52)}
            width={normalize(52)}
            DefaultSvgImage={HubAndProjectBlankImage}
            borderRadius={theme.metrics.borderRadius[4]}
          />
        </ImageContainer>
        <LabelContainer>
          <Label variant={{ type: 'h4' }} numberOfLines={1}>
            {title}
          </Label>
        </LabelContainer>
      </Information>

      {subscriptionInfo?.showBannerDayLeft && (
        <Badge
          text={t('subscriptions:dayCountRest', {
            count: subscriptionInfo.nbDay,
          })}
          colors={{ background: '#F0F5FE' }}
          labelStyle={{ color: theme.colors.primary.primary }}
        />
      )}

      {subscriptionInfo?.showBannerTrialEnded && (
        <Badge text={t('subscriptions:trialEnded')} colors={{ background: '#FCEDED' }} labelStyle={{ color: theme.colors.error.error }} />
      )}

      {subscriptionInfo?.showBannerSubscriptionExpired && (
        <Badge text={t('subscriptions:subscriptionExpired')} colors={{ background: '#FCEDED' }} labelStyle={{ color: theme.colors.error.error }} />
      )}

      <StyledCaretRight height={normalize(24)} width={normalize(24)} color={theme.colors.black} />
    </CardContainer>
  );
};

const useStyles = makeStyle((theme) => ({
  cardSpacing: {
    marginHorizontal: theme.metrics.spacing[2],
    marginVertical: theme.metrics.spacing[1] / 2,
  },
}));

export default ItemCard;
