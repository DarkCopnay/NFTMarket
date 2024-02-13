import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from 'cors'

import { RegisterValid, LoginValid, NFTPostValid, ProfileEditValid } from "./validator/Validation.js";
import CheckAuth from "./utils/CheckAuth.js";
import * as UserControl from './Controlers/UserControl.js';
import * as NFTPostControler from './Controlers/NFTPostControler.js'

mongoose.connect(
    `mongodb+srv://nftmarketplace:2010665KEEek@cluster0.yh04arc.mongodb.net/nftmarket?retryWrites=true&w=majority`
)
.then(() => {console.log("DB: connect")})
.catch((err) => {console.log("DB: error connect", err)});

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, './src/assets/upload/')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer( {storage: storage} )

app.use(express.json())

app.use(cors());
app.use('/upload', express.static('./src/assets/upload'))

app.post('/register', RegisterValid, UserControl.register)
app.post('/login', LoginValid, UserControl.login)
app.get('/profile/:id', UserControl.ProfileView);
app.patch('/profile/:id/edit', CheckAuth, ProfileEditValid, UserControl.ProfileEdit)
app.get('/users', UserControl.UsersDataList);
app.get('/ranks', UserControl.Ranks);

app.post('/upload', CheckAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/upload/${req.file.originalname}`,
    })
})

// app.post('/upload', CheckAuth, upload.single('file'), (req, res) => {
//     res.json({
//         url: `/src/assets/upload/${req.file.originalname}`,
//     })
// })

app.get('/market', NFTPostControler.getAll);
app.get('/market/nft/:id', NFTPostControler.GetOne)
app.post('/market/create', CheckAuth, NFTPostValid, NFTPostControler.create);
app.patch("/market/nft/:id/edit", CheckAuth, NFTPostControler.update)
app.delete('/market/nft/:id', CheckAuth, NFTPostControler.remove)


app.listen(4444, (err) => {
    if (err) {
        return (console.log("Error"))
    }

    console.log('Server: OK');
})