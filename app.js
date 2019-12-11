var express = require("express")
var Mongodb = require("./config/connect")
var mongo = require("mongodb")
var mongoClient = mongo.MongoClient;

var app = express()

var path = require("path")

//模板引擎的相关设置 html
app.engine("html",require("ejs").__express)
app.set("view engine","html")

//views设置模板的目录
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"static")))


var url = "mongodb://localhost:27017"
app.get("/",(req,res)=>{
    Mongodb.connect(url,(flag,db,client)=>{
        db.collection("students").find().count((err,count)=>{
            var show = 3;
            var page = 1;
            if(req.query.page){
                page = parseInt(req.query.page)
            }
            var total = Math.ceil(count/show)
            isUp = true;
            isNext = true;
            if(page==1){
                isUp = false;
            }
            if(page==total){
                isNext = false;
            }
            var result = db.collection("students").find().limit(show).skip(show*(page-1))

            result.toArray((err,result)=>{
                res.render("index",{
                    result,total,page,isUp,isNext
                })
            })
        })
    })
})

app.get("/del",(req,res)=>{
    Mongodb.connect(url,(flag,db,client)=>{
        var result = db.collection("students").deleteOne({_id:require("mongodb").ObjectID(req.query.id)},(err)=>{
            if(err){
                var obj = {state:0,msg:"删除失败"}
                res.send(obj)
                return;
            }
            var obj = {state:1,msg:"删除成功"}
            res.send(obj)
            client.close()
        })
    })
})

// 添加
app.get("/add", (req, res) => {
    res.render("add")
})

app.get('/addo',(req,res)=>{
    mongoClient.connect(url, (err, client) => {
        var db = client.db("web")
        if (err) {
            console.log("数据库连接失败");
            return
        }
       
    db.collection("students").insertOne(req.query, (err, result) => {
        if (err) {
            console.log("插入失败");
            return;
        }
        console.log("插入成功");
        res.redirect("/")
        client.close()
       })
    })
})

//修改
app.get('/edit',(req,res)=>{
    mongoClient.connect(url,(err,client)=>{
        var db = client.db("web")
        if (err) {
            console.log("数据库连接失败");
            return
        }
        var result = db.collection("students").find({_id:require("mongodb").ObjectID(req.query.id)})
        result.toArray((err, result) => {
            res.render("edit", {
                result
            })
        })
    })
})
app.get('/update',(req,res)=>{
    mongoClient.connect(url, (err, client) => {
        var db = client.db("web")
        if (err) {
            console.log("数据库连接失败");
            return
        }
        db.collection("students").update({_id:require("mongodb").ObjectID(req.query.id)},{
            $set:req.query
        },(err,result)=>{
            if(err){
                return
            }
            res.redirect("/")
        })
    })
})

//搜索
app.get("/search", (req, res) => {
    res.render("search")
})

app.listen("3000","localhost",()=>{
    console.log("YF-server is running @127.0.0.1:3000");
})