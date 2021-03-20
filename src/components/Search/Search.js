import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FakeData from '../../FakeData/FakeData.json'
import './Search.css';

const Search = () => {
    const { value } = useParams();
    const [toggle, setToggle] = useState(false)
    const [vehicle, setVehicle] = useState({
        price: 0,
        person: ''
    });

    const [info, setInfo] = useState({
        from: '',
        to: '',
        date: '',
        time: ''
    });


    const handleSubmit = (e) => {
        // if (info.from && info.to) {
        const matchData = FakeData.find(data => data.id == value)
        setVehicle(matchData)
        setToggle(true)
        e.preventDefault();
        // } else {
        //     alert("field required")
        // }

    }

    // const handleChange = (e) => {
    //     const newInfo = { ...info };
    //     newInfo[e.target.name] = e.target.value;
    //     setInfo(newInfo);
    //     console.log(newInfo)
    // }
    const handleChange = e => {
        setInfo({
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    {
                        !toggle &&
                        <div class="card my-5">
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="pickFrom">Pick From</label>
                                    <input className='form-control my-3' onClick={handleChange} type="text" name="from" placeholder="pick from" required />
                                    <label htmlFor="pickTo">Pick To</label>
                                    <input type="text" name="to" onClick={handleChange} className='my-3 form-control' placeholder="pick to" required />
                                    <label htmlFor="pickDate">Pick Date</label>
                                    <input className='form-control my-3' onClick={handleChange} type="date" name="fromDate" required />
                                    <label htmlFor="pickTime">Pick Time</label>
                                    <input type="time" name="fromTime" onClick={handleChange} className='my-3 form-control' required />
                                    <input className="btn btn-success" type="submit" value="search" />
                                </form>
                            </div>
                        </div>
                    }

                    {
                        toggle &&
                        <div className="search-result card">
                            <div class="card">
                                <div class="card-body">
                                    <p>Pick From: {info.from}</p>
                                    <p>Pick To: {info.to}</p>
                                    <p>Pick Date: {info.date}</p>
                                    <p>Pick Time: {info.time}</p>
                                </div>
                            </div>
                            <br />
                            <div class="card">
                                <div class="card-body custom-card-body">
                                    <img src={vehicle.image} alt="" />
                                    <p>{vehicle.vehicle}</p>
                                    <p><i class="fas fa-user"></i> &nbsp; {vehicle.person}</p>
                                    <p>${vehicle.price}</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body custom-card-body">
                                    <img src={vehicle.image} alt="" />
                                    <p>{vehicle.vehicle}</p>
                                    <p><i class="fas fa-user"></i> &nbsp; {vehicle.person}</p>
                                    <p>${vehicle.price}</p>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body custom-card-body">
                                    <img src={vehicle.image} alt="" />
                                    <p>{vehicle.vehicle}</p>
                                    <p><i class="fas fa-user"></i> &nbsp; {vehicle.person}</p>
                                    <p>${vehicle.price}</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div className="map">

            </div>
        </div>
    );
};

export default Search;