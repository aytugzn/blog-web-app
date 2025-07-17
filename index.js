import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  { id: 1, title: "İlk Post", content: "Merhaba dünya!", date: new Date()},
];
let postId = posts.length;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//*ALL POSTS AT START

app.get("/posts", (req,res)=>{
    res.status(200).json(posts);
});

//*POST BY ID

app.get("/post/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const post = posts.find((post)=> post.id===id);
    if (!post) return res.status(404).json({message: "Post not found"});
    res.status(200).json(post);
});

//*CREATE NEW POST

app.post("/posts",(req,res)=>{
    let newId = postId + 1;
    const data = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        date: new Date()
    }
    postId = newId;
    posts.push(data);
    res.status(201).json(posts);
});

//*PATCH POST BY ID

app.patch("/posts/:id",(req,res)=>{
const id = parseInt(req.params.id);
const post = posts.find((post)=> post.id===id);
console.log(post);
if (!post) return res.status(404).json({ message: "Post not found" });

if(req.body.title) post.title=req.body.title;
if(req.body.content) post.content=req.body.content;
res.json(post);
});

app.get("/api/posts/:id", (req,res)=>{
const id = parseInt(req.params.id);
const post = posts.find((post)=> post.id===id);
if (!post) return res.status(404).json({ message: "Post not found" });
res.json(post);
});

//*DELETE POST BY ID

app.delete("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post)=> post.id===id);
    if(postIndex===-1) return res.status(404).json({message: "Post not found"});
    posts.splice(postIndex,1);
    res.status(200).json({message: "Post deleted"});
});

app.listen(port, ()=>{
    console.log(`API server is running on port ${port}`);
});