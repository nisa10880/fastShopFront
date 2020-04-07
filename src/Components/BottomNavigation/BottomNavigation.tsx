import React, { useEffect } from "react";
import * as action from "../../containers/App/actions";
import { push } from "connected-react-router";
import { BottomNavigation, Button, Grid } from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { useDispatch, useSelector } from "react-redux";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import PeopleIcon from "@material-ui/icons/People";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShareIcon from "@material-ui/icons/Share";
import MessageIcon from "@material-ui/icons/Message";

const Bottom = props => {
  const { pathname, event }: any = useSelector(state => ({
    pathname: state.router.location.pathname
  }));
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(pathname.substring(0, 6));

  useEffect(() => {
    dispatch(action.sendCurrentUserInformation());
  }, [dispatch]);

  return (
    <BottomNavigation
      onChange={handleChange}
      value={value}
      style={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        height: 64,
        borderRadius: "0px 0px 16px 16px",
        boxShadow:
          "rgba(224, 29, 29, 0) 0px 5px 5px -3px, rgba(0, 0, 0, 0.05) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 20px 2px",
        border: "solid 0.5px #00000012"
      }}
    >
      <BottomNavigationAction
        label="TimeLapps"
        value="TimeLapps"
        icon={<HourglassEmptyIcon />}
        onClick={() => dispatch(push("/"))}
      />
      <BottomNavigationAction
        label="Message"
        value="Message"
        icon={<MessageIcon />}
        onClick={() => dispatch(push("/message"))}
      />
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={<AccountCircleIcon />}
        onClick={() => dispatch(push("/profile"))}
      />
    </BottomNavigation>
  );
};

export default Bottom;
