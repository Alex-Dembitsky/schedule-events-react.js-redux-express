const config = {
    database: "mongodb://localhost:27017/calendar_events_db",
    port: process.env.PORT || 8080,
    secret: "verysecretword"
};

module.exports = config;