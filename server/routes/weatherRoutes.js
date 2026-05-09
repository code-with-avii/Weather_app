import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching weather data",
    });
  }
});

export default router;