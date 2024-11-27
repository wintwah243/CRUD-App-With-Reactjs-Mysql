import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mysql from 'mysql2';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
})

app.get("/", (req,res) => {
 const sql = "SELECT * FROM students";
 db.query(sql,(err,result) => {
    if(err){
        return res.json({Message:"Error inside server"})
    }
    return res.json(result);
 })
})

app.post("/student",(req,res) => {
    const sql = "INSERT INTO students (`name`,`email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values],(err,result) => {
        if(err){
            return res.json(err)
        }
        return res.json(result);
    })
    
})

app.get("/read/:id", (req,res) => {
    const sql = "SELECT * FROM students WHERE id = ?";
    const id = req.params.id;

    db.query(sql,[id],(err,result) => {
       if(err){
           return res.json({Message:"Error inside server"})
       }
       return res.json(result);
    })
   })

app.put("/update/:id",(req,res) => {
    const sql = "UPDATE students SET `name` = ?, `email` = ? WHERE id=?";
    const id = req.params.id;
    const {name,email} = req.body;
    db.query(sql, [req.body.name,req.body.email,id],(err,result) => {
        if(err){
            return res.json(err);
        }
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res) => {
    const sql = "DELETE FROM students WHERE id = ? ";
    const id = req.params.id;
    db.query(sql, [id],(err,result) => {
        if(err){
            return res.json(err);
        }
        return res.json(result);
    })
})

app.listen(8081,() => {
    console.log("Listening");
})