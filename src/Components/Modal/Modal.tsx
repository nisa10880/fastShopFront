import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function Modal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => {
          handleClickOpen();
          if (props.otherAction) {
            props.otherAction();
          }
        }}
      >
        {props.children}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.name}</DialogTitle>
        <img src={props.picture} alt={props.name} style={{ height: 200 }} />
        <DialogContent>
          <DialogContentText>{props.description}</DialogContentText>
          <Box display="flex">
            {props.input}
            <TextField
              autoFocus
              value={props.quantity}
              onChange={props.onQuantityChange}
              margin="dense"
              id="name"
              name="quantity"
              label="Quantité"
              type="number"
            />
            <Typography variant="h5" align="center" style={{ paddingTop: 16 }}>
              {props.measure_type === "piece" ? null : "" + props.measure_type}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          {/*      <Button onClick={handleClose} color="primary">
            Cancel
          </Button> */}
          <Button
            onClick={() => {
              handleClose();
              if (props.onSubmit) {
                props.onSubmit();
              }
            }}
            color="primary"
          >
            AJOUTER AU PANIER
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
