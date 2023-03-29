import React, { Fragment, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import { addItemToCart } from '../../actions/cartActions'


const ProductDetails = () => {

    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch();
    const params = useParams()

    const { product } = useSelector(state => state.productDetails)

    useEffect(() => {

        dispatch(getProductDetails(params._id))

    }, [dispatch, params._id])

    const addToCart = () => {
        dispatch(addItemToCart(params._id, quantity));
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if(count.valueAsNumber >= product.stock) return

        const qty = count.valueAsNumber +1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if(count.valueAsNumber <= 1) return

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)
    }

    return (
        <Fragment>
            <div className="row f-flex justify-content-around">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    {product.images && product.images.map(image => (
                        <img className="d-block w-100" src={image.url} />
                    ))}
                </div>

                <div className="col-12 col-lg-5 mt-5">
                    <h3>{product.name}</h3>
                    <p id="product_id">Product # {product._id}</p>

                    <hr />

                    <p id="product_price">Rs {product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                        <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                    </div>
                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={ product.stock === 0 } onClick={addToCart}>Add to Cart</button>

                    <hr />

                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr />

                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                </div>
            </div>

        </Fragment>
    )

}


export default ProductDetails