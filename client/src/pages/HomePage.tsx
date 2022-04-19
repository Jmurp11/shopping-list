import {
  Typography,
  Stack,
  Button,
  Modal,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import MutateItemForm from "../components/MutateItemForm";
import ShoppingList from "../components/shopping/ShoppingList";
import { useShoppingList } from "../hooks/useShoppingItems";
import { ShoppingItemType } from "../types/ShoppingItemType";
import { ADD_ITEM } from "../graphql/mutations";
import { GET_ITEMS } from "../graphql/queries";
import classes from "./HomePage.module.css";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [addItem] = useMutation(ADD_ITEM);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function onAddItem(item: ShoppingItemType) {
    addItem({
      variables: {
        ...item,
        quantity: parseInt(item.quantity, 10),
      },
      refetchQueries: [GET_ITEMS],
    });

    handleClose();
  }

  const { error, data, loading } = useShoppingList();

  if (loading) {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (error || data.error) {
    return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {data.error}
        </Alert>
      </Snackbar>
    );
  }

  if (data.getShoppingList.success.data < 1) {
    return (
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Card className={classes.card}>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Typography variant="subtitle1">
              Your shopping list is empty
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
              Add your first item
            </Button>
            <Modal open={open} onClose={handleClose}>
              <div>
                <MutateItemForm
                  edit={false}
                  handleClose={handleClose}
                  handleSubmit={onAddItem}
                />
              </div>
            </Modal>
          </Stack>
        </Card>
      </Stack>
    );
  }

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" color="inherit" noWrap>
          Your Items
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Item
        </Button>
        <Modal open={open} onClose={handleClose}>
          <div>
            <MutateItemForm
              edit={false}
              handleClose={handleClose}
              handleSubmit={onAddItem}
            />
          </div>
        </Modal>
      </Stack>
      <ShoppingList items={data.getShoppingList.success.data} />
    </div>
  );
}

export default HomePage;
