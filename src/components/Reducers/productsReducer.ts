import type { ProductsAction, ProductsState } from "../../models/models";


export function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                selectedProduct: {
                    id: Date.now(),
                    name: "",
                    description: "",
                    price: 0,
                    date: new Date().toISOString(),
                    image: ""
                }
            };

        case "EDIT":
            return { ...state, selectedProduct: action.payload };

        case "SAVE": {
            const exists = state.products.find(p => p.id === action.payload.id);
            return exists
                ? {
                    ...state,
                    products: state.products.map(p =>
                        p.id === action.payload.id ? action.payload : p
                    ),
                    selectedProduct: null
                }
                : {
                    ...state,
                    products: [...state.products, action.payload],
                    selectedProduct: null
                };
        }

        case "DELETE":
            return { ...state, products: state.products.filter(p => p.id !== action.payload) };

        case "SORT":
            const sorted = [...state.products].sort((a, b) => {
                if (action.payload === "name") return a.name.localeCompare(b.name);
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            return { ...state, products: sorted, sortBy: action.payload };
        case "UPLOAD_IMAGE":
            return {
                ...state,
                products: state.products.map(p =>
                    p.id === action.payload.id ? { ...p, image: action.payload.image } : p
                ),
                selectedProduct:
                    state.selectedProduct && state.selectedProduct.id === action.payload.id
                        ? { ...state.selectedProduct, image: action.payload.image }
                        : state.selectedProduct
            };


        case "LOAD":
            return { ...state, products: action.payload };

        default:
            return state;
    }
}