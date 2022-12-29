import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS  } from '../constants/config'

import { getAccessToken } from '../utils/common-utils';

const API_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "Accept": "application/json, form-data", 
    }
});


axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        //stop global loader
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(ProcessError(error))
    }
)


/////////////////////////////////
//if success  ---> return (isSuccess:true,data:object)
//if fail --> return (isfailure:true, status:string, msg:string, code:init)

const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}


//if success  ---> return (isSuccess:true,data:object)
//if fail --> return (isfailure:true, status:string, msg:string, code:init)

const ProcessError = async (error) => {
    if (error.response) {
        // response made and responded with a status other 
        //that falls out of the range
        console.log('ERROR IN RESPONSE:', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }

    } else if (error.request) {
        //Request made but no response was recevied
        console.log('ERROR IN REQUEST:', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ''
        }


    } else {
        //something happend in the setting up request that trigger error
        console.log('ERROR IN NETWORK:', error.toJSON())
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ''
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },

            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }

        })
}

export { API };