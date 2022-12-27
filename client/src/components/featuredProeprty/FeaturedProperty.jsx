import { useEffect } from 'react';
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './FeaturedProperty.css'

const FeaturedProperty = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {

        fetch('/hotels?feature=true&limit=4')
            .then(res => res.json())
            .then(data => setData(data))

        setLoading(false);
    }, [])


    return (
        <div className='fp'>
            {loading ?
                ("Loading") :
                <>
                    {data.map((item, i) => (
                        <div className="fpItem" key={item._id}>
                            <img src={item.photos[0]} alt="" className="fpImg" />
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                            <div className="fpRating">
                                {
                                    item.rating && <>
                                        <button>{item.rating}</button>
                                        <span>Excellent</span>
                                    </>
                                }
                            </div>
                        </div>
                    ))}
                </>
            }


        </div>
    )
}

export default FeaturedProperty