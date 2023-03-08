import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";

import "./ProductPreview.styles.scss";

const ProductPreview = ({ product }) => {
    let { id, name, photo, prices, desc } = product;
    prices = JSON.parse(prices);
    const firstPrice = Object.values(prices)?.at(0);

    // const productPath = name.toLowerCase().split(" ").join("_");
    desc = desc.split(" ").length > 8 ? desc.split(" ").slice(0, 8).join(" ") + " ..." : desc;

    return (
        <Link to={`/menu/${id}`} className="product-preview">
            <div className="photo">
                <img src={`../../../public/upload/${photo}`} alt={name} />
            </div>
            <div className="details">
                <div className="details__price">
                    ₱{" "}
                    {firstPrice.toLocaleString("en", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </div>
                <h2 className="details__name">{name}</h2>
                <p className="details__desc">{desc}</p>
                <div className="details__link">
                    <span>Order Now</span>
                    <BsArrowRight />
                </div>
            </div>
        </Link>
    );
};

export default ProductPreview;
