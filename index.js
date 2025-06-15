const express = require("express")
const mongoose = require('mongoose');
const path = require("path")
const methodOverride = require('method-override')
const Chat = require("./models/chat.js")
const app = express();
app.listen(4000, ()=>{
    console.log("We r on at 4000")
})

main().then(
    (res)=>{
        console.log("Connectoin Established Sucessfully")
    }
)
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');  
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

// let chat1 = new Chat({
//     from : "Neha",
//     to : "Sneha",
//     msg : "Send me ur cute pics",
//     created_at : new Date()
// })

// chat1.save().then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })

app.get("/chats", async (req, res)=>{
    let chats = await Chat.find({});
    console.log(chats);
    res.render("chats.ejs", {chats})
})
app.get("/chats/new", (req, res)=>{
       res.render("newchat.ejs")
})
app.post("/chats", (req, res)=>{
    // let {ffrom, fto, fmsg } = req.body;
    let created_at = new Date();
    console.log(req.body.from)
    console.log(req.body.to)
    console.log(req.body.msg)
    Chat.insertOne({
        from: req.body.from,
        to: req.body.to,
        msg: req.body.msg,
        created_at: new Date()
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
    // console.log(chat);
    res.redirect("/chats")
})

app.get("/chats/:id/edit", (req, res)=>{
    let { id } = req.params;
    console.log(id)
    Chat.findById( id ).then((chat)=>{
        res.render("edit.ejs", { chat })
        
    }).catch((err)=>{
        console.log(err)
    })
  
})
app.put("/chats/edit/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;

    try {
        let newChat = await Chat.findByIdAndUpdate(
            id,                        // ❌ incorrect: should pass ID directly, not {id}
            { msg: msg },              // ✅ update message
            { runValidators: true, new: true }  // ✅ return updated document
        );

        console.log(newChat); // will log the updated chat
        res.redirect("/chats")
    } catch (err) {
        console.error("Error updating chat:", err);
        res.status(500).send("Internal Server Error");
    }
})
app.delete("/chats/:id/delete", (req, res)=>{
    let {id } = req.params;
    Chat.findByIdAndDelete(id)
    .then((r) =>{
        console.log(r)
    }).catch((err)=>{
        console.log(err)
    })
    res.redirect("/chats")
})
app.get("/", (req, res)=>{
    res.send("Root Path")
})

