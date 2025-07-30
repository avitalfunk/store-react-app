export type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    date: string;
    image?: string;
};

export type ProductsState = {
    products: Product[];
    sortBy: "name" | "date";
    selectedProduct: Product | null;
};

export type ProductsAction =
    | { type: "ADD" }
    | { type: "EDIT"; payload: Product | null }
    | { type: "SAVE"; payload: Product }
    | { type: "DELETE"; payload: number }
    | { type: "SORT"; payload: "name" | "date" }
    | { type: "LOAD"; payload: Product[] }
    | { type: "UPLOAD_IMAGE"; payload: { id: number; image: string } };