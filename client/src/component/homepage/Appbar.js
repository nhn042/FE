import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '8%',
    flexGrow: 1,
  },

  menuIcon: {
    display: "flex",
    position: "absolute",
    right: "5px",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  select: {
    display: "flex",
    justifyContent: 'flex-start',
    flexDirection: "row",
    gap: "15px",
  },
}));

const MenuAppBar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login", { replace: true });
  };
  const handleSearch = (event) => {
    event.preventDefault();
    navigate("/search", { replace: true });
  };
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.select}>
            <Typography variant="h6" className={classes.title}>
              <span>{t("auth.appBar.Home")}</span>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <span onClick={handleSearch}>{t("auth.appBar.Search")}</span>
            </Typography>
          </div>
          {auth && (
            <div className={classes.menuIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogin}>
                  {t("auth.login.logout")}
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuAppBar;
