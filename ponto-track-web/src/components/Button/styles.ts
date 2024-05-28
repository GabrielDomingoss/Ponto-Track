import { Button, ButtonProps, styled } from '@mui/material'

interface ButtonCustomProps extends ButtonProps {}
export const StyledButton = styled(Button)<ButtonCustomProps>`
  width: max-content + '1rem';
  color: ${(props) =>
    props.variant === 'text' ? props.theme.palette.primary.main : 'white'};
  text-transform: none;
`
