import axios from 'axios';
export const FetchApiPost = async (url, params) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        const urlSearchParams = new URLSearchParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key]) {
                    urlSearchParams.append(key, params[key]);
                }
            });
        }

        if (params == undefined) params = {};

        const response = await axios({
            method:  "POST",
            url: url,
            data: params,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        });
        if (response.status != 200) {
            throw response.result;
        }

        return response.data;
    } catch (error) {
        alert(error)
    }
};
export const FetchApiGet = async (url, params) => {
    try {
        // Json Data를 URLSearchParams Data로 변환
        const urlSearchParams = new URLSearchParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key]) {
                    urlSearchParams.append(key, params[key]);
                }
            });
        }
        console.log(urlSearchParams.toString());
        if (params == undefined) params = {};

        const response = await axios({
            method:  "GET",
            url: url,
            data: urlSearchParams,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
        });
        if (response.status != 200) {
            throw response.result;
        }

        return response.data;
    } catch (error) {
        alert(error)
    }
};