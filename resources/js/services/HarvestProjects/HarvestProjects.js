import axios from 'axios';


class HarvestProjects {
  getProjects(page, harvest_account_id, harvest_auth) {

    return axios.create({

      baseURL: 'https://api.harvestapp.com/v2/projects',
      headers: {
        'Content-Type': 'application/json',
        'Harvest-Account-Id': harvest_account_id,
        'Authorization': 'Bearer ' + harvest_auth,
      },
      params: {
          page: page
      }
    });

  }


  getPages(harvest_account_id, harvest_auth) {

    return axios.create({

      baseURL: 'https://api.harvestapp.com/v2/projects',
      headers: {
        'Content-Type': 'application/json',
        'Harvest-Account-Id': harvest_account_id,
        'Authorization': 'Bearer ' + harvest_auth,
      }
    });

  }


}

export default new HarvestProjects();