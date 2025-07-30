import { createContext } from "react";
import type { ProductsAction, ProductsState } from "../models/models";

export type ProductsContextType = {
    state: ProductsState;
    dispatch: React.Dispatch<ProductsAction>;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);
