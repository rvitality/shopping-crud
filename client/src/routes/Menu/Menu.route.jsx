import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

import ProductPreview from "../../components/ProductPreview/ProductPreview.component";
import Categories from "../../components/Categories/Categories.component";

import "./Menu.styles.scss";

const DATA = [
    {
        id: uuidv4(),
        category: "Baked Sushi",
        products: [
            {
                productId: uuidv4(),
                name: "Tuna Kali",
                photo: "https://assets.website-files.com/621d856f5870fe664b678e8e/621d856f5870fe72e8679015_image-3-menu-restaurantly-template.jpg",
                prices: {
                    solo: 278,
                    double: 578,
                    party: 1228,
                },
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            },
            {
                productId: uuidv4(),
                name: "Kani Aburi",
                photos: [
                    "https://assets.website-files.com/621d856f5870fe664b678e8e/621d856f5870fe2c23679017_image-4-menu-restaurantly-template.jpeg",
                ],
                prices: {
                    solo: 298,
                    double: 598,
                    party: 1248,
                },
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            },
            {
                productId: uuidv4(),
                name: "Crispy Bacon",
                photos: [
                    "https://assets.website-files.com/621d856f5870fe664b678e8e/621d856f5870fe77ed679016_image-6-menu-restaurantly-template.jpeg",
                ],
                prices: {
                    solo: 308,
                    double: 608,
                    party: 1258,
                },
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            },
            {
                productId: uuidv4(),
                name: "Cheesy Samgyup",
                photos: [
                    "https://assets.website-files.com/621d856f5870fe664b678e8e/621d856f5870fe6257679014_image-2-menu-restaurantly-template.jpeg",
                ],
                prices: {
                    solo: 328,
                    double: 628,
                    party: 1278,
                },

                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            },
        ],
    },
    {
        id: uuidv4(),
        category: "Rice Bowls",
    },
    {
        id: uuidv4(),
        category: "Takoyaki",
    },
    {
        id: uuidv4(),
        category: "Sushi",
    },
    {
        id: uuidv4(),
        category: "Pasta",
    },
    {
        id: uuidv4(),
        category: "Milktea",
    },
];

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState(DATA[0]);
    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState();
    const category = useLocation()?.search || "";

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
    }, [category]);

    const changeCategoryHandler = category => {
        setSelectedCategory(category);
        setSelectedProduct();
    };

    const productSelectionHandler = product => {
        setSelectedProduct(product);
    };

    return (
        <section id="menu">
            <div className="menu section-px section-py">
                <div className="section-heading">
                    <div className="line"></div>
                    <h1 className="large-heading">Our Menu</h1>
                    <p className="section-paragraph">
                        Elevate your taste buds with our delectable dishes that are sure to please
                        even the most discerning palate. Our menu is carefully curated to offer a
                        wide variety of flavors and textures that will tantalize your senses.
                    </p>
                </div>

                <Categories />

                <div className="products">
                    {products?.map(product => (
                        <ProductPreview
                            key={product.id}
                            product={product}
                            onProductSelect={productSelectionHandler}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Menu;
