import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import type { Product } from "../models/models";

type Props = {
    product: Product;
    navigate: (path: string) => void;
};

export default function ProductItem({ product, navigate }: Props) {
    const ctx = useContext(ProductsContext);
    if (!ctx) throw new Error("ProductItem must be used inside ProductsManager");

    const { dispatch } = ctx;

    const handleSelect = () => {
        dispatch({ type: "EDIT", payload: product });
        navigate(`/products/${product.id}`);
    };

    return (
        <div
            className="product-card"
            onClick={handleSelect}
            style={{ cursor: "pointer" }}
        >
            {product.image && (
                <img src={product.image} alt={product.name} className="product-image" />
            )}

            <div className="product-info">
                <h3>{product.name}</h3>
                {product.description && <p>{product.description}</p>}
            </div>

            <div className="product-actions">
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: "DELETE", payload: product.id });
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
