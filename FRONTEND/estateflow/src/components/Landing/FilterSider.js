import React from 'react';
import { Form, Col, Button, Accordion, Card } from 'react-bootstrap';

const FilterSider = ({ onFilterChange }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Filter By
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form>
              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" onChange={e => onFilterChange('category', e.target.value)}>
                  <option value="">Select</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  {/* Add more options as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formPriceRange">
                <Form.Label>Price Range</Form.Label>
                <Form.Control type="text" placeholder="e.g., 1000000-5000000" onChange={e => onFilterChange('priceRange', e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control as="select" onChange={e => onFilterChange('location', e.target.value)}>
                  <option value="">Select</option>
                  <option value="downtown">Downtown</option>
                  <option value="suburb">Suburb</option>
                  <option value="outskirts">Outskirts</option>
                  {/* Add more options as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formBedrooms">
                <Form.Label>Number of Bedrooms</Form.Label>
                <Form.Control as="select" onChange={e => onFilterChange('bedrooms', e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formBathrooms">
                <Form.Label>Number of Bathrooms</Form.Label>
                <Form.Control as="select" onChange={e => onFilterChange('bathrooms', e.target.value)}>
                  <option value="">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formParking">
                <Form.Label>Parking</Form.Label>
                <Form.Control as="select" onChange={e => onFilterChange('parking', e.target.value)}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="button" onClick={() => onFilterChange()}>
                Apply
              </Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default FilterSider;
