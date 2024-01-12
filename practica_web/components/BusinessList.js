import React, { useState, useEffect } from 'react';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        fetch('/api/businesses')
            .then(response => response.json())
            .then(data => setBusinesses(data));
    }, []);
    return (
            <ul>
                {businesses.map(business => (
                <li key={business.id}>{business.name}</li>
                ))}
            </ul>
        );
};
    
export default BusinessList;