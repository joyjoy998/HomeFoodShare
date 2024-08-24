const { MongoClient } = require("mongodb");

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  cachedClient = client;
  return client;
}
exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  const client = await connectToDatabase();
  const database = client.db("HomeFoodShare");
  const collection = database.collection("Users");

  // Find the user by email
  const user = await collection.findOne({ email });

  if (user) {
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Authentication successful
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Authentication successful",
          user: { email: user.email },
        }),
      };
    } else {
      // Incorrect password
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Incorrect password" }),
      };
    }
  } else {
    // User not found
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "User not found" }),
    };
  }
};
