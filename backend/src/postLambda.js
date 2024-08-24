const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid"); // Used to generate a unique post_id

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
  try {
    const formData = JSON.parse(event.body); // Parse the JSON data
    const { description, code, tags, email } = formData;

    const client = await connectToDatabase();
    const database = client.db("HomeFoodShare");
    const collection = database.collection("Posts");

    // Generate a unique post_id
    const post_id = uuidv4();

    // Get the current date
    const create_date = new Date().toISOString();

    // Construct the data to be inserted
    const postData = {
      post_id: post_id,
      image: formData.photos, // Image data may need to be stored in some way, such as URLs returned after storing in S3
      address_code: code,
      description: description,
      tag: tags,
      useremail: email,
      create_date: create_date,
    };

    // Insert the data into MongoDB
    await collection.insertOne(postData);

    // Return a success response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        success: true,
        message: "Post created successfully",
        data: postData,
      }),
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        success: false,
        message: "Failed to create post",
      }),
    };
  }
};
