const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()


const app = express()


app.use((express.json()))

app.get('/', (req,res)=>{
    res.send("hola mundo")
})


// crear registros 

app.post("/post", async(req,res)=>{
   const {title, content} = req.body
  const result = await prisma.post.create({
    data:{
        title, content
    }
   })

   res.json(result)
} )

//mostrar todos los registros 

app.get('/allPost', async (req,res)=>{
  const posts = await prisma.post.findMany()
  res.json(posts)
})


// actualizar un registros en

app.put('/post/:id', async (req,res)=>{
 const {id}= req.params
 const {title, content} = req.body
 const post = await prisma.post.update({
    where:{id: Number(id)},
  data:{title,content} 
 })
 res.json(post)
  })

app.delete('/post/:id', async (req, res) => {
   const {id}= req.params
    const postdelete = await prisma.post.delete({
        where:{
            id: Number (id)}
    })
        res.json("post eliminado con exito")
})


app.listen(3000 , ()=>{
    return console.log("servidor correndo ")
})