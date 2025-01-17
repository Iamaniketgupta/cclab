
import app from "./src/app.js";
import connectDB from "./src/db/index.js"

await connectDB();


app.use('/', (req, res) => {
    res.send('Server is online')
});


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});
