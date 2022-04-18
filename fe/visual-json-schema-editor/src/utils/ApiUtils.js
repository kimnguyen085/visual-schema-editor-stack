import axios from 'axios';

const apiConfig = {
    baseUrl: process.env.REACT_APP_API_BASE_URL ? process.env.REACT_APP_API_BASE_URL : 'http://localhost:8080',
};

class ApiUtils {
	constructor() {
		this.saveSchemaPath = '/api/json/save';
	}

	saveJsonSchema(requestData) {
		return new Promise((resolve, reject) => {
			const url = apiConfig.baseUrl + this.saveSchemaPath;
			const data = {
				...requestData
			};
			axios
				.post(url, data)
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					console.error(error);
					reject(error);
				});
		});
	}
}
const apiUtils = new ApiUtils();

export default apiUtils;