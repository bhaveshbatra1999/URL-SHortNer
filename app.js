var http = require('http');
var express = require('express')
var ejs = require('ejs');

var app = express();

var connectDB = require('./config/connection');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/public',express.static(__dirname+'/public'));

app.set('view engine','ejs');

var shortURL = require('./controller/saveURL.js');
var short_url = new shortURL();

app.get('/',(req,res)=> {
    res.status(200).render('../views/index.ejs',{main: "Home", urldata:""});
});

app.post('/',(req,res)=> {
    short_url.saveURLdata(req.body, (Cbdata)=> {
        if (Cbdata.status == "err") 
        {
            res.status(200).send("error while saving data");
        }
        else 
        {
            res.status(200).render('../views/index.ejs',{main:"Home", urldata: Cbdata.urldata});
        }
    });
});


app.get('/:id',(req,res)=> {
    short_url.redirectURL(req.params.id, (Cbdata)=> {
        if(Cbdata.status == "err")
        {
            res.status(200).redirect('*');
        }
        else
        {
            res.status(200).redirect(Cbdata.urldata.LongURL);
        }
    })
})

app.get('*',(req,res)=> {
    res.status(404).render('../views/error404.ejs',{main: "Error Page"});
});

http.createServer(app).listen(2000, ()=>{
    console.log("Server Started at",+2000);
});