import type { Product, ProductsState } from "../models/models";

export const initialProducts: Product[] = [
    {
        id: 1,
        name: "Apple",
        description: "Red apple description",
        price: 100,
        date: new Date().toISOString(),
        image: "/img/apple.jpg"
    },
    {
        id: 2,
        name: "Bannana",
        description: "Bannana description",
        price: 120,
        date: new Date().toISOString(),
        image: "/img/banana.jpg"
    },
    {
        id: 3,
        name: "Grapes",
        description: "Green grape description",
        price: 130,
        date: new Date().toISOString(),
        image: "/img/grape.webp"
    },
    {
        id: 4,
        name: "Melon",
        description: "Melon description",
        price: 140,
        date: new Date().toISOString(),
        image: "/img/melon.webp"
    },
    {
        id: 5,
        name: "Watermelon",
        description: "Watermelon description",
        price: 150,
        date: new Date().toISOString(),
        image: "/img/watermelon.jpg"
    },
    {
        id: 6,
        name: "Cherry",
        description: "Cherry description",
        price: 160,
        date: new Date().toISOString(),
        image: "/img/cherry.jpg"
    }
];

export const initialState: ProductsState = {
    products: initialProducts,
    sortBy: "name",
    selectedProduct: null
};