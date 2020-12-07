const neo4j = require("neo4j-driver");

const driver = neo4j.driver("bolt://localhost:11010",neo4j.auth.basic("neo4j","1234"));

module.exports = driver;