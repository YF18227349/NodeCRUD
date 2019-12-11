exports.connect = (url,callback)=>{
    var MongoClient = require("mongodb").MongoClient

    MongoClient.connect(url,(err,client)=>{
        if(err){
            return;
        }
        var db = client.db("web")
        callback(1,db,client)
    })
}
