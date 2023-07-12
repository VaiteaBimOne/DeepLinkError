import React from 'react';
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { makeStyle } from 'ui/main/theme/makeStyles';

const BaseCard = styled.View`
  margin: ${(props) => props.theme.metrics.spacing[1] / 2}px;
`;

type Props = TouchableOpacityProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

const Card: React.FunctionComponent<Props> = ({ accessibilityRole, containerStyle, ...others }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity style={[containerStyle, styles.container]} onPress={others.onPress}>
      <BaseCard {...others} />
    </TouchableOpacity>
  );
};

const useStyles = makeStyle((theme) => ({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.metrics.borderRadius[4],
    elevation: 2,
    shadowColor: theme.colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
}));

export default Card;
