const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    },
});

const upload = multer({ storage: storage });
app.use(cors())
app.get("/", (req, res) => {
    return res.json({ message: "Hello World 🇵🇹 🙌" });
});

app.post("/", upload.single("picture"), async(req, res) => {
    return res.json({ picture: req.file.path });
});

const start = (port) => {
    try {
        app.listen(port, () => {
            console.log(`Api up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};
start(4000);