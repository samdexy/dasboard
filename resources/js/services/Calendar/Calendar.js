import axios from 'axios';


class Calendar {


/*

   async getEvents(appurl,cloudid,cloudsecret, apikey, calendarid) {

    var urlString = window.location.href.toString();
    var url = new URL(urlString);
    var code = url.searchParams.get("code");

    var token = "";

    const res = await axios.request({
      url: 'https://accounts.google.com/o/oauth2/token',
      method: 'post',
      data: {
        "grant_type": "authorization_code",
        "redirect_uri": appurl,
        "client_id": cloudid,
        "client_secret": cloudsecret,
        "scope": "https://www.googleapis.com/auth/calendar.events",
        "code": code,
        "response_type": "code",
        "access_type": "offline",
        "token_uri": "https://accounts.google.com/o/oauth2/token"
      }
    });

    token = res["data"]["access_token"];

console.log('CAL TOKEN',token)

    var today = new Date();
    var todayRCF = today.toISOString();

    var addMonth = new Date(today.setMonth(today.getMonth()+1))

    
    var addMonthRCF = addMonth.toISOString(); 


    const response = await axios.request({
      baseURL: 'https://content.googleapis.com/calendar/v3/calendars/'+ calendarid +'/events',
      method: 'get',
      params: {
        key: apikey,
        timeMax: addMonthRCF,
        timeMin: todayRCF,
        singleEvents: true,
        orderBy: 'startTime'
      },
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;

  } 
*/
  




async getEvents(appurl,cloudid,cloudsecret,apikey,calendarid)  {

  /*
  var urlString = window.location.href.toString();
  var url = new URL(urlString);
  var code = url.searchParams.get("code");

  if(!localStorage.getItem('events_access_token')){

    const res = await axios.request({
      url: 'https://accounts.google.com/o/oauth2/token',
      method: 'post',
      data: {
        "grant_type": "authorization_code",
        "redirect_uri": appurl,
        "client_id": cloudid,
        "client_secret": cloudsecret,
        "scope": "https://www.googleapis.com/auth/calendar.events",
        "code": code,
        "response_type": "code",
        "prompt":"consent",
        "access_type": "offline",
        "token_uri": "https://accounts.google.com/o/oauth2/token"
      }
    });


    console.log("CALENDAR RES: ",res)

      var token = res["data"]["access_token"];
      var refresh_token = res["data"]["refresh_token"];

      localStorage.setItem('events_access_token', token);
      localStorage.setItem('events_refresh_token', refresh_token)
      

      return this.getRefreshEvent(token, sheetskey, calendarid).get();


      

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


    localStorage.setItem('events_access_token', refreshRes["data"]["access_token"]);
    return this.getRefreshEvent(refreshRes["data"]["access_token"], apikey, calendarid).get();

  

//  }


}




getRefreshEvent(token, apikey, calendarid){

    var today = new Date();
    var todayRCF = today.toISOString();
    var addMonth = new Date(today.setMonth(today.getMonth()+1))
    var addMonthRCF = addMonth.toISOString(); 

    return axios.create({
      baseURL: 'https://content.googleapis.com/calendar/v3/calendars/'+ calendarid +'/events',
      method: 'get',
      params: {
        key: apikey,
        timeMax: addMonthRCF,
        timeMin: todayRCF,
        singleEvents: true,
        orderBy: 'startTime'
      },
      headers: {
        'Authorization': "Bearer " + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

}




}

export default new Calendar();