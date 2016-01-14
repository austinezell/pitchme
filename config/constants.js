module.exports = {
  JWT_SECRET: (process.env.JWT_SECRET || "Secret"),
  MONGO_URL: (process.env.MONGO_URL || process.env.MONGOLAB_URI || "mongodb://localhost/pitchMe"),
  PORT: (process.env.PORT || 3030)
}
