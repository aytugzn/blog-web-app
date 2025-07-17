import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

//*ALL POSTS AT START

app.get("/", async (req,res)=>{
try {
    console.log(API_URL)
const response = await axios.get(`${API_URL}/posts`);
console.log(response.data);
res.render("index", {posts: response.data});
} catch (error) {
    console.log(error.response.data);
    res.status(500).json({message: "Error fetching posts"});
}
});

//*POST BY ID

app.get("/post/:id", async (req,res)=>{
try {
    const id = parseInt(req.params.id);
    const response = await axios.get(`${API_URL}/post/${id}`)
    res.render("index", {post: response.data});
} catch (error) {
    console.log(error.response.data);
    res.json({message: "Post not found"});
}
});

//*CREATE NEW POST

app.get("/new", (req,res)=>{
    res.render("modify",{heading: "New Post", submit: "Create Post"});
});

app.post("/api/posts", async (req,res)=>{
    try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
        console.log(response.data);
        res.redirect("/");
    } catch (error) {
        console.log(error.response.data);
        res.status(500).json({message: `Error creating post`})
    }
});

//*PATCH POST BY ID
app.get("/edit/:id", async (req,res)=>{
    const response = await axios.get(`${API_URL}/api/posts/${parseInt(req.params.id)}`);
    console.log(response.data);
    res.render("modify",{heading: "Edit Post", submit: "Update Post", post:response.data});
});

app.post("/api/posts/:id", async (req,res)=>{
    console.log("called");
  console.log(req.body);
try {
    const id = parseInt(req.params.id);
    const response = await axios.patch(`${API_URL}/posts/${id}`, req.body);
    console.log(response.data);
    res.redirect("/");
} catch (error) {
    console.log(error.response.data);
    res.status(500).json({message: "Error updating post"})
}
});

//*DELETE POST BY ID

app.get("/api/posts/delete/:id", async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await axios.delete(`${API_URL}/posts/${id}`);
        console.log(response.data)
            res.redirect("/");
    } catch (error) {
        res.status(500).json({message: "Error deleting post"});
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});