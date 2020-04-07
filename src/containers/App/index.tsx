import React from "react";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";

import EventList from "../EventList/EventList";
import Login from "../Login/Login";

import EventPage from "../EventPage/EventPage";
import SignUp from "../SignUp/SignUp";
import Profile from "../Profile/Profile";
import EditProfile from "../Profile/EditProfile";

import PrivateRoute from "./PrivateRoute";
import ChangePassword from "../ChangePassword/ChangePassword";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import Bottom from "../../Components/BottomNavigation/BottomNavigation";

import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import { Snackbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../Snackbar/actions";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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
      <Switch>
        <ThemeProvider theme={theme}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route path="/change-password" component={ChangePassword} />
          <PrivateRoute exact path="/search" component={EventList} />
          <PrivateRoute exact path="/" component={Explore} />
          <PrivateRoute path="/event/:id_event" component={EventPage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/add-address" component={AddNewAddress} />
          <PrivateRoute
            path="/edit-address/:idAddress"
            component={EditAddress}
          />
          <PrivateRoute path="/manage-address" component={ManageAddress} />
          <PrivateRoute
            path="/attribute-address"
            component={AttributeAddress}
          />
          <PrivateRoute path="/map" component={MapContainer} />
          <PrivateRoute
            path="/become-organiser/1"
            component={BecomeOrganizerStepOne}
          />
          <PrivateRoute
            path="/become-organiser/2"
            component={BecomeOrganizerStepTwo}
          />
          <PrivateRoute
            path="/become-organiser/3"
            component={BecomeOrganizerStepThree}
          />
          <PrivateRoute
            path="/become-organiser/4"
            component={BecomeOrganizerStepFour}
          />
          <PrivateRoute path="/add-event" component={AddEvent} />
          <PrivateRoute path="/participate/:id_event" component={Participate} />
          <PrivateRoute path="/opinion/:id_event" component={AddOpinion} />
          <PrivateRoute path="/manage-events" component={ManageEvents} />
          <PrivateRoute path="/message" component={Message} />
          <PrivateRoute
            path="/participant-respond"
            component={ParticipateRespond}
          />
          <PrivateRoute
            path="/public-profile/:profile_id"
            component={PublicProfile}
          />
          <PrivateRoute path="/setting" component={Setting} />
          <Bottom />
        </ThemeProvider>
      </Switch>
      <div />
    </div>
  );
};

export default App;
