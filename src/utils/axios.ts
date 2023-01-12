/**
 * Axios SetUp
 */

// Dependencies
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL =
	process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_BACKEND_URL
		: 'http://localhost:5000';

const server = async <Req, Res>(options: AxiosRequestConfig<Req>) => {
	const onSuccess = (response: AxiosResponse<Res>) => response;
	const onError = (error: any) => {
		if (error.isAxiosError && !error.response) {
			return error.toJSON();
		}
		if (error.response) {
			return error.response;
		}
		return error;
	};
	try {
		const response = await axiosInstance(options);
		return onSuccess(response);
	} catch (error) {
		return Promise.reject(onError(error));
	}
};

export default server;
