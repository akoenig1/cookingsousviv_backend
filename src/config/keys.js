import 'dotenv/config'

const GOOGLE_TOKENS = {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET
}

const DB_USER = process.env.MONGO_DB_USERNAME
const DB_PASSWORD = process.env.MONGO_DB_PW
const DB_NAME = process.env.MONGO_DB_NAME
const MONGO_DB = {
    MONGO_DB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.hhgkn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
}

const SESSION = {
    COOKIE_KEY: 'cookiemonster'
}

const CLIENT = {
    HOME_PAGE_URL:  (process.env.NODE_ENV === 'development')
                    ? 'http://localhost:3000'
                    : 'http://cookingsousviv.com',
}

const SERVER = {
    SERVER_URL: (process.env.NODE_ENV === 'development')
                ? 'http://localhost:5000'
                : 'https://cookingsousviv-backend.herokuapp.com',
}

const KEYS = {
    ...GOOGLE_TOKENS,
    ...MONGO_DB,
    ...SESSION,
    ...CLIENT,
    ...SERVER
}

export default KEYS

