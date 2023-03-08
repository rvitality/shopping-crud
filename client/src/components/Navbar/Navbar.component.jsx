import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { HiOutlineShoppingBag } from "react-icons/hi";

import { useCartContext } from "../../context/CartContext";

import CartDropdown from "../../components/CartDropdown/CartDropdown.component";
import "./Navbar.styles.scss";

const Navbar = () => {
    const { cart, cartTotal } = useCartContext();
    const [cartIsBumped, setCartIsBumped] = useState(false);

    const [displayCartDropdown, setDisplayCartDropdown] = useState(false);

    const cartBagClasses = `cart__bag ${cartIsBumped ? "bump" : ""}`;

    useEffect(() => {
        if (cart.length === 0) {
            return;
        }
        setCartIsBumped(true);

        const timer = setTimeout(() => {
            setCartIsBumped(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cart.length]);

    return (
        <>
            <header className="section-px">
                <div className="left">
                    <h1>
                        <NavLink to="/">food.</NavLink>
                    </h1>
                </div>

                <nav className="nav">
                    <ul>
                        <li>
                            <NavLink className="nav__link" to="/">
                                Menu
                            </NavLink>
                        </li>
                        <li>
                            <a className="nav__link" href="/upload">
                                Upload
                            </a>
                        </li>
                        <li>
                            <a className="nav__link" href="/admin">
                                Admin
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="right">
                    <div className="cart-container">
                        <button
                            className="cart"
                            onClick={() => setDisplayCartDropdown(prevState => !prevState)}
                        >
                            <div className={cartBagClasses}>
                                <HiOutlineShoppingBag />
                                <span className="cart__items">{cart.length}</span>
                            </div>

                            <div>
                                <div>Your Cart</div>
                                <span className="cart__total">
                                    ₱{" "}
                                    {cartTotal.toLocaleString("en", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>
                        </button>
                        {displayCartDropdown && <CartDropdown />}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
