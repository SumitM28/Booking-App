import { faArrowCircleLeft, faArrowCircleRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Hotel.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import MailList from '../../components/mailList/MailList'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
const Hotel = () => {

  const location = useLocation();
  const path = location.pathname.split('/')[2]
  // console.log(path)

  const [slideNumber, setSlideNumber] = useState(0);
  const [slider, setSlider] = useState(false);
  const [data, setData] = useState([]);
  const [laoding, setLoading] = useState(true)
  let {dates, options}=useContext(SearchContext)
  // console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, data2) {
    const timeDiff = Math.abs(data2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let days=dayDifference(dates[0].endDate, dates[0].startDate)
  useEffect(() => {
    fetch(`/hotels/find/${path}`)
      .then(res => res.json())
      .then(res => setData(res))
    setLoading(false)
  

  }, [path,dates])
  
  console.log(days)
  // console.log(data)
  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];


  const handleSlider = (i) => {
    setSlideNumber(i);
    setSlider(true);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {laoding ? ('loading') : <>

        <div className="hotelContainer">

          {slider && <div className="slider">

            <FontAwesomeIcon icon={faArrowCircleLeft} className='sliderIcons' onClick={(slideNumber > 0) ? () => setSlideNumber(slideNumber - 1) : () => setSlideNumber(photos.length - 1)} />
            <FontAwesomeIcon icon={faCircleXmark} className='sliderIcons closebtn' onClick={() => setSlider(false)} />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className='sliderImg' />
            </div>
            <FontAwesomeIcon icon={faArrowCircleRight} className='sliderIcons' onClick={(slideNumber < photos.length - 1) ? () => setSlideNumber(slideNumber + 1) : () => setSlideNumber(0)} />
          </div>}
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>

            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>

            <span className="hotelDistance">
              Excellent location - {data.distance} from center
            </span>
            <span className="hotelPriceHignlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airpot taxi
            </span>
            <div className="hotelImage">
              {photos.map((photo, i) =>
                <div className="hotelImgWrapper">
                  <img src={photo.src} alt="" className='hotelImg' onClick={() => handleSlider(i)} />
                </div>
              )}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrices">
                <h1>Perfect for a 9-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice* options.room}</b> ({days} nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      </>}
    </div>
  )
}

export default Hotel