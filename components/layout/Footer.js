import Link from "components/Link";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography } from "@material-ui/core";

import { routes } from "data/routes";
//import Social from "components/Social";

const useStyles = makeStyles((theme) => ({
 
}));

const Footer = () => {
  const classes = useStyles();
  const path = routes;
  const router = useRouter();
  return (
    <footer className={classes.footerx}>
      
    </footer>
  );
};

export default Footer;
