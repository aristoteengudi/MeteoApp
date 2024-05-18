import axios from "axios";
import CONFIG from "../../configs/config";


const sendSms = async (error_) => {
    const config = {
        headers: {
            'Authorization': 'App '+CONFIG.INFOBIP_API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    const data = JSON.stringify({
        messages: [
            {
                destinations: [{ to: '243813530472' }],
                from: 'ServiceSMS',
                text: 'Please check Your App. we have this error '+error_
            }
        ]
    });

    try {
        const response = await axios.post(CONFIG.INFOBIP_ENDPOINT, data, config);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const runSendSMS = params => {
    return sendSms(params)
}