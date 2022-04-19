import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Stack,
  Checkbox,
  Typography,
  IconButton,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import classes from "./ShoppingItem.module.css";
import { ShoppingItemType } from "../../types/ShoppingItemType";
import MutateItemForm from "../MutateItemForm";
import { EDIT_ITEM, DELETE_ITEM } from "../../graphql/mutations";
import { GET_ITEMS } from "../../graphql/queries";

function ShoppingItem(props: { item: ShoppingItemType }) {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editItem] = useMutation(EDIT_ITEM);
  const [deleteItem] = useMutation(DELETE_ITEM);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const handleChange = () => setCompleted(!completed);
  function onEditItem(item: ShoppingItemType) {
    editItem({
      variables: {
        editItemId: props.item.id,
        ...item,
        quantity: parseInt(item.quantity, 10),
      },
      refetchQueries: [GET_ITEMS],
    });

    handleClose();
  }

  function onDeleteItem() {
    deleteItem({
      variables: {
        deleteItemId: props.item.id,
      },
      refetchQueries: [GET_ITEMS],
    });

    handleClose();
  }

  return (
    <div className={classes.cardPadding}>
      <Card
        className={classes.padding}
        style={{ backgroundColor: completed ? "lightgray" : "white" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            className={classes.margin}
          >
            <Checkbox onChange={handleChange}></Checkbox>

            <Stack direction="column">
              <Typography
                variant="h6"
                color="inherit"
                noWrap
                style={{
                  textDecoration: completed ? "line-through" : "none",
                  color: completed ? "#1976d2" : "black",
                }}
              >
                {props.item.itemName}
              </Typography>

              <Typography
                variant="subtitle1"
                color="inherit"
                noWrap
                style={{
                  textDecoration: completed ? "line-through" : "none",
                  color: completed ? "gray" : "black",
                }}
              >
                {props.item.description} x{props.item.quantity}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={2} className={classes.marginRight}>
            <IconButton aria-label="edit" onClick={handleOpen}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleOpenConfirm}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <div>
          <MutateItemForm
            edit={true}
            handleClose={handleClose}
            handleSubmit={onEditItem}
            itemToEdit={props.item}
          />
        </div>
      </Modal>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button
            onClick={onDeleteItem}
            autoFocus
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShoppingItem;

// TODO: Populate edit item with current vals
