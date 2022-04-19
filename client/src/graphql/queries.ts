import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query getShoppingList {
    getShoppingList {
      success {
        message
        data {
          id
          itemName
          description
          quantity
        }
      }
      error
    }
  }
`;
