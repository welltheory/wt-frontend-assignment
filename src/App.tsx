import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Home } from "./pages/Home";
import { Layout } from "./components/layout/Layout";
import { MemberDetails } from "./pages/MemberDetails";
import { AddMember } from "./pages/AddMember";
import { MembersListContextProvider } from "./context/MembersListContext";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MembersListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/members/:id" element={<MemberDetails />} />
              <Route path="/add-member" element={<AddMember />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MembersListContextProvider>
    </ThemeProvider>
  );
}

export default App;
