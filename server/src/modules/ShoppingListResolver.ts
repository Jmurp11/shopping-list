import { QueryResponse } from "../types/QueryResponse";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../datasource";
import { ShoppingItem } from "../entity/ShoppingItem.entity";

@Resolver()
export class ShoppingListController {
  @Query(() => QueryResponse)
  async getShoppingList(): Promise<QueryResponse> {
    try {
      const shoppingList = await AppDataSource.manager.find(ShoppingItem);

      return {
        success: {
          message: "Successfully queried shopping list",
          data: shoppingList,
        },
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  }

  @Mutation(() => QueryResponse)
  async addItem(
    @Arg("itemName") itemName: string,
    @Arg("description") description: string,
    @Arg("quantity") quantity: number
  ): Promise<QueryResponse> {
    try {
      let newItem = new ShoppingItem();
      Object.assign(newItem, {
        itemName,
        description,
        quantity,
      });

      const result = await AppDataSource.manager.save(newItem);

      console.log(result);
      return {
        success: {
          message: "Successfully added item!",
        },
      };
    } catch (err) {
      return {
        error: err,
      };
    }
  }
}
