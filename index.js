const express = require('express');
const app = express();
const config = require("./config/config.json");

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true }));

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

app.listen(config.PORT || 5000, () => {
    console.log(`Api Server running on port ${config.PORT}`);
})