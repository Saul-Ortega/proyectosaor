import db from './db.js'
import helper from '../helper.js'

async function insertData(req, res) {
    const data = req.query
    const result = await db.query(`
        INSERT INTO items_database.items (item_name, brand, item_type, price) 
        VALUES (?, ?, ?, ?)
        `, [data.item_name, data.brand, data.item_type, data.price])
    return result.affectedRows
}

async function getData(req, res) {
    const rows = await db.query(`
        SELECT * FROM items_database.items
    `)
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData(req, res) {
    const data = req.query
    const result = await db.query(`
        DELETE FROM items_database.items WHERE id=?
    `, [data.id])
    return result.affectedRows
}

export default { getData, insertData, deleteData }