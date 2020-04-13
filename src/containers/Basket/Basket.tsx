import React, { useState, useEffect } from "react";
import {
  Grid,
  withStyles,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MobileStepper,
  Typography,
  Paper,
  Divider,
  Box
} from "@material-ui/core";
import * as action from "./actions";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

export enum UserSexe {
  M = "M",
  F = "F",
  Other = "Other"
}

export enum UserRole {
  user = "user",
  admin = "admin"
}

interface State {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  mail: string;
  imgUrl: string;
  phone_number: number;
  age: number;
  sexe: UserSexe;
  user_type: UserRole;
  activated: boolean;
  about: string;
  activation_code: number;

  showPassword: boolean;

  currentStep: number;
}

const validate = values => {
  const errors: any = {};
  if (values.username.length < 5) {
    errors.username = "Required";
  }
  if (!values.last_name) {
    errors.last_name = "Required";
  }
  if (!values.age) {
    errors.age = "Required";
  }
  if (!values.sexe) {
    errors.sexe = "Required";
  }

  return errors;
};

const Input = withStyles({
  root: {
    margin: 8,
    width: 300,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `100px`
      }
    }
  }
})(TextField);

const Basket = props => {
  const { error, productInBasket }: any = useSelector(state => ({
    error: state.user.error.message,
    productInBasket: state.productListReducer.productInBasket
  }));

  const dispatch = useDispatch();

  let order_amount = 0;
  for (const product of productInBasket) {
    order_amount =
      order_amount + parseInt(product.price) * parseInt(product.quantity);
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      order_date: Date(),
      mail: "",
      phone_number: 0,
      products: [],
      order_amount: 0
    },
    onSubmit: async (values, actions) => {
      try {
        values.products = productInBasket;
        values.order_amount = order_amount;
        await dispatch(action.sendOrder(values));
        setCurrentStep(currentStep + 1);
      } catch {}
    }
  });

  const [currentStep, setCurrentStep] = useState(0);

  const _next = () => {
    setCurrentStep(currentStep + 1);
  };

  const _prev = () => {
    setCurrentStep(currentStep - 1);
  };

  let errorMessage;

  return (
    <Grid
      justify="center"
      direction="column"
      alignItems="center"
      container
      style={{ marginTop: 50 }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ marginBottom: 100, display: "contents" }}
      >
        {currentStep === 0 ? (
          <>
            <Paper style={{ width: "100%", borderRadius: 16 }} elevation={4}>
              {productInBasket.map(product => (
                <>
                  <Box display="flex" m={1}>
                    <img
                      src={product.picture}
                      alt={product.name}
                      style={{ height: 64 }}
                    />
                    <Box p={1} width="100%">
                      <Typography>{product.name}</Typography>
                    </Box>
                    <Box
                      p={1}
                      flexShrink={2}
                      bgcolor="grey.300"
                      borderRadius={16}
                    >
                      <Typography variant="h6">
                        {product.quantity} x{" "}
                      </Typography>
                      <Typography variant="h5"> {product.price}€</Typography>
                    </Box>
                  </Box>
                  <Divider />
                </>
              ))}{" "}
            </Paper>
            <Typography variant="h3"> total {order_amount} €</Typography>
            <Input
              onChange={formik.handleChange}
              value={formik.values.first_name}
              type="text"
              label="first name"
              name="first_name"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.last_name}
              type="text"
              label="last name"
              name="last_name"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              type="text"
              label="mail"
              value={formik.values.mail}
              name="mail"
              variant="outlined"
              required
            />
            <Input
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              type="text"
              label="phone number"
              name="phone_number"
              variant="outlined"
              required
            />
            <TextField
              onChange={formik.handleChange}
              id="datetime-local-begin_at"
              label="Start at"
              type="datetime-local"
              name="order_date"
              value={formik.values.order_date}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              style={{ borderRadius: 100, marginTop: 40 }}
            >
              Commander
            </Button>
          </>
        ) : null}

        {currentStep === 1 ? (
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              style={{ borderRadius: 100, marginTop: 40 }}
            >
              Send
            </Button>
            {errorMessage}
          </>
        ) : null}
      </form>

      <form
        onSubmit={() => null}
        style={{ marginBottom: 100, display: "contents" }}
      >
        {currentStep === 2 ? (
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit-btn"
              style={{ borderRadius: 100, marginTop: 40 }}
            >
              Verify
            </Button>
          </>
        ) : null}
      </form>

      {/*      <MobileStepper
        variant="dots"
        steps={3}
        position="static"
        activeStep={currentStep}
        style={{ position: "fixed", bottom: 80 }}
        nextButton={
          <Button size="small" onClick={_next} disabled={currentStep === 2}>
            Next
            {<KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={_prev} disabled={currentStep === 0}>
            {<KeyboardArrowLeft />}
            Back
          </Button>
        }
      /> */}
    </Grid>
  );
};

export default Basket;
