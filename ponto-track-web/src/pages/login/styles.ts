import { Container, Paper, styled } from '@mui/material'

export const StyledPaper = styled(Paper)`
  max-height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;
  width: 30rem;
  border-radius: 0.5rem;
`

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`

export const StyledPLogo = styled('p')`
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: 500;
`
