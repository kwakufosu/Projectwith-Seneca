import  express from 'express'

const app= express()
const PORT= process.env.PORT||3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.listen(PORT,()=>{
    console.log("server up")
})
