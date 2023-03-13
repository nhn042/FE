import React from 'react'
import "./Definitions.css"
const Definitions = ({word, meanings}) => {
    return (
        <div>
            {meanings && <h3>Description</h3>}

        <div className='description'>
            {
                meanings.map((meaning, index) => (

                        <div>
                            {meaning.idTay.description &&
                            <p className='descrip'>
                                - {meaning.idTay.description}
                            </p>
                            }
                        </div>
                ))

            }
        </div>
        </div>
    )
}

export default Definitions;