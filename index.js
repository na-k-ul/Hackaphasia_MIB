import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to handle input from OpenLayers page
app.post("/process", (req, res) => {
  const { data } = req.body; // Capture the input from the frontend
  console.log("Data received:", data);

  // Respond back to the client
  res.json({ success: true, message: "Data processed successfully" });
});

app.get("/", (req,res) => {
  res.redirect("http://localhost:5173/");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
