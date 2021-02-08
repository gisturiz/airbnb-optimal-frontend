import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Input,
  Header,
  Select,
} from "semantic-ui-react";
import { axiosWithAuth } from "./utils/axiosWithAuth";

const options_accomodates = [
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
  { key: "4", text: "4", value: "4" },
  { key: "5", text: "5", value: "5" },
  { key: "6", text: "6", value: "6" },
  { key: "7", text: "7", value: "7" },
  { key: "8", text: "8", value: "8" },
];

const options_bedrooms = [
  { key: "0", text: "0", value: "0" },
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
];

const options_bathrooms = [
  { key: "1", text: "1", value: "1" },
  { key: "1.5", text: "1.5", value: "1.5" },
  { key: "2", text: "2", value: "2" },
];

const options_beds = [
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
  { key: "4", text: "4", value: "4" },
];

const options_bed_type = [
  { key: "r", text: "Real Bed", value: "Real Bed" },
  { key: "p", text: "Pull-out Sofa", value: "Pull-out Sofa" },
  { key: "f", text: "Futon", value: "Futon" },
  { key: "c", text: "Couch", value: "Couch" },
  { key: "a", text: "Airbed", value: "Airbed" },
];

const options_minimum_nights = [
  { key: "1", text: "1", value: "1" },
  { key: "2", text: "2", value: "2" },
  { key: "3", text: "3", value: "3" },
  { key: "4", text: "4", value: "4" },
  { key: "5", text: "5", value: "5" },
  { key: "6", text: "6", value: "6" },
  { key: "7", text: "7", value: "7" },
];

const options_neighborhood = [
  {
    key: "f",
    text: "Friedrichshain-Kreuzberg",
    value: "Friedrichshain-Kreuzberg",
  },
  { key: "m", text: "Mitte", value: "Mitte" },
  { key: "p", text: "Pankow", value: "Pankow" },
  { key: "n", text: "Neukolln", value: "Neukolln" },
];

const options_room_type = [
  { key: "p", text: "Private room", value: "Private room" },
  { key: "e", text: "Entire home/apt", value: "Entire home/apt" },
  { key: "s", text: "Shared room", value: "Shared room" },
];

const options_instant_bookable = [
  { key: "1", text: "Yes", value: "1" },
  { key: "1.5", text: "No", value: "0" },
];
const options_wifi = [
  { key: "1", text: "Yes", value: "1" },
  { key: "1.5", text: "No", value: "0" },
];

const button = {
  background: "#FF5A5F",
  color: "white",
  marginTop: "10px",
};

const containerStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "5px",
};

const formDisplay = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "500px",
  margin: "5px auto",
};

const initialState = {
  label: "",
  accomodates: undefined,
  bathrooms: undefined,
  bedrooms: undefined,
  beds: undefined,
  bed_type: undefined,
  instant_bookable: undefined,
  minimum_nights: undefined,
  neighborhood: undefined,
  room_type: undefined,
  wifi: undefined,
};

function AddListing(props) {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDropdownChange = (event, data) => {
    setValues({ ...values, [data.name]: data.value });
  };

  const submitForm = (event) => {
    const id = localStorage.getItem("id");

    event.preventDefault();
    const listings = { ...values, users_id: id };
    axiosWithAuth()
      .post("/listings", listings)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    props.history.push(`/dashboard/${id}`);
  };

  return (
    <Container style={containerStyle}>
      <Header as="h1">Add New Listing</Header>
      <Form onSubmit={submitForm}>
        <Form.Group widths="equal" style={formDisplay}>
          <Form.Field
            control={Input}
            label="Label"
            placeholder="Name of Property"
            name="label"
            onChange={handleChange}
            value={values.label}
          />
          <Form.Select
            fluid
            name="accomodates"
            label="Accommodates"
            search
            selection
            options={options_accomodates}
            placeholder="Number of People"
            onChange={handleDropdownChange}
            value={values.accomodates}
          />
          <Form.Select
            control={Select}
            label="Bedrooms"
            options={options_bedrooms}
            placeholder="Number of Bedrooms"
            name="bedrooms"
            onChange={handleDropdownChange}
            value={values.bedrooms}
          />
          <Form.Select
            control={Select}
            label="Bathrooms"
            options={options_bathrooms}
            placeholder="Number of Bathrooms"
            name="bathrooms"
            onChange={handleDropdownChange}
            value={values.bathrooms}
          />
          <Form.Select
            control={Select}
            label="Beds"
            options={options_beds}
            placeholder="Number of Beds"
            name="beds"
            onChange={handleDropdownChange}
            value={values.beds}
          />
          <Form.Select
            control={Select}
            label="Bed Type"
            options={options_bed_type}
            placeholder="Type of Bed"
            name="bed_type"
            onChange={handleDropdownChange}
            value={values.bed_type}
          />
          <Form.Select
            control={Select}
            label="Minimum Nights"
            options={options_minimum_nights}
            placeholder="Minimum Nights Required"
            name="minimum_nights"
            onChange={handleDropdownChange}
            value={values.minimum_nights}
          />
          <Form.Select
            control={Select}
            label="Neighborhood"
            options={options_neighborhood}
            placeholder="Neighborhood Location"
            name="neighborhood"
            onChange={handleDropdownChange}
            value={values.neighborhood}
          />
          <Form.Select
            control={Select}
            label="Room Type"
            options={options_room_type}
            placeholder="Room Type"
            name="room_type"
            onChange={handleDropdownChange}
            value={values.room_type}
          />
          <Form.Select
            control={Select}
            label="Instantly Bookable"
            options={options_instant_bookable}
            placeholder="Instantly Bookable"
            name="instant_bookable"
            onChange={handleDropdownChange}
            value={values.instant_bookable}
          />
          <Form.Select
            control={Select}
            label="WiFi"
            options={options_wifi}
            placeholder="WiFi Available"
            name="wifi"
            onChange={handleDropdownChange}
            value={values.wifi}
          />
        </Form.Group>
        <Form.Button control={Button} style={button} type="submit">
          Submit
        </Form.Button>
      </Form>
    </Container>
  );
}

export default AddListing;
