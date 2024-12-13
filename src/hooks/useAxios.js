/** @format */

import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useAxios = () => {
	async function getData(path) {
		if (path) {
			const response = await axios.get(`${baseUrl}/${path}`);
			return response.data;
		}
	}

	async function postData(path, data) {
		if (path && data) {
			const response = await axios.post(`${baseUrl}/${path}`, data);
			return response.data;
		}
	}

	async function editData(path, id, data) {
		if (path && id && data) {
			const response = await axios.put(`${baseUrl}/${path}/${id}`, data);
			return response.data;
		}
	}

	async function deleteData(path, id) {
		if (path && id) {
			const response = await axios.delete(`${baseUrl}/${path}/${id}`);
			return response.data;
		}
	}

	return { getData, postData, editData, deleteData };
};
