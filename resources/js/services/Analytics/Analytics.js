import axios from 'axios';


class Analytics {
  

    async getAnalytics(cloudid,cloudsecret,appurl) {

/*
        var urlString = window.location.href.toString();
        var url = new URL(urlString);
        var code = url.searchParams.get("code");

    
        if(!localStorage.getItem('analytics_access_token')){

           // console.log("no data in local storage")

            const res = await axios.request({
              url: 'https://accounts.google.com/o/oauth2/token',
              method: 'post',
              data: {
                "grant_type": "authorization_code",
                "redirect_uri": appurl,
                "client_id": cloudid,
                "client_secret": cloudsecret,
                "scope": "https://www.googleapis.com/auth/analytics.readonly",
                "code": code,
                "response_type": "code",
                "prompt":"consent",
                "access_type": "offline",
                "token_uri": "https://accounts.google.com/o/oauth2/token"
              }
            });


            //console.log("refresh data: ", res); 

    
            var token = res["data"]["access_token"];
            var refresh_token = res["data"]["refresh_token"];
    
           // console.log("refresh token: ", refresh_token); 

            localStorage.setItem('analytics_access_token', token);
            localStorage.setItem('analytics_refresh_token', refresh_token)
                
            return this.getActiveUsers(token).get();

        }
       

        else {

           */

        
console.log('NEW: 1/jv-xk261E3QdqjRiskTgAiIT1ZEyMIWIl8963BSgzV8');

            const refreshRes = await axios.request({
                baseURL: `https://accounts.google.com/o/oauth2/token`,
                method: 'post',
                data: {
                    "grant_type": "refresh_token",
                    "client_id": cloudid,
                    "client_secret": cloudsecret,
                    "refresh_token": "1/jv-xk261E3QdqjRiskTgAiIT1ZEyMIWIl8963BSgzV8"
                  }
              })

              //console.log(refreshRes)

              localStorage.setItem('analytics_access_token', refreshRes["data"]["access_token"]);
              return this.getActiveUsers(refreshRes["data"]["access_token"]).get();

       // }
    

    }


    getActiveUsers(token){

        
       return axios.create({
            baseURL: `https://www.googleapis.com/analytics/v3/data/realtime`,
            params: {
              metrics: 'rt:activeUsers',
              ids: 'ga:87202640'
            },
            headers: {
              'Authorization': "Bearer " + token,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });


    }

}

export default new Analytics();