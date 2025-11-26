import express from 'express';
import cors from 'cors';
import itemsService from './services/items.js'
import loginService from './services/login.js'

const app = express();

app.use(cors());
app.use(express.json());

//poner lo del login

app.get('/', ( req, res ) => {
    res.json({ ok: true, message: 'API Example Connected' })
})

app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user_login)
    console.log(req.query.user_password)
    try {
        res.json(await loginService.getUserData(req.query.user_login, req.query.user_password))
    } catch (err) {
        console.error(`Error while getting data `, err.message)
        next(err)
    }
})

app.get('/getItems', async( req, res, next ) => {
    try {
        res.json(await itemsService.getData());
    } catch ( err ) {
        console.error('Error while getting items', err.message);
        next(err);
    }
})

app.get('/addItem', async( req, res, next ) => {
    try {
        res.json(await itemsService.insertData(req))
    } catch ( err ) {
        console.error('Error while inserting items', err.message);
        next(err);
    }
})

app.get('/deleteItem', async( req, res, next ) => {
    try {
        res.json(await itemsService.deleteData(req))
        res.json({ affectedRows: rows });
    } catch ( err ) {
        console.error('Error while deleting items', err.message);
        next(err);
    }
})

const PORT = 3030;

app.listen(PORT, () => {
    console.log(`API Available At http://localhost:${PORT}`);
})