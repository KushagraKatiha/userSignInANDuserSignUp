const app = require('./app.js')

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server is listning on http://localhost:${PORT}`)
})