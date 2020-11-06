import React from 'react'

export default function Search(props) {
    return (
        <div>
            {props.match.params.search}
        </div>
    )
}

