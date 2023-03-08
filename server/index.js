import express from "express";
import cors from "cors";
import multer from "multer";

import productRoutes from "./routes/products.js";

const app = express();

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/products", productRoutes);

app.listen(8800, () => {
    console.log("Connected to server...");
});
