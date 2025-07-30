import { useReducer, useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import SortDropdown from "./SortDropdown";
import { productsReducer } from "./Reducers/productsReducer";
import { ProductsContext } from "../context/ProductsContext";
import { initialState } from "../types/type";

export default function ProductsManager() {
    const [state, dispatch] = useReducer(productsReducer, initialState);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    useEffect(() => {
        const savedProducts = localStorage.getItem("products");
        if (savedProducts) {
            dispatch({ type: "LOAD", payload: JSON.parse(savedProducts) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(state.products));
    }, [state.products]);

    const { id } = useParams();
    useEffect(() => {
        if (id) {
            const productToEdit = state.products.find(p => p.id === Number(id));
            if (productToEdit) {
                dispatch({ type: "EDIT", payload: productToEdit });
            }
        }
    }, [id, state.products]);

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <ProductsContext.Provider value={contextValue}>
            <div className="container">
                <div className="sidebar">
                    <h2>My Store</h2>

                    <div style={{ marginBottom: "10px" }}>
                        <button
                            className="add-btn"
                            onClick={() => {
                                dispatch({ type: "ADD" });
                                navigate("/products");
                            }}
                        >
                            + Add
                        </button>

                        <SortDropdown />
                    </div>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="search-box"
                    />

                    <ProductList
                        currentPage={currentPage}
                        pageSize={pageSize}
                        searchTerm={searchTerm}
                        navigate={navigate}
                    />

                    <div className="paging-controls">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of{" "}
                            {Math.max(1, Math.ceil(state.products.length / pageSize))}
                        </span>
                        <button
                            onClick={() =>
                                setCurrentPage(p =>
                                    Math.min(Math.ceil(state.products.length / pageSize), p + 1)
                                )
                            }
                            disabled={currentPage === Math.ceil(state.products.length / pageSize)}
                        >
                            Next
                        </button>
                    </div>
                </div>

                <div className="details">
                    {state.selectedProduct && <ProductDetails navigate={navigate} />}
                </div>
            </div>
        </ProductsContext.Provider>
    );
}
