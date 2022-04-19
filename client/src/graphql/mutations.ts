import { gql } from "@apollo/client";

export const ADD_ITEM = gql`
  mutation ($quantity: Float!, $description: String!, $itemName: String!) {
    addItem(
      quantity: $quantity
      description: $description
      itemName: $itemName
    ) {
      success {
        message
      }
      error
    }
  }
`;

export const EDIT_ITEM = gql`
  mutation (
    $quantity: Float!
    $description: String!
    $itemName: String!
    $editItemId: Float!
  ) {
    editItem(
      quantity: $quantity
      description: $description
      itemName: $itemName
      id: $editItemId
    ) {
      success {
        message
        data {
          id
        }
      }
      error
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation ($deleteItemId: Float!) {
    deleteItem(id: $deleteItemId) {
      success {
        data {
          id
        }
        message
      }
      error
    }
  }
`;
