import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter';
import productRouter from './routes/productRouter';

const app = express();

app.use(express.json());

const dbUrl = 'mongodb://localhost:27017/your-database-name'; // Replace 'your-database-name' with the name of your MongoDB Compass database

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connection successful');
    app.use('/users', userRouter);
    app.use('/products', productRouter);

    const port = 3000; // Replace with the desired port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });
