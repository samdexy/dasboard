import axios from 'axios';


class WieZijnWeek {
    getPerson() {

        return this.api();
    }

     api() {

        console.log('requesting wiezijnweek api')
       return axios.request({
           
            url: 'https://wiezijnweek-be.vm01.glue.be:3128/api/active',
            method: 'get'

        })
    }

}

export default new WieZijnWeek();