import React, { useEffect, useState } from 'react';
import FakeData from '../../FakeData/FakeData.json'
import Vehicle from '../Vehicle/Vehicle';
import './Home.css'
const Home = () => {
    const [vehicle, setVehicle] = useState([]);

    useEffect(() => {
        setVehicle(FakeData)
    }, [])

    const clickHandler = (props) => {
        console.log("click", props)
    }

    return (
        <div className="home">
            <div className="vehicle-container">
                {
                    vehicle.map(v => <Vehicle vehicle={v} key={v.id} clickHandler={clickHandler}></Vehicle>)
                }
            </div>
        </div>
    );
};

export default Home;