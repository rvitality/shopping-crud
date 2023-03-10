import { db } from "../db.js";

export const getProduct = (req, res) => {
    const q = "SELECT `name`, `desc`, `category`, `prices`, `photo` FROM products WHERE id = ?";

    console.log(req.params);

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);

        console.log(data);

        return res.status(200).json(data[0]);
    });
};

export const getProducts = (req, res) => {
    let { category } = req.query;

    category = category ? category.split("_").join(" ").toLowerCase() : "";

    let q = "SELECT * from products";
    if (category && category !== "all") {
        q = "SELECT * FROM products WHERE category = ?";
    }

    db.query(q, [category], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addProduct = (req, res) => {
    const q = "INSERT INTO products(`name`, `desc`, `category`, `prices`, `photo`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.desc,
        req.body.category,
        req.body.prices,
        req.body.photo,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json("Product has been uploaded.");
    });
};
export const updateProduct = (req, res) => {
    const productId = req.params.id;

    const q =
        "UPDATE products SET `name` = ?, `desc` = ?, `category` = ?, `prices` = ?, `photo` = ? WHERE `id` = ?";

    const values = [
        req.body.name,
        req.body.desc,
        req.body.category,
        req.body.prices,
        req.body.photo,
    ];

    db.query(q, [...values, productId], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.json("Product has been updated.");
    });
};

export const deleteProduct = (req, res) => {
    const productId = req.params.id;
    const q = "DELETE FROM products WHERE `id` = ?";

    db.query(q, [productId], (err, data) => {
        if (err) return res.status(403).json("Error deleting post.");

        return res.json("Post has been deleted.");
    });
};
