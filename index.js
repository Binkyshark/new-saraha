// import dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'
// import cors from 'cors'
// import bootstrap from './src/bootstrap.js'
// const app = express()
// const port = 5000

// bootstrap(app, express)



// app.listen(port, () => console.log(`server is running on port ${port}`))
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './DB/connection.js';
import authRouter from './src/modules/auth/auth.router.js';
import messageRouter from './src/modules/user/message/message.router.js';
import jwt from 'jsonwebtoken'; // ✅ Import jwt for token generation

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/auth", authRouter);
app.use('/api/message', messageRouter);

// ✅ Generate test token for testing
const generateTestToken = () => {
  const testUserId = "507f1f77bcf86cd799439011";
  const secretKey = process.env.TOKEN_BEARER || "pinkysharkandlime";
  
  const testToken = jwt.sign(
    { id: testUserId },
    secretKey,
    { expiresIn: '24h' }
  );
  
  console.log("\n Use this token in Postman:");
  console.log("Bearer " + testToken);
  console.log("\n copy this and paste it in Authorization header:");
  console.log(`Authorization: Bearer ${testToken}`);
  console.log("\n Test now in Postman with this URL:");
  console.log(`POST http://localhost:${port}/api/message/send`);
  console.log("\n IMPORTANT: You need to create a user first!");
  console.log(`POST http://localhost:${port}/api/auth/signup`);
  console.log("═".repeat(80));
};

// ✅ Add test user creation endpoint
app.post("/api/test/create-user", async (req, res) => {
  try {
    // Import userModel dynamically
    const { default: userModel } = await import('./src/modules/user/user.model.js');
    
    const testUser = await userModel.create({
      name: "Test User",
      email: "test@example.com",
      password: "testpassword123"
    });

    const secretKey = process.env.TOKEN_BEARER || "pinkysharkandlime";
    
    const token = jwt.sign(
      { id: testUser._id },
      secretKey,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Test user created successfully",
      user: {
        id: testUser._id,
        name: testUser.name,
        email: testUser.email
      },
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating test user", error: error.message });
  }
});

// ✅ Connect DB then start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
    
    // ✅ Generate test token when server starts
    generateTestToken();
  });
});