import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../graphql/queries";

export const useShoppingList = () => {
  const { error, data, loading } = useQuery(GET_ITEMS);

  return {
    error,
    data,
    loading,
  };
};
