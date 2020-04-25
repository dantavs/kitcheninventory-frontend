import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import './styles.css'
import api from '../../services/api'

import ProductList from '../../components/productList'


export default function Products() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState([])

    useEffect(() =>{
        api.get('products').then(response => {
            setProducts(response.data)
            console.log(response.data)
        })
    }, [])

    function handleInput(e) {
        e.preventDefault()
        setSearch(e.target.value.toLowerCase())
    }

    return (
        <div className='products-container'>
            <h2>Products List</h2>

            <div className="products-header">
                <input 
                    type="text" 
                    className="buscaProduct" 
                    placeholder='Search for a product' 
                    onChange={handleInput}
                />
                <Link to='newProduct' className='button' >Add Product</Link>
            </div>
           

                <ProductList products={products} search={search} />

            
        </div>
    )
}