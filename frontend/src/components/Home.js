import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'

import Product from './product/Product'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProducts } from '../actions/productActions'

const Home = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState('')

  const categories = [
    'Electronics',
    'Watches',
    'Mobiles',
    'Laptops'
  ]

  const dispatch = useDispatch();
  const alert = useAlert();

  const { products, error, resPerPage } = useSelector(state => state.products)


  useEffect(() => {

    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(currentPage, category));

  }, [dispatch, alert, currentPage, category, error])

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }

  return (
    <Fragment>

      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5 mb-3">
        <div className="mt-5">
          <h4 className="mb-3">
            Categories
          </h4>

          <ul className="pl-0">
            {categories.map(category => (
              <li
                style={{
                  cursor: 'pointer',
                  listStyleType: 'none',
                  color: 'blueviolet'
                }}
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="row">

          {products && products.map(product => (
            <Product key={product._id} product={product} col={3} />
          ))}

        </div>

      </section>

      <div className="d-flex justify-content-center mt-5">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={16}
          onChange={setCurrentPageNo}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass='page-item'
          linkClass='page-link'
        />
      </div>

    </Fragment>
  )
}

export default Home