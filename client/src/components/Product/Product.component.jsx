import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import { BsArrowLeft } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import { HiOutlineMinusSm, HiOutlineShoppingCart } from "react-icons/hi";
import { BiTime } from "react-icons/bi";
import { AiOutlineStock, AiFillStar } from "react-icons/ai";

// import ProductImgSlider from "../ProductImgSlider/ProductImgSlider.component";
// import AddOn from "../AddOn/AddOn.component";
// import Categories from "../Categories/Categories.component";

import { useCartContext } from "../../context/CartContext";

import "./Product.styles.scss";

const freeNori = {
    solo: 1,
    double: 2,
    party: 4,
};

const sizesInfo = {
    solo: `(6x4x1") Good for 1-2 persons`,
    double: `(8x8x1") Good for
    3-6 persons`,
    party: `(13x10x1") Good for
    7-10 persons`,
};

const Product = props => {
    const { cart, onCartUpdate } = useCartContext();

    const [product, setProduct] = useState({});
    let { name, photo, prices, description } = product;
    const productPrices = prices ? JSON.parse(prices) : {};
    prices = Object.keys(productPrices).map(key => ({ [key]: productPrices[key] }));

    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/api/products/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPosts();
    }, []);

    const [selectedSize, setSelectedSize] = useState("solo");
    const [quantity, setQuantity] = useState(1);

    const selectedPrice = +productPrices[selectedSize] || 1;
    const orderTotal = selectedPrice * quantity;

    const order = {
        productId,
        name,
        quantity,
        selectedSize,
        photo,
        total: orderTotal,
        freebies: [{ name: "nori", quantity: freeNori[selectedSize] }],
    };

    const sizeChangeHandler = e => {
        setSelectedSize(e.target.value);
        console.log(e.target.value);
    };

    const quantityChangeHandler = e => {
        const inputValue = e.target.value.replace(/[^0-9]/g, "");
        setQuantity(inputValue);
    };
    const quantityOnBlurHandler = e => {
        let inputValue = e.target.value;
        inputValue = !inputValue ? 1 : inputValue;
        setQuantity(+inputValue);
    };

    const quantityButtonClickHandler = type => {
        setQuantity(prevState => {
            let value = prevState;

            if (type === "add") {
                return value + 1;
            }

            value = prevState - 1;

            return value <= 0 ? 1 : value;
        });
    };

    const cartAddItemHandler = () => {
        onCartUpdate(order);
    };

    return (
        <section id="product">
            <div className="single-product section-px">
                <Link to="/" className="link link--reversed back-btn">
                    <BsArrowLeft />
                    <span>Menu</span>
                </Link>

                <div className="product">
                    <div className="product__photo">
                        {/* {photos.length > 0 && <ProductImgSlider photos={photos || []} />} */}
                        <img src={`../../../public/upload/${photo}`} alt="" />
                    </div>
                    <div className="details">
                        <div className="tags">
                            <div className="tag">#bestseller</div>
                            <div className="tag">#mostliked</div>
                        </div>

                        <div className="line"></div>

                        <h2 className="details__name large-heading">{name}</h2>
                        <div className="stats">
                            <div className="stat">
                                <AiFillStar />
                                <span className="stat__value">12.4k </span>
                                <span className="stat__label">Ratings</span>
                            </div>

                            <div className="stat">
                                <AiOutlineStock />
                                <span className="stat__value">57 </span>
                                <span className="stat__label">Sold</span>
                            </div>

                            <div className="stat">
                                <BiTime />
                                <span className="stat__value">20-30 mins. </span>
                                <span className="stat__label">Prep time</span>
                            </div>
                        </div>
                        <p className="details__desc">{description}</p>

                        <div className="total">
                            ₱
                            <span className="total__value">
                                {orderTotal.toLocaleString("en", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>

                        <div className="size">
                            {prices.length > 0 &&
                                prices.map((el, index) => {
                                    const [[size, price]] = Object.entries(el);

                                    return (
                                        <div key={size} className="group">
                                            <input
                                                onChange={sizeChangeHandler}
                                                type="radio"
                                                name="size"
                                                value={size}
                                                id={size}
                                                defaultChecked={index === 0}
                                            />
                                            <div>
                                                <label htmlFor={size}>
                                                    <span className="highlight">{size}</span>{" "}
                                                    {sizesInfo[size]}
                                                </label>
                                                <div className="free">
                                                    {freeNori[size]}{" "}
                                                    <span className="highlight">FREE</span> Nori
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        <div className="quantity-container">
                            <h3>Quantity </h3>
                            <div className="quantity">
                                <button
                                    className="quantity__btn quantity__minus"
                                    type="button"
                                    onClick={() => quantityButtonClickHandler("minus")}
                                >
                                    <HiOutlineMinusSm />
                                </button>
                                <input
                                    type="text"
                                    name="quantity"
                                    value={quantity}
                                    onChange={quantityChangeHandler}
                                    onBlur={quantityOnBlurHandler}
                                    className="quantity__value"
                                />
                                <button
                                    className="quantity__btn quantity__add"
                                    type="button"
                                    onClick={() => quantityButtonClickHandler("add")}
                                >
                                    <MdOutlineAdd />
                                </button>
                            </div>
                        </div>

                        <div className="order-total">
                            <h3> Total</h3>
                            <div className="value">
                                ₱{" "}
                                {orderTotal.toLocaleString("en", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </div>
                        </div>

                        <div className="actions">
                            <button
                                className="add-to-cart btn"
                                onClick={() => cartAddItemHandler()}
                            >
                                <span>Add to Cart</span>
                                <HiOutlineShoppingCart />
                            </button>

                            <button className="btn btn__filled">
                                <span>Check Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;
