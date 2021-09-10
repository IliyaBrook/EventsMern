const useRequest = async (url = '', method = 'GET', body = null, token = null) => {
	try {
		const headers = {}
		if (body) {
			body = JSON.stringify(body)
			headers['Content-Type'] = 'application/json'
		}
		if (token) {
			headers['Authorization'] = 'Bearer ' + token
		}
		const response = await fetch(url, {method, body, headers})
		if (!response.ok) {
			return response.json()
		}
		return response.json()
	} catch (error) {
		return error
	}
}
export default useRequest