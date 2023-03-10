import React from "react";
import { Link, useLocation } from "react-router-dom";

const CATEGORIES = ["all", "baked sushi", "rice bowls", "takoyaki", "sushi", "pasta", "milktea"];

import "./Categories.styles.scss";

const Categories = () => {
    const location = useLocation()?.search;
    const selectedCategory = location.split("=")?.at(-1);

    return (
        <div className="categories">
            {CATEGORIES.map(category => {
                const formattedCategory = category.split(" ").join("_");

                return (
                    <Link
                        key={formattedCategory}
                        to={`/?category=${formattedCategory}`}
                        className={`categories__item ${
                            selectedCategory === formattedCategory ? "highlight" : ""
                        }`}
                    >
                        {category}
                    </Link>
                );
            })}
        </div>
    );
};

export default Categories;
