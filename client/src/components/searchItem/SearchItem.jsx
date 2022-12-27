import { Link} from 'react-router-dom'
import './SearchItem.css'

const SearchItem = (item) => {
  const data = item.data
  console.log(data)

  return (
    <div className='searchItem'>
      <img src={data.photos[0]} alt="" className="searchItem-img" />

      <div className="searchItem-Desc">
        <h1 className="searchItemTitle">{data.name}</h1>
        <span className="searchItemDistance">{data.distance} from center</span>
        <span className="searchItemTaxiOp">Free airport taxi</span>
        <span className="searchItemSubtitle">Studio Apartment with Air conditioning</span>
        <span className="searchItemFeatures">
          {data.description}
        </span>
        <span className="searchItemCancelOp">Free cancellation</span>
        <span className="searchItemCancelSubtitle">You can cancel later, son lock in this great price today!</span>
      </div>

      <div className="searchItemDetails">
        {data.rating && <>

          <div className="searchItemRating">
            <span>Exellent</span>
            <span className='rating'>{data.rating}</span>
          </div>
        </>}

        <div className='priceContainer'>
          <span className="searchItemPrice">${data.cheapestPrice}</span>
          <span className="searchItemPriceTaxes">Includes taxes and fees</span>
          <Link to={`/hotel/${data._id}`}>
            <button className="searchItemButton" >See Availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchItem