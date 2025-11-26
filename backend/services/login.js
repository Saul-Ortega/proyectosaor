import db from "./db.js";
import helper from "../helper.js";

async function getUserData(user, password) {
    const rows = await db.query(`
        SELECT user_name, user_role
        FROM items_database.users
        WHERE user_login = '${user}'
        AND user_password = '${password}'
        `)

        const data = helper.emptyOrRows(rows[0])
        
        return data
}

export default { getUserData }