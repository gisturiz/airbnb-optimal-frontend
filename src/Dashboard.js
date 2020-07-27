import React, { useState, useEffect } from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { axiosWithAuth } from './utils/axiosWithAuth';
import Cards from './Cards';

const button = {
    background: '#FF5A5F',
    color: 'white',
    marginTop: '5px'
}

const cardStyle = {
    margin: '30px',
    minHeight: '540px',
    minWidth: '300px'
}

const dashboard = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: '0 20px'
}

const addCardCenter = {
    margin: 0,
    position: 'absolute',
    top: '70%',
    left: '25%'
}

const cardBackground = {
    background: "#fff7d7"
}

const CardExampleCard = (props) => {

    const [listings, setListings] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem('id');

        axiosWithAuth()
            .get(`/users/${id}/listings`)
            .then(res => {
                setListings(res.data)
            })
            .catch(err => console.log(err));
    }, [])

    const addListingRouter = () => {
        props.history.push('/addlisting');
    }

    return (
        <div style={dashboard}>
            <Card style={cardStyle}>
                <Image style={cardBackground} src='https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/add_blue.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header style={addCardCenter}>Add New Listing</Card.Header>
                </Card.Content>
                <Card.Content extra>
                    <div>
                        <Button content="Add" style={button} onClick={addListingRouter} />
                    </div>
                </Card.Content>
            </Card>
            {listings.map((item, index) => (
                <Cards key={index} listings={item} updateListing={setListings} />
            ))}
        </div>
    )
}

export default CardExampleCard