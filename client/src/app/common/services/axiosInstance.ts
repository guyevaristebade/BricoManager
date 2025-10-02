import axios from "axios"

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true, // Inclure les cookies dans les requêtes
})

// interceptor pour ajouter le token d'authentification à chaque requête
// ajout d’un intercepteur de requête
axios.interceptors.request.use(
	function (config) {
		// faire quelque chose avant que la requête ne soit envoyée
		const token = localStorage.getItem("token")
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`
		}
		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

// ajout d’un intercepteur de réponse
axios.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		// faire quelque chose en cas d’erreur
		if (error.response?.status === 401 && !error.config._retry) {
			// Gérer la déconnexion ici, par exemple en redirigeant vers la page de connexion

			try {
				// Essayer de rafraîchir le token

				// Si le rafraîchissement est réussi, stocker le nouveau token et réessayer la requête initiale

				error.config._retry = true
				return axiosInstance(error.config)
			} catch (error) {
				// on met à null le accessToken
				// Si le rafraîchissement échoue, rediriger vers la page de connexion
				window.location.href = "/login"
			}
		}

		return Promise.reject(error)
	},
)
