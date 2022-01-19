import React from 'react'

const Product = ({ item }) => {
    return (
        <div style={{ display: "flex", height: "140px",marginBottom:"20px", width: "80%", border: "1px solid lightgray" }}>
            <div style={{ flex: 1 }}>
                <img src={`${item.image}`} height="140px" width="140px" />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div>{item.name}</div>
                <div>{item.price}</div>
            </div>
        </div>
    )
}

export default Product

