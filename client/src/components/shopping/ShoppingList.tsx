import { ShoppingItemType } from "../../types/ShoppingItemType";
import ShoppingItem from "./ShoppingItem";

function ShoppingList(props: { items: ShoppingItemType[] | null }) {
  if (!props.items) {
    return <div></div>;
  }

  return (
    <div>
      {props.items.map((item: ShoppingItemType) => (
        <ShoppingItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ShoppingList;
