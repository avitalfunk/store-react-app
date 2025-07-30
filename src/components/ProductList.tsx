import { useContext } from "react";
import ProductItem from "./ProductItem";
import { ProductsContext } from "../context/ProductsContext";

type Props = {
    currentPage: number;
    pageSize: number;
    searchTerm: string;
    navigate: (path: string) => void;
};

export default function ProductList({ currentPage, pageSize, searchTerm, navigate }: Props) {
    const ctx = useContext(ProductsContext);
    if (!ctx) throw new Error("ProductList must be used inside ProductsManager");

    const { state } = ctx;

    const filteredProducts = state.products.filter(
        p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    return (
        <>
            {productsToShow.map(p => (
                <ProductItem key={p.id} product={p} navigate={navigate} />
            ))}
        </>
    );
}
