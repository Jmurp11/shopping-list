import { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  IconButton,
  Divider,
  TextField,
  TextFieldProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import classes from "./MutateItemForm.module.css";
import { ShoppingItemType } from "../types/ShoppingItemType";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const quantities = Array.from(Array(10).keys()).map((i) => i + 1);

// TODO: possible refactor => add form validation, disable submit while errors are being thrown
function MutateItemForm(props: {
  edit: boolean;
  itemToEdit?: ShoppingItemType;
  handleClose: () => void;
  handleSubmit: (item: ShoppingItemType) => void;
}) {
  const [quantity, setQuantity] = useState<string[]>([]);

  const itemNameInput = useRef<TextFieldProps>();
  const descriptionInput = useRef<TextFieldProps>();
  const quantityInput = useRef<SelectProps>();

  function handleChange(event: SelectChangeEvent<typeof quantity>) {
    const {
      target: { value },
    } = event;

    setQuantity(typeof value === "string" ? value.split(",") : value);
  }

  function setTitle() {
    return props.edit ? "Edit Item" : "Add Item";
  }

  function setMessage() {
    return props.edit ? "Edit your item below" : "Add your item below";
  }

  function getString(str: unknown): string {
    let toStr = "";

    if (typeof str === "string") {
      toStr = str;
    }

    if (Array.isArray(str)) {
      toStr = str.toString();
    }
    return toStr;
  }

  function handleSubmit(_event: any) {
    _event.preventDefault();

    const item: ShoppingItemType = {
      itemName: itemNameInput.current?.value
        ? getString(itemNameInput.current?.value)
        : "",
      description: descriptionInput.current?.value
        ? getString(descriptionInput.current?.value)
        : "",
      quantity: quantityInput.current?.value
        ? getString(quantityInput.current?.value)
        : "",
    };

    props.handleSubmit(item);
  }

  useEffect(() => {
    const quantDef = props.itemToEdit?.quantity ?? "1";
    setQuantity([quantDef]);
  }, [props.itemToEdit?.quantity, quantity]);

  return (
    <Box sx={style}>
      <Stack direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" color="inherited">
            SHOPPING LIST
          </Typography>
          <IconButton aria-label="close" onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider />

        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="flext-start"
          className={classes.actionLabel}
        >
          <Typography variant="h6" color="inherited">
            {setTitle()}
          </Typography>
          <Typography variant="subtitle1" color="inherited">
            {setMessage()}
          </Typography>
        </Stack>
        <FormControl sx={{ m: 1, width: 400 }}>
          <TextField
            id="item-name"
            label="Item Name"
            variant="outlined"
            type="text"
            required
            inputRef={itemNameInput}
            defaultValue={props.itemToEdit?.itemName}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 400 }}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            type="text"
            required
            inputRef={descriptionInput}
            defaultValue={props.itemToEdit?.description}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="how-many">How Many?</InputLabel>
          <Select
            labelId="how-many"
            id="how-many-select"
            multiple
            value={quantity}
            onChange={handleChange}
            input={<OutlinedInput label="Quantity" />}
            MenuProps={MenuProps}
            required
            inputRef={quantityInput}
          >
            {quantities.map((q) => (
              <MenuItem key={q} value={q}>
                {q}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Button>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {setTitle()}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MutateItemForm;
