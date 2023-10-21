import axios from 'axios';


class HarvestTime {
  
  getHours(harvest_account_id, harvest_auth) {

    var start = new Date();
    var yesterdayStart = start.setDate(start.getDate() - 1);
    start.setHours(2, 0, 0, 0);
    
    var yStart = new Date(yesterdayStart);

    var end = new Date();
    var yesterdayEnd = end.setDate(end.getDate() - 1);
    end.setHours(25, 59, 59, 999);

    var yEnd = new Date(yesterdayEnd);


    return axios.create({

      baseURL: 'https://api.harvestapp.com/v2/time_entries',
      headers: {
        'Content-Type': 'application/json',
        'Harvest-Account-Id': harvest_account_id,
        'Authorization': "Bearer " + harvest_auth,
      },
      params: {
        from: yStart.toISOString(),
        to: yEnd.toISOString(),
      },
    });


  }


}

export default new HarvestTime();