import { ButtonProps } from '@mui/material'
import { StyledButton } from './styles'

export function Button(props: ButtonProps) {
  return <StyledButton {...props}>{props.children}</StyledButton>
}
