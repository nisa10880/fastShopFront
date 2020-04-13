import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import { Divider, makeStyles } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "../../Components/Modal/Modal";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 16,
    minWidth: 300,
    maxWidth: 300,
    textAlign: "center"
  },
  header: {
    textAlign: "center"
  },

  button: {
    margin: theme.spacing(1)
  },
  action: {
    display: "flex",
    justifyContent: "space-around"
  }
}));

const ProductCard = props => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={props.picture}
        title="Contemplative Reptile"
      />
      <CardHeader title={props.name} className={classes.header} />
      <Divider variant="middle" />
      <CardContent>
        <div>
          <Typography align="left">{props.description}</Typography>
        </div>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.action}>
        <Typography variant="h5" align="center">
          {props.price}€
          {props.measure_type === "piece" ? null : "/" + props.measure_type}
        </Typography>
        <Modal
          quantity={props.quantity}
          onQuantityChange={props.onQuantityChange}
          onSubmit={props.onSubmit}
          picture={props.picture}
          name={props.name}
          price={props.price}
          description={props.description}
          measure_type={props.measure_type}
        >
          {" "}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            AJOUTER AU PANIER
          </Button>
        </Modal>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
