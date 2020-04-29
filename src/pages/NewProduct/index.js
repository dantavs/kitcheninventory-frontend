import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'

export default function NewProduct() {
    const history = useHistory()

    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [quantity, setQuantity] = useState()
    const [expirationDate, setExpirationDate] = useState()

    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get('categories').then(response => {
            setCategories(response.data)
        })
    }, [])

    async function handleAddProduct (e){
        e.preventDefault()

        const product = {
            name,
            quantity,
            category,
            expirationDate
        }

        console.log({product})

        try {
            await api.post('products', product)

            history.push('/')   
        } catch(err) {
            alert('Error on add product, try again')
        }
    }

    return (
        <div className='containerNewProduct'>
            <div className="headerNewProduct">
                <center>
                    <img src={logoImg} alt='Kitchen Inventory' />
                    <h2>New Product</h2>
                </center>
            </div>

            <form onSubmit={handleAddProduct} className="addProduct">
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
                />
                <select 
                    name="categories" 
                    className="productProp"
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="0" selected disabled hidden>Choose Category</option>

                    {categories
                        .map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>                        ))
                    }
                </select>
                <button className='button'>Add Product</button>
            </form>
            <p className='backLink'><Link className='backLink' to='/'><FiArrowLeft />back</Link></p>
        </div>
    )
}