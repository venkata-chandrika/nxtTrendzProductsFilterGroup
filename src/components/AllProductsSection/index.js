import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// import {underline} from 'colorette'
import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]
const consonants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}
class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: consonants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    ratingId: '',
    categoryId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: consonants.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, ratingId, searchInput, categoryId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&title_search=${searchInput}&rating=${ratingId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: consonants.success,
      })
    } else {
      this.setState({
        apiStatus: consonants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const listLength = productsList.length

    // TODO: Add No Products View

    return listLength !== 0 ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          alt="no products"
          className="no-product-img"
        />
        <h1>No Products Found</h1>s
        <p>We could not find any products. Try other filters.</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  enterInput = () => {
    this.getProducts()
  }

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  changeCategoryId = categoryId => {
    this.setState({categoryId}, this.getProducts)
  }

  changeRatingId = ratingId => {
    this.setState({ratingId}, this.getProducts)
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        ratingId: '',
        categoryId: '',
      },
      this.getProducts,
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case consonants.success:
        return this.renderProductsList()
      case consonants.loading:
        return this.renderLoader()
      case consonants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, ratingId, categoryId} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}

        <FiltersGroup
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          searchInput={searchInput}
          ratingId={ratingId}
          categoryId={categoryId}
          enterInput={this.enterInput}
          enterSearchInput={this.enterSearchInput}
          changeSearchInput={this.changeSearchInput}
          changeCategoryId={this.changeCategoryId}
          changeRatingId={this.changeRatingId}
          clearFilters={this.clearFilters}
        />

        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
