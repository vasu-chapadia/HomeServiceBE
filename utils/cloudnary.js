const cloudnary = require("cloudinary").v2;

// Configure cloudnary keys
cloudnary.config({
  cloud_name: "homeserviceprovider",
  api_key: "961495975847793",
  api_secret: "bCfvbPGJHufL2Qbi6HEE16iiWCo"
});

module.exports = cloudnary;
