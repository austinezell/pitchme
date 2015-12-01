module.exports = {
  SECRET: (process.env.SECRET || "Secret"),
  MONGO_URL: (process.env.MONGO_URL || process.env.MONGO_URI || "mongodb://localhost/pitchMe"),
  PORT: (process.env.PORT || 3000)
}
