import styled from 'styled-components/native';

const Separator = styled.View`
  margin-top: ${(props) => props.theme.metrics.spacing[2]}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.grey.light};
`;

export default Separator;
