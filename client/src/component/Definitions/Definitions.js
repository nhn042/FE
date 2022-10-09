import React from 'react'
import "./Definitions.css"
const Definitions = ({word, meanings}) => {
    return (
        <ul>
            {
                meanings.map((meanings, index) => (
                    <li key={index} className='contain'>
                    <div>
                        <h3>Description</h3>
                                <p>
                                    {meanings.description}
                                </p>
                    </div>
                </li>
                ))
            }
        </ul>
    )
}

export default Definitions;