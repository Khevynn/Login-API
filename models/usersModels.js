const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User{
    constructor(id,  username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    static async Login(userInfo){
        try{
            let [users] = await pool.query("SELECT * FROM user WHERE usr_username=?", [userInfo.username]);
            if(!users.length){ return{status: 404, result:  "User not found"} }; // user doesn't exists

            let isPass = await bcrypt.compare(userInfo.password, users[0].usr_pass);
            if (!isPass)
                return { status: 401, result: "Incorrect password!" }


            return { status: 200, result: "Successfuly Logged-in!" }
        }catch(err){
            console.log("Error in login: ", err);
            return{status: 500, result: err}
        }
    }

    static async Register(user){
        try{
            let [users] = await pool.query('select * from user where usr_username = ?', [user.username]);
            if (users.length > 0)
                return { status: 404, result: "User already exists!" }

            let encpass = await bcrypt.hash(user.password, 10);
            await pool.query(`Insert into user (usr_username, usr_pass)
                values (?,?)`, [user.username, encpass]);

            let [userInfo] = await pool.query("select * from user where usr_username = ?", user.username);

            return { status: 200, result: "Successfuly Registered! You can now log-in" }
        }catch(err){
            console.log("Error on register: ", err);
            return{status: 500, result: err}
        }
    }
}

module.exports = User;