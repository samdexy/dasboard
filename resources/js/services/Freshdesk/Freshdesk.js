import axios from 'axios';


class Freshdesk {

    getIssues(freshdesk_auth) {

        return axios.create({
            // status query:
            
            // 2 => openstaand

            // 3 => in behandeling (X)

            // 4 => opgelost (X)
            // 5 => gesloten (X)

            // 8 => waiting for customer update (X)

            // 9 => waiting for helpdesk update
            // 10 => re-opened

            // 11 => sent to dev (X)

            baseURL: 'https://glue-customer-support.freshdesk.com/api/v2/search/tickets?query="status:2%20OR%20status:9%20OR%20status:10"',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic " + freshdesk_auth,
            }
        });


    }

}

export default new Freshdesk();