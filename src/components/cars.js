import React, { useState, useEffect } from "react";

const Cars = () => {
    const [hasError, setErrors] = useState(false);
    const [cars, setCars] = useState({});

    async function fetchData() {
        const res = await fetch("https://us-central1-tech-interview-node.cloudfunctions.net/app");
        res
            .json()
            .then(res => setCars(res))
            .catch(err => setErrors(err));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <span>{JSON.stringify(cars)}</span>
            <hr />
            <span>Has error: {JSON.stringify(hasError)}</span>
        </div>
    );
};
export default Cars;