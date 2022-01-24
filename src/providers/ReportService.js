import axios from 'axios';
import Config from '../config';
import SessionProvider from './SessionProvider';

const authToken = SessionProvider.getToken();
let headers = {
    'Content-Type': 'application/json'
};

if (SessionProvider.isValid()) {
    headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': 1,
        'X-Content-Type-Options': 'nosniff',
    }
}

class ReportService {
    static async getReports() {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            headers: headers,
            url: `${Config.API.BASE_URL}/reports`,
        }).then(json => json.data)
            .then(res => {
                const { success, data } = res;
                if (success) {
                    return data || [];
                }
                return [];
            })
    }

    static async getReport(id) {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            headers: headers,
            url: `${Config.API.BASE_URL}/reports/${id}`,
        }).then(json => json.data)
            .then(res => {
                const { success, data } = res;
                if (success) {
                    return data || {};
                }
                return {};
            })
    }
    static async generateReports(id) {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            headers: headers,
            url: `${Config.API.BASE_URL}/reports/${id}/generate`,
        }).then(json => json.data)
            .then(res => {
                const { success, data } = res;
                if (success) {
                    return data || [];
                }
                return [];
            })
    }
}
export default ReportService;
