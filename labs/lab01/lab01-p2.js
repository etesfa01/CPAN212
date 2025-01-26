import http from "http";
import fs from "fs";
import path from "path";

const server = http.createServer((req, res) => {
    if (req.url === "/"){
        const indexPage = fs.readFileSync(path.join("pages", "index.html"));
        res.write(indexPage);
        res.end();
    } else if (req.url == '/about'){
        const aboutPage = fs.readFileSync(path.join("pages", "about.html"));
        res.write(aboutPage);
        res.end();
    } else if (req.url === '/user/account/id'){
        res.write("My name is Eden");
        res.end();
    }else {
        const notFoundPage = fs.readFileSync(path.join("pages", "404.html"));
        res.write(notFoundPage);
        res.end();
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () =>{
    console.log(`http://localhost:${PORT}`)
}); 
