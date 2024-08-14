// src/components/PropertyTable.js
import React from 'react';
import './PropertyTable.css'; // Add custom styles for the property table

const PropertyTable = ({ properties }) => {
  return (
    <div className="property-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.name}</td>
              <td>{property.location}</td>
              <td>{property.type}</td>
              <td>{property.price}</td>
              <td>{property.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
