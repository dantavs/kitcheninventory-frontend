import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

function handleDelete(){
    alert('Delete')
}

function handleDetail(){
    alert('Detail')
}

export default function ProductCard(data) {
    const product = data.product
    const history = useHistory()
    const [hidden, setHidden] = useState();

    function handleProductDetail(productId){
        history.push(`productDetail/${productId}`)
    }

    async function handleDelete(id) {
        try {
            await api.delete(`products/${id}`)

           // setProducts(products.filter(product => product.id != id))
        } catch(err){
            alert('Delete failed. Please, try again.')
        }

    }

    return (
        <div className={`container box: ${hidden ? "hidden" : "" }`}>
            <div className='productCard' onClick={() => {handleProductDetail(product.id)}} >
                <strong>{product.name}</strong>
                <span className='category'>{product.category}</span>
                <span>Qty.: {product.quantity}</span>
                <span>Expiration Date: {product.expirationDate}</span>
            </div>
            <div onClick={() => {handleDelete(product.id); setHidden(true)}} className='productDelete' >
                <FiTrash2 />
            </div>
        </div>
    )
}