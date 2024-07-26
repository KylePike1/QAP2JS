const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    //res.setHeader("Content-Type", "text/plain");
    if(url === "/"){
        fs.readFile("views/home.html", (err, content) =>{
            if(err){
                res.setHeader("Content-Type", "text/plain");
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("server error");
                myEmitter.emit(404);
            }else{
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200, {"Content_Type": "text/html"});
                res.end(content, "utf-8");
                myEmitter.emit(200, "Home Page accessed");
                myEmitter.emit('fileRead', "Home")
            }
        })
        
    }else if(url === "/about"){
        fs.readFile("views/about.html", (err, content) =>{
            if(err){
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("server error");
                myEmitter.emit(404);
            }else{
                res.writeHead(200, {"Content_Type": "text/html"});
                res.end(content, "utf-8");
                myEmitter.emit(200);
                myEmitter.emit('fileRead', "About")
            }
        })
    }else if(url === "/contact"){
        fs.readFile("views/contact.html", (err, content) =>{
            if(err){
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("server error");
                myEmitter.emit(404);
            }else{
                res.writeHead(200, {"Content_Type": "text/html"});
                res.end(content, "utf-8");
                myEmitter.emit(200);
                myEmitter.emit('fileRead', "Contact")
            }
        })
        
    }else if(url === "/products"){
        fs.readFile("views/products.html", (err, content) =>{
            if(err){
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("server error");
                myEmitter.emit(404);
            }else{
                res.writeHead(200, {"Content_Type": "text/html"});
                res.end(content, "utf-8");
                myEmitter.emit(200);
                myEmitter.emit('fileRead', "Products")
            }

        })
    }else if(url === "/subscribe"){
        fs.readFile("views/subscribe.html", (err, content) =>{
            if(err){
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("server error");
                myEmitter.emit(404);
            }else{
                res.writeHead(200, {"Content_Type": "text/html"});
                res.end(content, "utf-8");
                myEmitter.emit(200);
            }
            myEmitter.emit('fileRead', "Subscribe")
        })
    }else {
        res.statusCode = 404;
        res.end("Page not found");
        myEmitter.emit(404);
    }

    
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
})


//event emmitter
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();

myEmitter.on(200, () => {
    console.log('Success: Status 200 OK');
});
  
myEmitter.on(404, () => {
    console.log('Error: Status 404 Not Found');
});
  
myEmitter.on(500, () => {
    console.log('Error: Status 500 Internal Server Error');
});

myEmitter.on('fileRead', (fileName) => {
    console.log(`File successfully read: ${fileName}`);
});


