import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Products from './pages/Products/index'
import NewProduct from './pages/NewProduct/index'
import ProductDetail from './pages/ProductDetail/index'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Products} />
                <Route path='/newProduct' component={NewProduct} />
                <Route path='/productDetail/:productId' component={ProductDetail} />
            </Switch>
        </BrowserRouter>

    )
}