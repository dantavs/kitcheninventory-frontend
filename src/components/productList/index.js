import React from 'react'

import './styles.css'

import ProductCard from '../productCard'

export default function ProductList(data){
    const productList = data.products
    const search = data.search

    return (
        <div>
            <ul className='productList' >
                {productList
                    .filter(product => {
                        return product.name.toLowerCase().includes(search)
                    })
                    .map(product => (
                        <li id={product.id} key={product.id} >
                            <ProductCard product={product} />
                        </li>
                    ))
                } 
            </ul>
        </div>
    )
}