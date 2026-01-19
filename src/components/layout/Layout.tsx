import styled from "styled-components";
import { NavLink, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <LayoutContainer>
      <Sidebar>
        <Logo>Admin Dashboard</Logo>
        <Nav>
          <NavItem to="/" end>
            Members
          </NavItem>
          <NavItem to="/add-member">Add Member</NavItem>
        </Nav>
      </Sidebar>
      <Main>
        <Outlet></Outlet>
      </Main>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: min(200px, 20%);
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Logo = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const NavItem = styled(NavLink)`
  font-size: 1rem;
  color: #000000;
`;

const Main = styled.main`
  background: red;
  padding: 1.5rem;
  padding-left: calc(min(200px, 20%) + 1.5rem);
  background: #fafafa;

  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: baseline;
  min-height: 100vh;
`;
