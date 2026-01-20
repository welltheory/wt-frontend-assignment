import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { MembersList } from "../components/homePage/MembersList";
import { PageHeader } from "../components/PageHeader";
import styled from "styled-components";

export const Home = () => {
  return (
    <div>
      <PageHeader title="Members" subtitle="Manage your members." />

      <AddMemberLinkButtonContainer>
        <StyledLink to="/add-member">
          <Button
            variant="contained"
            color="primary"
            data-testid="add-member-button"
          >
            Add Member
          </Button>
        </StyledLink>
      </AddMemberLinkButtonContainer>

      <MembersList />
    </div>
  );
};

const AddMemberLinkButtonContainer = styled.div({
  marginBottom: "1rem",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});
