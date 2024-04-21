const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Jobs Gonjo server Is Running");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a5mfktt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

async function run() {
  try {
    await client.connect();

    const usersCollection = client.db("jobsGonjo").collection("users");
    const categoriesCollection = client
      .db("jobsGonjo")
      .collection("categories");
    const subCategoriesCollection = client
      .db("jobsGonjo")
      .collection("subcategories");
    const myAppliedCollection = client.db("jobsGonjo").collection("myapplied");

    // jwt validation
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    // user management
    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const updatedDoc = {
        $set: user,
      };
      const result = await usersCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/users/:email", async (req, res) => {
      const { email } = req.params;

      try {
        const user = await usersCollection.findOne({ email });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json({ user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/categories", async (req, res) => {
      const result = await categoriesCollection.find().toArray();
      res.send(result);
    });

    app.get("/categoriesFilter", async (req, res) => {
      try {
        const { location } = req.query;
        console.log("hit", location);
        const filter = location
          ? { availableLocations: { $in: [location] } }
          : {};
        const jobs = await categoriesCollection.find(filter).toArray();
        res.json(jobs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/categories", verifyJWT, async (req, res) => {
      const singleCategories = req.body;
      const result = await categoriesCollection.insertOne(singleCategories);
      res.send(result);
    });

    app.delete("/categories/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await categoriesCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/mycategories/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await subCategoriesCollection.find(query).toArray();
      res.send(result);
    });

    // sub categories collection
    app.get("/subcategories", async (req, res) => {
      const result = await subCategoriesCollection.find().toArray();
      res.send(result);
    });

    app.post("/subcategories", verifyJWT, async (req, res) => {
      const subCategory = req.body;
      const result = await subCategoriesCollection.insertOne(subCategory);
      res.send(result);
    });

    app.delete("/subcategories/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await subCategoriesCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/subcategories/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const subCategory = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          companyName: subCategory.companyName,
          subCategoryName: subCategory.subCategoryName,
          overview: subCategory.overview,
          responsibilities: subCategory.responsibilities,
          requirements: subCategory.requirements,
          qualifications: subCategory.qualifications,
          companyName: subCategory.companyName,
          officeLocation: subCategory.officeLocation,
          location: subCategory.location,
          salary: subCategory.salary,
          type: subCategory.type,
          level: subCategory.level,
          shift: subCategory.shift,
        },
      };
      const result = await subCategoriesCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/mysubcategories/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const result = await subCategoriesCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/deleteMany", verifyJWT, async (req, res) => {
      try {
        const { categoryName } = req.body;

        const result = await subCategoriesCollection.deleteMany({
          categoryName,
        });

        res.json({
          deletedCount: result.deletedCount,
          message: "Items deleted successfully",
        });
      } catch (error) {
        console.error("Error during deleteMany operation:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // apply job
    app.get("/subcategories/:subcategoryId", async (req, res) => {
      const { subcategoryId } = req.params;

      try {
        const subcategory = await subCategoriesCollection.findOne({
          _id: new ObjectId(subcategoryId),
        });

        if (subcategory) {
          res.json(subcategory);
        } else {
          res.status(404).json({ error: "Subcategory not found" });
        }
      } catch (error) {
        console.error("Error fetching subcategory data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.put(
      "/applySubcategories/:subcategoryId",
      verifyJWT,
      async (req, res) => {
        const { subcategoryId } = req.params;
        const { email, ...restOfData } = req.body;
        console.log("hit",req.params);
        try {
          const subcategory = await subCategoriesCollection.findOne({
            _id: new ObjectId(subcategoryId),
          });

          if (!subcategory) {
            return res
              .status(404)
              .json({ success: false, message: "Position not found" });
          }
          const emailExists = subcategory.applicantsList.some(
            (applicant) => applicant.email === email
          );
          if (emailExists) {
            return res.status(400).json({
              success: false,
              message: "You have already applied for this position",
            });
          }

          const result = await subCategoriesCollection.updateOne(
            { _id: new ObjectId(subcategoryId) },
            { $addToSet: { applicantsList: { email, ...restOfData } } }
          );

          if (result.modifiedCount === 1) {
            res.json({
              success: true,
              message: "Application submitted successfully",
            });
          } else {
            res
              .status(500)
              .json({ success: false, message: "Internal Server Error" });
          }
        } catch (error) {
          console.error("Error updating subcategory data:", error);
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
      }
    );

    app.put("/myApplication/:position", async (req, res) => {
      const subCategoryName = req.params.position;
      const poistion = req.body;
      const query = { subCategoryName: subCategoryName };
      const options = { upsert: true };
      const updatedDoc = {
        $set: poistion,
      };
      const result = await myAppliedCollection.updateOne(
        query,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/myApplication/:identifier", verifyJWT, async (req, res) => {
      try {
        const identifier = req.params.identifier;
        const query = { $or: [{ email: identifier }, { name: identifier }] };
        const result = await myAppliedCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.delete("/myApplication/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await myAppliedCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`From jobs server running port is ${port}`);
});
