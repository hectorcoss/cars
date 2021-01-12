import React from 'react';

const Main = (props) => {
    const { cars } = props;
    if (!cars || cars.length === 0) return <p>No cars loaded</p>;
    return (
        <ul>
            <h2 className='list-head'>Available Cars</h2>
            {cars.map((car) => {
                return (
                    <li key={car.id} className='list'>
                        <span className='repo-text'>{car.make} </span>
                        <span className='repo-description'>{car.model}</span>
                    </li>
                );
            })}
        </ul>
    );
};
export default Main;