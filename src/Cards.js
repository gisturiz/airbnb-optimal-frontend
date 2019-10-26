import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { axiosWithAuth } from './utils/axiosWithAuth';
import { Card, Image, Button } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";


const button = {
    background: '#FF5A5F',
    color: 'white',
    margin: '5px 10px 0 10px',
}

const cardMargin = {
    margin: '30px'
}

const textAlign = {
    textAlign: "left"
}

const optimalPrice = {
    margin: "10px 0"
}

function Cards({ listings, updateListing, history }) {

    const [price, setPrice] = useState();

    useEffect(() => {
        const values = listings;
        const pricing = { ...values };
        delete pricing["label"];
        delete pricing["id"];

        axios
            .post('https://cors-anywhere.herokuapp.com/airbnb-predictor.herokuapp.com/request', pricing)
            .then(res => {
                return setPrice(res.data.prediction.toFixed(2))
            })
            .catch(err => console.log(err.response));
    }, [listings]);

    const updateDelete = () => {
        axiosWithAuth()
            .get("/listings/")
            .then(res => {
                updateListing(res.data);
            });
    };

    const handleDelete = id => {
        axiosWithAuth()
            .delete(`/listings/${id}`)
            .then(res => {
                updateDelete();
            })
            .catch(error => console.log(error));
    };

    const updateButton = id => {
        history.push(`/editlisting/${id}`);
    }

    return (
        <div>
            <Card style={cardMargin}>
                <>
                    <Image src='https://cdn.dribbble.com/users/989466/screenshots/7559989/media/8cf290ce4d710360630dc67805ffb08a.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{listings.label}</Card.Header>
                        <Card.Meta>
                            <p className='date'>{listings.neighborhood}</p>
                        </Card.Meta>
                        <Card.Description style={textAlign} key={listings.index}>
                            <strong>Accommodates:</strong>  {listings.accomodates}<br />
                            <strong>Bedrooms:</strong>  {listings.bedrooms}<br />
                            <strong>Beds:</strong>  {listings.beds}<br />
                            <strong>Bed Type:</strong>  {listings.bed_type}<br />
                            <strong>Bathrooms:</strong>  {listings.bathrooms}<br />
                            <strong>Minimum Stay:</strong>  {listings.minimum_nights} nights<br />
                            <strong>Room Type:</strong>  {listings.room_type}<br />
                            <strong>WiFi:</strong>  {listings.wifi === 1 ? "Yes" : "No"}<br />
                            <strong>Instant Book:</strong>  {listings.instant_bookable === 1 ? "Yes" : "No"}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Header style={optimalPrice}>Optimal Price ${price}</Card.Header>
                        <a>
                            <Button content="Update" style={button} onClick={() => updateButton(listings.id)}/>
                            <Button content="Delete" style={button} onClick={() => handleDelete(listings.id)} />
                        </a>
                    </Card.Content>
                </>
            </Card>
        </div>
    )
}

export default withRouter(Cards);