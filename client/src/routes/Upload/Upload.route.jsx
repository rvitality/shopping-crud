import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import Resizer from "react-image-file-resizer";
import imgPlaceholder from "../../assets/img-placeholder.jpg";

import { GrAddCircle } from "react-icons/gr";
import { AiOutlineMinusCircle } from "react-icons/ai";

import "./Upload.styles.scss";

const getMergePricesJSON = prices => {
    const res = prices.reduce((obj, item) => Object.assign(obj, { [item.size]: item.price }), {});

    return JSON.stringify(res);
};

const NewProduct = props => {
    const navigate = useNavigate();
    const state = useLocation().state;

    console.log(state);

    const [imgFileInput, setImgFileInput] = useState(state?.photo);
    const [imgFileReaderInput, setImgFileReaderInput] = useState();

    const [textInputs, setTextInputs] = useState({
        name: state?.name,
        desc: state?.desc,
        category: state?.category,
    });

    const obj = state ? JSON.parse(state?.prices) : {};
    const result = Object.entries(obj).map(([size, price]) => ({
        id: Math.random(),
        size,
        price,
    }));

    const initialVariations =
        result.length > 0 ? result : [{ id: Math.random(), size: "", price: 1 }];

    // prices / sizes
    const [variations, setVariations] = useState(initialVariations);

    const variationInputChangeHandler = (e, index) => {
        setVariations(prevState => {
            const targetName = e.target.name;
            prevState[index][targetName] = e.target.value;
            return prevState;
        });
    };

    const fileReader = new FileReader();

    const resizeFile = file =>
        new Promise(resolve => {
            Resizer.imageFileResizer(
                file,
                250,
                250,
                "PNG",
                50,
                0,
                uri => {
                    resolve(uri);
                },
                "file"
            );
        });

    const imgChangeHandler = async e => {
        const file = e.target.files[0];
        setImgFileInput(file);
        if (!file) return;

        // try {
        //     const image = await resizeFile(file);
        //     setImgFileInput(image);
        // } catch (err) {
        //     console.log(err);
        // }

        fileReader.onload = e => {
            const { result } = e.target;
            setImgFileReaderInput(result);
        };

        fileReader.readAsDataURL(file);
    };

    const textInputChangeHandler = e => {
        setTextInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    let productStyleDisplayImg = imgPlaceholder;
    if (imgFileReaderInput) {
        productStyleDisplayImg = imgFileReaderInput;
    } else if (imgFileInput) {
        productStyleDisplayImg = `../../../public/upload/${imgFileInput}`;
    }

    console.log(productStyleDisplayImg);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", imgFileInput);

            const res = await axios.post("/api/upload", formData);

            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const submitHandler = async e => {
        e.preventDefault();

        let imgUrl = imgFileInput;

        if (state?.photo !== imgFileInput) {
            imgUrl = await upload();
        }

        const product = {
            name: textInputs.name,
            desc: textInputs.desc,
            category: textInputs.category,
            prices: getMergePricesJSON(variations),
            photo: imgUrl,
        };

        try {
            if (state) {
                await axios.put(`/api/products/${state.id}`, product);
            } else {
                await axios.post(`/api/products/`, product);
            }

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section id="upload">
            <div className="upload section-px">
                <form onSubmit={submitHandler}>
                    <div className="main">
                        <div
                            className="img-upload-container"
                            style={{
                                backgroundImage: `url(${productStyleDisplayImg})`,
                            }}
                        >
                            <input
                                onChange={imgChangeHandler}
                                type="file"
                                accept="image/png, image/jpeg"
                            />
                        </div>

                        <div className="form-group">
                            <div className="form-control">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={textInputChangeHandler}
                                    defaultValue={textInputs.name}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    onChange={textInputChangeHandler}
                                    defaultValue={textInputs.category}
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label htmlFor="desc">Description</label>
                                <textarea
                                    id="desc"
                                    name="desc"
                                    rows="5"
                                    cols="50"
                                    defaultValue={textInputs.desc}
                                    onChange={textInputChangeHandler}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="prices">Prices</label>

                                {variations.map(({ id, size, price }, index) => {
                                    return (
                                        <div key={id} className="price-size">
                                            <input
                                                type="text"
                                                name="size"
                                                placeholder="Size / Pcs."
                                                defaultValue={size}
                                                onChange={e =>
                                                    variationInputChangeHandler(e, index)
                                                }
                                            />
                                            <input
                                                type="text"
                                                name="price"
                                                defaultValue={price}
                                                placeholder="Price"
                                                onChange={e =>
                                                    variationInputChangeHandler(e, index)
                                                }
                                            />
                                            {index === 0 ? (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setVariations(prevState => [
                                                            ...prevState,
                                                            {
                                                                id: Math.random(),
                                                                size: "",
                                                                price: 1,
                                                            },
                                                        ]);
                                                    }}
                                                >
                                                    <GrAddCircle />
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setVariations(prevState =>
                                                            prevState.filter(curr => curr.id !== id)
                                                        );
                                                    }}
                                                >
                                                    <AiOutlineMinusCircle />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button type="button" className="cancel-btn btn">
                            Cancel
                        </button>

                        <button type="submit" className="btn btn__filled">
                            {state ? "Update" : "Add"} Product
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NewProduct;
