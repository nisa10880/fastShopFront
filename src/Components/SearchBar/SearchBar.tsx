import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

interface Props {
  search?: string;
  handleInputChange: any;
  handleKeyDown: any;
  onClick?: any;
}

export default function SearchBar(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.search} onClick={props.onClick}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        value={props.search}
        onChange={props.handleInputChange}
        onClick={props.onClick}
        placeholder="Search…"
        name="search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      borderRadius: 50,
      boxShadow:
        "0px 5px 5px -3px rgba(224, 29, 29, 0), 0px 8px 10px 1px rgba(0, 0, 0, 0.05), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
      backgroundColor: "#f9f9f9",
      "&:hover": {
        backgroundColor: "white"
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "auto",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      height: 32,
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  })
);
