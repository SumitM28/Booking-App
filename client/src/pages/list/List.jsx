import './List.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import { useEffect } from 'react'

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  // console.log(options)

  const [dateOption, setDateOption] = useState(false)

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1500);


  
  useEffect(() => {
    fetch(`/hotels?city=${destination}&min=${min}&max=${max}`)
      .then(res => res.json())
      .then(res => setData(res))

    setLoading(false)
  }, [destination, min, max,])




  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listSearchTitle">Search</h1>
            <div className="listSearchItem">
              <label htmlFor="">Destination</label>
              <input type="text" placeholder={destination} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="listSearchItem">
              <label htmlFor="">Check-in-date</label>
              <span onClick={() => setDateOption(!dateOption)} >{`${format(dates[0].startDate, 'dd/mm/yyyy')} to ${format(dates[0].endDate, 'dd/mm/yyyy')}`}</span>

              {dateOption && <DateRange
                onChange={dates => setDates([dates.selection])}
                minDate={new Date()}
                ranges={dates}
              />}

            </div>
            <div className="listSearchItem">
              <label htmlFor="">Options</label>
              <div className='listSearchOption'>

                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Min price <small>per night</small></span>
                  <input type="number" className="listSearchOptionInput" onChange={(e) => setMin(e.target.value)} />
                </div>
                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Max price <small>per night</small></span>
                  <input type="number" className="listSearchOptionInput" onChange={(e) => setMax(e.target.value)} />
                </div>
                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Adult</span>
                  <input type="number" className="listSearchOptionInput" min={1} placeholder={options.adult} />
                </div>
                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Children</span>
                  <input type="number" className="listSearchOptionInput" min={0} placeholder={options.children} />
                </div>
                <div className="listSearchOptionItem">
                  <span className='listSearchOptionText'>Room</span>
                  <input type="number" className="listSearchOptionInput" min={1} placeholder={options.room} />
                </div>
              </div>


            </div>
            <button >Search</button>
          </div>

          <div className="listResults">
            {loading ? ("laoding") : <>
              {data.map(item => (

                <SearchItem data={item} key={item._id} />

              ))}
            </>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default List