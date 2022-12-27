import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDay, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';             // to format date
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
const Header = (type) => {

    const [destination, setDestination] = useState("");

    const [openDate, setOpenDate] = useState(false)            // using for open/close calender
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false);     // using for open/close Options for adult,childrens.room
    const [options, setOptions] = useState(
        {
            adult: 1,
            children: 0,
            room: 1
        }
    )

    const { dispatch } = useContext(SearchContext)

    const handleOption = (name, operation) => {
        
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === 'i' ? options[name] + 1 : options[name] > 0 ? options[name] - 1 : 0
            }
        })
    }

    const navigate = useNavigate();

    function handleSearch() {

        navigate('/hotels', { state: { destination, dates, options } });


    }

    type = type.type;


    return (
        <div className='header'>
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerLists">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attraction</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airpot texis</span>
                    </div>
                </div>
                {type !== "list" &&

                    <>
                        <h1 className="headerTitle">A lifetime of discount? it's Genius</h1>
                        <p className="headerDescription">Get rewarded for your travel - unlock your instant saving of 10% or more with a free Sumitbooking account</p>
                        <button className="headerBtn">Register / Signin</button>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className="headerSearchIcon" />
                                <input type="text" placeholder='Where are you going?' className="headerSearchInput" onChange={event => setDestination(event.target.value)} />

                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDay} className="headerSearchIcon" />
                                <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, 'dd/MM/yyyy')}`}</span>
                                {openDate ? <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    minDate={new Date()}
                                    className='date'
                                /> : null}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerSearchIcon" />
                                <span className="headerSearchText" onClick={() => setOpenOptions(!openOptions)}>{`${options.adult} adults, ${options.children} childrens, ${options.room} room`}</span>

                                {openOptions ? <div className="options">
                                    <div className="optionsItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterBtn" onClick={() => handleOption('adult', 'd')}>-</button>
                                            <span className="optionCounterNumber">{options.adult}</span>
                                            <button className="optionCounterBtn" onClick={() => handleOption('adult', 'i')}>+</button>
                                        </div>

                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterBtn" onClick={() => handleOption('children', 'd')}>-</button>
                                            <span className="optionCounterNumber">{options.children}</span>
                                            <button className="optionCounterBtn" onClick={() => handleOption('children', 'i')}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionsItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterBtn" onClick={() => handleOption('room', 'd')}>-</button>
                                            <span className="optionCounterNumber">{options.room}</span>
                                            <button className="optionCounterBtn" onClick={() => handleOption('room', 'i')}>+</button>
                                        </div>
                                    </div>
                                </div> : null}

                            </div>
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }


            </div>
        </div>
    )
}

export default Header