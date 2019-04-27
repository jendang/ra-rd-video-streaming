import axios from 'axios'

// link to server/DB
export default axios.create({
    baseURL: "http://localhost:3001"
})