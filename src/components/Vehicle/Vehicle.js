import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicle.css'

const Vehicle = (props) => {
    const { id, vehicle, image, person, price } = props.vehicle;
    const clickHandler = props.clickHandler;
    return (
        <Link to={`/search/${id}`}>
            <div className="card vehicle" onClick={() => clickHandler(id)}>
                <img src={image} class="card-img-top" alt="..." />
                <div className="card-body mt-5">
                    <h5 className="text">{vehicle}</h5>
                </div>
            </div>
        </Link>
    );
};

export default Vehicle;