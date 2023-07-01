const mysql = require('mysql');
const dotenv = require('dotenv');
let instance=null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM student_details;";

                connection.query(query, (err, results) => {
                    // if (err) reject(new Error(err.message));
                    // resolve(results);
                      if(err)
                    console.log(err);
                    else
                    console.log(results)
                })
            });
            console.log("DB**********************************"+response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewName(FName,LName,Dob,Address,Parent_name,city,phone) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO student_details (FName,LName,Dob,Parent_name,Address,city,phone) VALUES (?,?,?,?,?,?,?);";

                connection.query(query, [FName,LName,Dob,Parent_name,Address,city,phone] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            console.log(insertId); 
            // return insertId;
            
            return {
                RollNo : insertId,
                FName:FName,
                LName:LName,
                Dob:Dob,
                Parent_name:Parent_name,
                Address:Address,
                city:city,
                phone:phone
            };
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports=DbService;
