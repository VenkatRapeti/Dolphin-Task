import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";


const Main = () => {
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState("asce");
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get("https://60ff90a3bca46600171cf36d.mockapi.io/api/products");
                setProducts(response.data);
            } catch (err) { console.log(err) }
        }
        getProducts();
    }, [])

    const handleInputChange = (event) => {
        setInput(event.target.value)
        setSuggestions(products.filter(item =>
            item.name.toLowerCase().includes(input.toLowerCase())))
    }

    const handleSuggestions = () => {
        if (suggestions.length === 0 && input === undefined) {
            return null;
        }
        if (suggestions.length > 0 && input === '') {
            return null;
        }
        if (suggestions.length === 0 && input) {
            return <ul style={{ margin: "5px 0px" }}>
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul>
                {
                    suggestions.map((item, index) =>
                    (<li key={index}
                    >{`${item.name}  -  ${item.price}   -  ${item.category}`}</li>))
                }
            </ul>
        )
    }

    useEffect(() => {
        if (sort === "asce") {
            setProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price))
        } else {
            setProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price))
        }

    }, [sort])


    return (
        <div style={{ padding: 50 }}>
            <h1>Dolphin Task</h1>
            <div style={{ marginBottom: "50px", display: "flex" }}>
                <div>
                    <input type="text" placeholder="search by product name"
                        onChange={(e) => handleInputChange(e)}
                        style={{ padding: "10px", width: "400px" }} />
                    {handleSuggestions()}
                </div>
                <select onChange={(e) => setSort(e.target.value)}
                 style={{ height: "40px", margin: "0px 50px", padding: "10px" }}>
                    <option value="asce" selected>Price Low to High</option>
                    <option value="desc">Price High to Low</option>
                </select>
            </div>
            {
                products && products.map((item) => (
                    <Product item={item} key={item._id} />
                ))
            }
        </div>
    )
}

export default Main
