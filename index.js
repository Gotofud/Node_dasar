// const data = "Testing"
// console.log(data)

// import express from "express"
const express = require('express')
const app = express()
const port = 5000
const db = require("./connection")
const { error } = require('console')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

// Route
app.get('/',(req,res)=>{
    res.send('<h1>Selamat Datang di halaman utaman</h1>')
})

app.get('/user',(req,res)=>{
    res.json({
        nama: "Fazli",
        pekerjaan: "Hina Israel",
    })
})

app.get('/hello',(req,res)=>{
    res.send('<h1>Mie Ayam</h1>')
})

app.get('/find/:id',(req,res)=>{
    const data = req.params.id;
    db.query(`SELECT * FROM produk WHERE id_produk = "${data}"`, (error, result)=>{
        if (error) {
            res.status(400).send("Error");
        }
        res.json(result);
    })
})

// Post Data ke DB
app.post("/add", (req,res)=>{
    const {id_produk,produk,kategori,harga_per_kg} = req.body;
    const sql = `INSERT INTO produk (id_produk, produk, kategori, harga_per_kg) VALUES (
    ${id_produk}, "${produk}", "${kategori}", ${harga_per_kg}
    )`;

    db.query(sql, (error, result)=>{
        if (error) {
            return console.log("Error");
        }
    })

    res.status(200).send("Berhasil");
})
// Edit Data di DB
app.put("/update", (req,res)=>{
    // const idProduk = req.params.id
    const {id_produk,produk,kategori,harga_per_kg} = req.body;
    const sql = `UPDATE produk SET produk = "${produk}",
    kategori = "${kategori}", harga_per_kg = ${harga_per_kg}
    WHERE id_produk = ${id_produk}`;

    db.query(sql, (error, result)=>{
        if (error) {
            return console.log("Error");
        }
    })

    res.status(200).send("Berhasil");
})
// Delete Data di DB
app.delete("/delete/:id", (req,res)=>{
    const id_produk = req.params.id
    const sql = `DELETE FROM produk WHERE id_produk = ${id_produk}`;

    db.query(sql, (error, result)=>{
        if (error) {
            return console.log("Error");
        }
    })

    res.status(200).send("Berhasil");
})

// Soal 1
app.get('/ucapan',(req,res)=>{
    res.send('<h1>Salam Akal Sehat</h1>')
})  

// Soal 2
app.get('/data-diri',(req,res)=>{
    res.json({
        nama: "Fazli",
        umur: "1950 Tahun",
        kota: "Bandung",
        pekerjaan: "Siswa SMK biasa",
    })
}) 

// Soal 3
app.get('/salam',(req,res)=>{
    const nama = req.query.nama;
        if (nama) {
            res.send(`<h1>Halo, ${nama}!</h1>`)
        } else {
            res.send('<h1>Halo, Siapa Namamu?</h1>')
        }
})


app.listen(port,()=>{
    // console.log("App listening on port 5000")
    console.log(`App listening on port ${port}`)
})