import React, { useState, useEffect } from 'react'

import { Link, useParams, useHistory } from 'react-router-dom'


import './styles.css'
import api from '../../services/api'

export default function ProductDetail() {
    const history = useHistory()
   
    const {productId} = useParams()
    
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [quantity, setQuantity] = useState()
    const [expirationDate, setExpirationDate] = useState()
    const [categoryId, setCategoryId] = useState()

    const [categories, setCategories] = useState([])

    useEffect (() => {
        api.get(`productDetail/${productId}`).then(response => { 
            setId(response.data.id)  
            setName(response.data.name)  
            setQuantity(response.data.quantity)  
            setExpirationDate(response.data.expirationDate)  
            setCategoryId(response.data.category_id)  

            console.log (response.data.name)   
        })
    }, [productId])

    useEffect (() => {
        api.get('categories').then(response => {
            setCategories(response.data)
        })
    })

    async function handleUpdateProduct(e) {
        e.preventDefault()

        const product = {
            id,
            name,
            quantity,
            categoryId,
            expirationDate
        }

        try {
            await api.put('products', product)

            history.push('/')
        } catch(err) {
            alert('Update failed, please try again')
        }
    }
    

    return (
        <div className="productDetailContainer">
            <header>
                <h2>Product Detail</h2>
                <Link to="/">back</Link>
            </header>

            <form onSubmit={handleUpdateProduct} className="addProduct">
                <input 
                    type="text" 
                    className="productProp"
                    placeholder='Product Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input 
                    type="text" 
                    className="productProp"
                    placeholder='Quantity'
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                <input 
                    type="date" 
                    className="productProp"
                    placeholder='Expiration Date'
                    value={expirationDate}
                    onChange={e => setExpirationDate(e.target.value)}
                    format="dd-MM-yyyy"
                />
                <select 
                    type="text" 
                    className="productProp"
                    placeholder='Category'
                    onChange={e => setCategoryId(e.target.value)}
                    
                >

                    {categories
                        .map(category => (
                            <option value={category.id} key={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <button className='button'>Update Product</button>
            </form>
        </div>
    )
}