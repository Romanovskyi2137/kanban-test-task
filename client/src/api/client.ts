import axios from 'axios'

const { VITE_API_URL } = import.meta.env

if (!VITE_API_URL) {
	throw new Error('VITE_API_URL environment variable is not set')
}

const apiClient = axios.create({
	baseURL: `${VITE_API_URL}/api/`,
	headers: {
		'Content-Type': 'application/json'
	}
})

export default apiClient
