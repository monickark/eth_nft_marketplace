import Link from "components/Link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import MenuIcon from "@material-ui/icons/Menu";

import { routes } from "../../data/routes";
import { ImportantDevices } from "@material-ui/icons";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  var icount = 0;
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);

  const router = useRouter();

  const path = routes;
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogout = async () => {
    localStorage.setItem('userAuthToken', '');
    router.push('/login', undefined, { shallow: true });
  }

  React.useEffect(() => {
    if (localStorage.getItem('userAuthToken')) {
      setIsLoggedIn(true);

    }
  }, []);



  const tabs = (
    <>
      <Grid container justifyContent="flex-end">
        {path.map(({ name, link }) => (
          <Grid item key={icount++}>
            <Link href={link}>
              <Typography
                className={classes.link}
              >
                {name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        anchor="left"
      >

        <div className={classes.toolbarMargin0} />


        <List disablePadding key={icount++}>
          <Box className={classes.closeMenu} onClick={() => setOpenDrawer(false)} > <CloseIcon /> </Box>
          {path.map(({ name, link }) => (
            <ListItem
              key={link}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
              }}
              key={icount++}
            >
              <ListItemText disableTypography key={icount++}>
                <Link href={link} className={classes.menuItemsMobile}>
                  <Typography
                    style={{
                      color: "#fff",
                    }}
                  >
                    {name}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>

          ))}
          <ListItem className={classes.mobLinksList} key={icount++}>
            <ListItemText disableTypography>
              <Link className={classes.mobLinks} href="/create"> Create  </Link>
              {(isLoggedIn) ?

                <Link className={classes.mobLinks} href="#" onClick={handleLogout}> Logout </Link>
                :
                <Link className={classes.mobLinks} href="/login"> Login </Link>
              }
            </ListItemText>
          </ListItem>
        </List>

      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          <Toolbar
            disableGutters
            style={{
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              padding: matches ? "0 16px" : "10px",
              minHeight: "58px",
            }}
          >
            <>

              <Link href="/" className={classes.headerLogo}>
                <img src="/images/wwt-logo.png" alt="logo" />
              </Link>
              <Grid item className={classes.navbarSupportedContent} key={icount++}>
                <Box className={classes.menuLinks}>
                  {matches ? drawer : tabs}
                </Box>
                <Box className={classes.rightHeaderbtn}>
                  <Link className={`${classes.Headerbtns} ${classes.createBtn}`} href="/create"> Create  </Link>
                  {(isLoggedIn) ?

                    <Link className={`${classes.Headerbtns} ${classes.loginBtn}`} href="#" onClick={handleLogout}> Logout </Link>
                    :
                    <Link className={`${classes.Headerbtns} ${classes.loginBtn}`} href="/login"> Login </Link>
                  }
                </Box>
              </Grid>

            </>


          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <div className={classes.toolbarMargin0} />
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: `5em`,
    [theme.breakpoints.down("md")]: {
      marginBottom: "4em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "2em",
    },
  },
  logo: {
    color: theme.palette.secondary.main,
    width: "max-content",
    fontSize: "1.5rem",
  },
  drawer: {
    background: "#000",
    '& ul': {
      textAlign: "center",
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    color: "rgba(0, 0, 0, 0.55)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    fontSize: "1.25rem",
    lineHeight: "1",

  },
  drawer: {
    backgroundColor: theme.palette.secondary.main,
    padding: "0 6em",
  },

  link: {
    fontSize: "1em",
    color: "#cd8080",
    padding: "0.5rem 1rem",
    "&:hover": {
      color: "#fff",
    },
    [theme.breakpoints.down('md')]: {
      color: '#fff',
    },
  },
  headerLogo: {
    '& img': {
      width: "200px",
      position: "absolute",
      top: "10px",
      left: "30px",
    }
  },
  navbarSupportedContent: {
    display: "flex !important",
    flexBasis: "auto",
    flexGrow: "1",
    alignItems: "center",

  },
  menuLinks: {
    color: "#fff",
    marginRight: "30px !important",
    margin: " 0 auto",
    gap: "7px",
    flexDirection: "row",
    marginBottom: "0 !important",
    display: "flex",
    paddingLeft: "0",
    listStyle: "none",
    [theme.breakpoints.down('md')]: {
      marginRight: '0px !important',
    },
  },
  Headerbtns: {
    background: "#000",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "10px 30px",
    borderRadius: "30px",
    textTransform: "uppercase",
    marginRight: "10px",
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  loginBtn: {
    background: "#e01212",
    color: "#fff",
    marginRight: "0",
  },
  appBar: {
    minHeight: "58px!important",
    background: "#990000",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  mobLinksList: {
    padding: "0!important",
    margin: "0!important",
  },
  mobLinks: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "8px 0",
    display: "block",
    marginTop: "4px",
    marginBottom: "4px",
    paddingLeft: "16px",
    paddingRight: "16px",
    fontSize: "1rem",
    color: "#fff",
    textAlign: "center",

  },
  drawer: {
    background: "#000",
    width: "100%",
    color: "#fff",
  },
  menuItemsMobile: {
    textAlign: "center",
  },
  closeMenu: {
    color: "#fff",
    fontSize: "45px",
    float: "right",
    padding: "0",
    paddingRight: "21px",
    '& svg': {
      fontSize: "34px",
    }
  }

}));
export default Header;