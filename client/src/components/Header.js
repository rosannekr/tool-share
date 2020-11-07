import React from 'react';
import Filter from "./Filter";
import SearchBar from "./SearchBar";

export default function Header(props) {
    return (
        
        <div className="container">
        <SearchBar callback={(products) =>props.callback(products)} />
        <Filter callback={(products) =>props.callback(products)}/>
        </div>
    )
}
