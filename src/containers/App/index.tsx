import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import * as Authaction from "../Login/actions";

import Login from "../Login/Login";

import SignUp from "../SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import ChangePassword from "../ChangePassword/ChangePassword";
import ForgetPassword from "../ForgetPassword/ForgetPassword";

import Bottom from "../../Components/BottomNavigation/BottomNavigation";

import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import { Snackbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../Components/Snackbar/actions";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import HomePage from "../HomePage/HomePage";

const App = props => {
  const { snackbarState }: any =
    useSelector(state => ({ snackbarState: state.snackbarReducer })) || [];

  const theme = createMuiTheme({
    overrides: {
      // Style sheet name âï¸
      MuiButton: {
        root: { borderRadius: 100 },
        // Name of the rule
        text: {
          // Some CSS
          color: "white"
        }
      }
    },

    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#4568dc"
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#ffcc00"
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  });

  const dispatch = useDispatch();
  return (
    <div>
      <CustomAppBar />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        style={{ marginTop: 64 }}
        open={snackbarState.open}
        message={snackbarState.message}
        autoHideDuration={3000}
        onClose={() => dispatch(closeSnackbar())}
      />

      <Helmet titleTemplate="Timelapps" defaultTitle="Timelapps">
        {" "}
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Button
        variant="text"
        color="inherit"
        style={{
          height: 54
        }}
        onClick={() => dispatch(Authaction.logoutUser())}
      >
        Log out{" "}
      </Button>
      <Switch>
        <ThemeProvider theme={theme}>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route path="/change-password" component={ChangePassword} />
          {/* <Bottom /> */}
        </ThemeProvider>
      </Switch>
      <div />
    </div>
  );
};

export default App;
