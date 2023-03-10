import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { TiEdit } from "react-icons/ti";
import { MdDelete } from "react-icons/md";

import DataTable from "../../components/DataTable/DataTable.component";

import "./Admin.styles.scss";

const Table = ({ dataToDisplay }) => {
    const navigate = useNavigate();

    const deleteHandler = async id => {
        try {
            await axios.delete(`/api/products/${id}`);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <table className="data-table-bills table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Desc</th>
                    <th>Category</th>
                    <th>Prices</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {dataToDisplay.map((product, index) => {
                    let { id, name, desc, category, prices, photo } = product;

                    prices = JSON.parse(prices);
                    prices = Object.entries(prices)
                        .map(
                            ([key, value]) =>
                                `${key.charAt(0).toUpperCase()}${key.slice(1)} (₱${parseFloat(
                                    value
                                ).toLocaleString("en", {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2,
                                })})`
                        )
                        .join(", ");

                    return (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td className="capitalize">
                                <Link to={`/menu/${id}`} className="link">
                                    {name}
                                </Link>
                            </td>
                            <td>{desc.length > 15 ? `${desc.slice(0, 15)}...` : desc}</td>
                            <td>{category}</td>
                            <td className="prices">{prices}</td>
                            <td>
                                <div className="actions">
                                    <Link
                                        state={product}
                                        to="/upload"
                                        title="Edit"
                                        className="actions__edit"
                                    >
                                        <TiEdit />
                                    </Link>
                                    <button
                                        title="Delete"
                                        onClick={() => deleteHandler(id)}
                                        className="actions__del"
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const Admin = () => {
    const [products, setProducts] = useState([]);

    const category = "";

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(`/api/products/${category}`);
                const { data } = res;
                setProducts(data);
            } catch (err) {
                console.log(err);
            }
        };

        getProducts();
    }, []);

    return (
        <section id="admin">
            <div className="admin section-px section-py">
                <h1 className="primary-heading">Products</h1>
                <DataTable data={products || []} Table={Table} />
            </div>
        </section>
    );
};

export default Admin;
