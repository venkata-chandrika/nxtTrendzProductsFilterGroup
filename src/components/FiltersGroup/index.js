import './index.css'

const FiltersGroup = props => {
  const {
    categoryOptions,
    ratingsList,
    searchInput,
    enterSearchInput,
    changeSearchInput,
    changeCategoryId,
    changeRatingId,
    ratingId,
    categoryId,
    clearFilters,
  } = props

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  const onEnterKey = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  return (
    <div className="filters-group-container">
      <input
        type="search"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterKey}
        value={searchInput}
      />
      {/* Replace this element with your code */}

      <h1 className="category">Category</h1>
      <ul className="list-container">
        {categoryOptions.map(each => {
          const onClickCategory = () => {
            changeCategoryId(each.categoryId)
          }
          const className =
            categoryId === each.categoryId ? 'cat active' : 'cat'
          return (
            <li key={each.categoryId} className="item-container">
              <p className={className} onClick={onClickCategory}>
                {each.name}
              </p>
            </li>
          )
        })}
      </ul>
      <h1 className="category">Ratings</h1>
      <ul className="list-container">
        {ratingsList.map(each => {
          const onChangeRatingId = () => {
            changeRatingId(each.ratingId)
          }
          const ratingClassName =
            ratingId === each.ratingId ? 'up active' : 'up'

          return (
            <li
              key={each.ratingId}
              onClick={onChangeRatingId}
              className="rating-item"
            >
              <img
                src={each.imageUrl}
                alt={`rating ${each.ratingId}`}
                className="rating-img"
              />
              <p className={ratingClassName}>&up</p>
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}
export default FiltersGroup
