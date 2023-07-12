import styled from 'styled-components/native';
import Label from '../../Label';

const ErrorText = styled(Label)`
  padding-top: ${(props) => props.theme.metrics.spacing[1]}px;
  color: ${(props) => props.theme.colors.error.errorText};
`;

export default ErrorText;
