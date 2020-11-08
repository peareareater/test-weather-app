import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

const app = express();

dotenv.config();

const PORT = 8000;
const weatherApiKey = process.env.WEATHER_API_KEY;

enum Statuses {
  bad_request = 400,
  ok = 200,
  not_found = 404,
}
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:8080" }));

app.get("/api/now", (req, res) =>
  res.status(Statuses.ok).json({ now: Date.now() })
);

app.post("/api/sort", (req, res) => {
  const { array, uniq } = req.body;
  if (array.length > 100 || !array.length) {
    return res
      .status(Statuses.bad_request)
      .json({ message: "Array length must be between 0 and 100" });
  }
  let sortedArr = array.sort((a: number, b: number) => (a > b ? 1 : -1));
  if (uniq) {
    sortedArr = Array.from(new Set(sortedArr));
  }
  res.status(Statuses.ok).json({ array: sortedArr });
});

app.get("/api/weather", async (req, res) => {
  const { city, lon, lat } = req.query;
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}`;
  if (city) {
    url = `${url}&q=${city}`;
  } else if (lon && lat) {
    url = `${url}&lon=${lon}&lat=${lat}`;
  } else {
    return res
      .status(Statuses.bad_request)
      .json({ city: "Query is not provided" });
  }
  try {
    const result = await axios.get(url);
    res.json({ result: result.data });
  } catch (e) {
    return res
      .status((e.response && e.response.data.cod) || Statuses.bad_request)
      .json({ message: e.message });
  }
});

app.post("/api/weather-multiple", async (req, res) => {
  const { favourites } = req.body;
  if (!favourites) {
    return res.status(Statuses.bad_request);
  }

  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherApiKey}`;
    const result = await Promise.all<any>(
      favourites.map(async (f: { lon: number; lat: number }) => {
        const res = await axios.get(`${url}&lon=${f.lon}&lat=${f.lat}`);
        return res.data;
      })
    );
    res.json({ result });
  } catch (e) {
    return res
      .status((e.response && e.response.data.cod) || Statuses.bad_request)
      .json({ message: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Up at ${PORT}`);
});
