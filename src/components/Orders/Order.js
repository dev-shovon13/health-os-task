import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Order.css'

const Order = ({ order }) => {
    const { _id, productId, date, payment, quantity, status } = order

    // load order 
    const [product, setProduct] = useState([])
    useEffect(() => {
        fetch(`https://health-os.herokuapp.com/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productId])

    // custom style for payment 
    let background;
    let color;
    if (payment === "PAID") {
        color = "#E72925";
        background = "#FFD9DD"
    } else if (payment === "COD") {
        color = "#EF6E16";
        background = "#FFE9DD"
    }

    // custom style for status 
    let statusBg;
    if (status === "Accepted") {
        statusBg = "#00B600"
    } else if (status === "Pending") {
        statusBg = "#FDB300"
    } else if (status === "Shipped") {
        statusBg = "#FE6900"
    }

    return (
        <div className='col'>
            <div className="card h-100 shadow-sm p-2">
                <div className="d-flex justify-content-between text-secondary mb-2">
                    <p>Order #{_id}</p>
                    <p>{date}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className='img-fluid me-2 order-img' />
                        <div>
                            <p className='text-secondary'>{quantity} {quantity > 1 ? "ITEMS" : "ITEM"}</p>
                            <p className='text-primary'>&#2547;{product.price} Taka</p>
                        </div>
                    </div>
                    <span className="badge rounded-pill" style={{ backgroundColor: background, color: color }}>{payment}</span>
                </div>
                <div className="mt-2 pt-1 border-top d-flex justify-content-between align-items-center">
                    <div className="fw-bold text-secondary p-1">
                        <span className="dot me-2" style={{ backgroundColor: statusBg }}></span>
                        {status}
                    </div>
                    <div className="btn btn-sm btn-outline-secondary d-flex align-items-center">
                        <span className='me-1'>Details</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;