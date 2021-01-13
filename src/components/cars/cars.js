import React, { useState, useEffect } from 'react';
import './cars.scss'
import useModal from "../../hooks/useModal";
import Modal from "../modal/modal";

const Cars = () => {
    const [cars, setCars] = useState({});
    const [loading, setLoading] = useState(true);
    const {isShowing, toggle} = useModal();
    const [currentCar, setCurrentCar] = useState({});

    const getData  = async() => {
        setLoading(true)
        const res = await fetch('https://us-central1-tech-interview-node.cloudfunctions.net/app');
        res.json()
            .then(res => {
                setCars(res);
                setLoading(false);
            })
            .catch(err => {
                setLoading(true);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const setStatus = () => {
        toggle();
        const status = (currentCar.status === 'maintenance') ? 'completed' : 'maintenance';
        const post = fetch('https://us-central1-tech-interview-node.cloudfunctions.net/app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: currentCar.id,
                status,
                customer: currentCar.customer,
                estimatedDate: currentCar.estimatedDate
            }),
        });
        post.then((response) => response.json().then(res => setCars(res)));
    }

    const openModal = (car) => {
        setCurrentCar(car);
        toggle();
    }

    return (
        <div className='container'>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                onSave={setStatus}
                data={currentCar}
                setData={setCurrentCar}
            />
            <table className='table'>
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Maker</th>
                        <th>Model</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Estimated Date</th>
                        <th>Image</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {!loading && cars.length > 0? cars.map((car) => {
                    return (
                    <tr key={Math.random()} className={car.status === 'maintenance' ? 'on-maintenance' : 'not-on-maintenance'}>
                        <td>{car.customer}</td>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.status}</td>
                        <td>{car.description}</td>
                        <td>{car.estimatedDate}</td>
                        <td><img src={car.image} alt='NA'/></td>
                        <td><button onClick={() => openModal(car)}>
                            {car.status === 'maintenance' ? 'Completed' : 'Maintenance'}
                        </button></td>
                    </tr>
                    );
                }) : <tr key={Math.random()}><td>Fetching data...</td></tr>}
                </tbody>
            </table>
        </div>
    );
};
export default Cars;