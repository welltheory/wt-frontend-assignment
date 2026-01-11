import styled from 'styled-components'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`

export const Home = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Members Admin Page
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/members")}
      >
        Go to Members
      </Button>

    </StyledContainer>
  )
}
