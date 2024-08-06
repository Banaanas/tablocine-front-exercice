import Fastify from "fastify"
import fs from "fs"
import path from "path"
import cors from "@fastify/cors"

const fastify = Fastify({
  logger: true
})

// Determine the allowed origin based on the environment
const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production"

const allowedOrigins = isProduction
  ? ["https://traace-table.vercel.app"] // Production origin
  : ["http://localhost:3000"] // Local development origin

// Register CORS plugin
fastify.register(cors, {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  methods: ["GET", "POST"] // Allow specific methods
})

// Helper function to simulate random delay
function randomDelay(maxDelay) {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * maxDelay) // Random delay up to maxDelay ms
    setTimeout(resolve, delay)
  })
}

// Helper function to simulate errors
function maybeThrowError(probability) {
  const shouldThrow = Math.random() < probability // Probability of throwing an error
  if (shouldThrow) {
    throw new Error("Fake server error")
  }
}

// Route handler
fastify.get("/", async (request, reply) => {
  try {
    // Set defaults and read query parameters
    const maxDelay = parseInt(request.query.maxDelay, 10) || 4000
    const errorProbability = parseFloat(request.query.errorProbability) || 0.1

    await randomDelay(maxDelay)
    maybeThrowError(errorProbability)

    // Read movies data from db.json file
    const filePath = path.resolve("db.json")
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8")).movies

    // Pagination
    const limit = parseInt(request.query.limit, 10) || data.length
    const offset = parseInt(request.query.offset, 10) || 0

    // Filtering
    let filteredData = data
    if (request.query.filter) {
      const [key, value] = request.query.filter.split("=")
      filteredData = filteredData.filter(item => item[key]?.toLowerCase().includes(value.toLowerCase()))
    }

    // Sorting
    if (request.query.sortBy) {
      const sortProperty = request.query.sortBy
      filteredData = filteredData.sort((a, b) => {
        if (typeof a[sortProperty] === "string") {
          return a[sortProperty].localeCompare(b[sortProperty])
        }
        return b[sortProperty] - a[sortProperty]
      })
    }

    // Apply pagination
    const paginatedData = filteredData.slice(offset, offset + limit)
    return reply.send({
      movies: paginatedData,
      total: filteredData.length
    })
  } catch (error) {
    // Improved error handling
    fastify.log.error(error)
    return reply.status(500).send({ error: "Internal Server Error" })
  }
})

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" })
    fastify.log.info(`Server is running at http://localhost:${process.env.PORT || 3000}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
