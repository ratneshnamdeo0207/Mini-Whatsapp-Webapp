const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
main().then(
    (res)=>{
        console.log("Connectoin Established Sucessfully")
    }
)
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');  
}

let allChats = [
    {
        from :"Rohit",
        to : "Anirudh",
        msg : "Muje Laptop chahia paper ha aj",
        created_at : new Date(),
    },
    {
        from :"Anirudh",
        to : "Rohit",
        msg : "Kitne Baje Tak chahia hai",
        created_at : new Date(),
    },
    {
        from :"Rohit",
        to : "Anirudh",
        msg : "Aj dopahar k 3 baje tak",
        created_at : new Date(),
    },
    {
        from :"Anirudh",
        to : "Rohit",
        msg : "Thk ha ma le auga",
        created_at : new Date(),
    },
    {
        from :"Rohit",
        to : "Anirudh",
        msg : "Charger ni bhulna",
        created_at : new Date(),
    },
];
Chat.insertMany([
    {
        from :"Rohit",
        to : "Anirudh",
        msg : "Muje Laptop chahia paper ha aj",
        created_at : new Date(),
    },
    {
        from :"Anirudh",
        to : "Rohit",
        msg : "Kitne Baje Tak chahia hai",
        created_at : new Date(),
    },
    {
        from :"Rohit",
        to : "Anirudh",
        msg : "Aj dopahar k 3 baje tak",
        created_at : new Date(),
    },
    {
        from :"Anirudh",
        to : "Rohit",
        msg : "Thk ha ma le auga",
        created_at : new Date(),
    },
    {
        from :"Rohit",
        to : "Anirudh",
        msg : "Charger ni bhulna",
        created_at : new Date(),
    },
]).then((data)=>{
    console.log(data)
}).catch((err)=>{
    console.log(err)
})