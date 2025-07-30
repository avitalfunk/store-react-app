import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function SortDropdown() {
    const ctx = useContext(ProductsContext);
    if (!ctx) throw new Error("SortDropdown must be used inside ProductsManager");

    const { state, dispatch } = ctx;

    return (
        <select
            value={state.sortBy}
            onChange={e => dispatch({ type: "SORT", payload: e.target.value as "name" | "date" })}
        >
            <option value="name">Sort by Name</option>
            <option value="date">Recently Added</option>
        </select>
    );
}
