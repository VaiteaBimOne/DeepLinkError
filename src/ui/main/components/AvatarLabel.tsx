import { RfiSubmittalContact } from 'core/rfiSubmittal/generic/domain/RfiSubmittal';
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import Avatar, { AvatarColors } from './Avatar';
import HighlightedLabel from './HighlightedLabel';
import Label from './Label';

interface Props {
  contact: RfiSubmittalContact; //TODO: Change for a generic contact interface or add multiple options with the same basic infos (when needed)
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  avatarColor?: AvatarColors;
}

const MAX_NAME_LENGTH = 23;

const AvatarLabel: React.FC<Props> = ({ contact, containerStyle, labelStyle, avatarColor }) => {
  const getInitials = () => {
    return contact.firstName && contact.lastName
      ? `${[...contact.firstName.replace('<b>', '')][0].toUpperCase()}${[...contact.lastName][0].toUpperCase()}`
      : '';
  };

  const getName = () => {
    if (contact.firstName || contact.lastName) {
      const name = `${contact.firstName} ${contact.lastName}`;
      return name.length > MAX_NAME_LENGTH ? `(${name.substring(0, MAX_NAME_LENGTH - 3)}...` : name;
    }

    return contact.email.length > MAX_NAME_LENGTH ? `(${contact.email.substring(0, MAX_NAME_LENGTH - 3)}...` : contact.email;
  };
  return (
    <Container style={containerStyle}>
      <Avatar
        uri={contact.avatarUrl}
        placeholderText={getInitials()}
        placeholderColors={{ background: avatarColor?.background, border: avatarColor?.border, text: avatarColor?.text }}
      />
      <Title variant={{ type: 'h4' }} style={labelStyle}>
        <HighlightedLabel variant={{ type: 'name' }} text={getName()} />
      </Title>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  margin-vertical: ${(props) => props.theme.metrics.spacing[0]}px;
`;

const Title = styled(Label)`
  alignself: center;
  padding-left: ${(props) => props.theme.metrics.spacing[1]}px;
  overflow-wrap: break-word;
`;

export default AvatarLabel;
