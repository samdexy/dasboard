import axios from 'axios';


class Tasks {


  async getTasks(cloudid,cloudsecret,appurl, sheetskey) {

    /*
      var urlString = window.location.href.toString();
      var url = new URL(urlString);
      var code = url.searchParams.get("code");

      if(!localStorage.getItem('sheets_access_token')){

          const res = await axios.request({
            url: 'https://accounts.google.com/o/oauth2/token',
            method: 'post',
            data: {
              "grant_type": "authorization_code",
              "redirect_uri": appurl,
              "client_id": cloudid,
              "client_secret": cloudsecret,
              "scope": "https://www.googleapis.com/auth/spreadsheets.readonly",
              "code": code,
              "response_type": "code",
              "prompt":"consent",
              "access_type": "offline",
              "token_uri": "https://accounts.google.com/o/oauth2/token"
            }
          });


          var token = res["data"]["access_token"];
          var refresh_token = res["data"]["refresh_token"];
  
          localStorage.setItem('sheets_access_token', token);
          localStorage.setItem('sheets_refresh_token', refresh_token)
          

          return this.getSheets(token, sheetskey).get();

      }
      

      else {

        */
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

            localStorage.setItem('sheets_access_token', refreshRes["data"]["access_token"]);
            return this.getSheets(refreshRes["data"]["access_token"], sheetskey).get();

            

     // }
  

  }


  getSheets(token, sheetskey){

    return axios.create({
      
      baseURL: 'https://sheets.googleapis.com/v4/spreadsheets/'+ sheetskey +'/values/Blad1!A1:I6',
      headers: {
          'Authorization': "Bearer " + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
  
  });


  }

}

export default new Tasks();