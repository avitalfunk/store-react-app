import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import type { Product } from "../models/models";

type Props = {
    navigate: (path: string) => void;
};

export default function ProductDetails({ navigate }: Props) {
    const ctx = useContext(ProductsContext);
    if (!ctx) throw new Error("ProductDetails must be used inside ProductsManager");

    const { state, dispatch } = ctx;

    const [product, setProduct] = useState<Product>(state.selectedProduct!);

    useEffect(() => {
        if (state.selectedProduct) {
            setProduct(state.selectedProduct);
        }
    }, [state.selectedProduct]);

    const handleChange = (field: keyof Product, value: string | number) => {
        setProduct(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result as string;
                setProduct(prev => ({ ...prev, image: base64Image }));

                dispatch({
                    type: "UPLOAD_IMAGE",
                    payload: { id: product.id, image: base64Image }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (product.name.trim() === "" || product.price <= 0) return;
        dispatch({ type: "SAVE", payload: product });
        navigate("/products");
    };

    const handleCancel = () => {
        dispatch({ type: "EDIT", payload: null });
        navigate("/products");
    };

    const isNewProduct = !state.products.find(p => p.id === product.id);

    const isSaveDisabled = product.name.trim() === "" || product.price <= 0;

    return (
        <div className="product-form">
            <h3>{isNewProduct ? "New Product" : "Edit Product"}</h3>
            {isNewProduct ? (
                <div className="image-upload-wrapper">
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden-file-input"
                    />
                    <label htmlFor="imageUpload" className="image-upload-box">
                        {product.image ? (
                            <img src={product.image} alt="preview" className="image-preview" />
                        ) : (
                            <span className="camera-icon">📷</span>
                        )}
                    </label>
                </div>
            ) : (
                product.image && (
                    <div style={{ textAlign: "center", marginBottom: "15px" }}>
                        <img
                            src={product.image}
                            alt="Product"
                            style={{
                                maxWidth: "200px",
                                height: "auto",
                                borderRadius: "10px",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                            }}
                        />
                    </div>
                )
            )}

            <div>
                <label>Name</label>
                <input
                    value={product.name}
                    onChange={e => handleChange("name", e.target.value)}
                    maxLength={30}
                />
            </div>

            <div>
                <label>Description</label>
                <textarea
                    value={product.description}
                    onChange={e => handleChange("description", e.target.value)}
                    maxLength={200}
                />
            </div>

            <div>
                <label>Price ($)</label>
                <input
                    type="number"
                    value={product.price}
                    onChange={e =>
                        handleChange("price", parseFloat(e.target.value) || 0)
                    }
                />
            </div>

            <div className="form-buttons">
                <button
                    className="save-btn"
                    onClick={handleSave}
                    disabled={isSaveDisabled}
                >
                    Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
