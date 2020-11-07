import React from 'react'

export default function ProductGrid(props) {
    return (
        <div>
        <ul>
        {props.products && props.products.map(item => <li key={item.id}><h3>{item.name}</h3><p>{item.description}</p></li>) }
        </ul>
    </div>
    )
}
