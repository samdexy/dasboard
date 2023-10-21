<template>

    <div
        class="fixed pin grid gap-spacing w-screen h-screen p-spacing font-normal leading-normal text-default bg-screen"
        :class="mode"
    >

        <slot></slot>
    </div>
</template>

<script>
import echo from '../mixins/echo';
import saveState from 'vue-save-state';
import axios from 'axios';
import Dashboard from '../services/Dashboard/Dashboard.js';


export default {


    
    mixins: [echo, saveState],
    props: ['appurl','cloudid', 'cloudsecret'],


    data() {
        return {
            mode: 'light-mode',
        };
    },

mounted(){
    
// TO DO:
// Code for automatic Google authorization 
// vvvvvvvvvvvvvvvvvv

/*
if(!localStorage.getItem('events_access_token') && localStorage.getItem('analytics_access_token') && localStorage.getItem('sheets_access_token')){

  if (window.location.href == this.appurl + '/'){
         
        let host = 'https://accounts.google.com/o/oauth2/auth?';
        let scope = 'https://www.googleapis.com/auth/analytics.readonly+https://www.googleapis.com/auth/spreadsheets.readonly+https://www.googleapis.com/auth/calendar.events';
        let access_type = 'offline';
        let response_type = 'code';
        let uri = host + 'scope=' + scope + '&response_type=' + response_type + '&access_type=' + access_type + '&redirect_uri=' + this.appurl +'&client_id=' + this.cloudid;

        window.location.href = uri;

        setTimeout(function(){ 
            
        var urlString = window.location.href.toString();
        var url = new URL(urlString);
        var code = url.searchParams.get("code");

            axios.request({
                            baseURL: `https://accounts.google.com/o/oauth2/token`,
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
                        }).then(res => {

                             let refToken = res["data"]["refresh_token"];
                             // TO DO: put refresh token in .env file, replace hardcoded refresh tokens with this env value

                        })
        }, 5000);

 }   

}
*/

// ^^^^^^^^^^^^^^^^^

 
},
    methods: {
        getEventHandlers() {
            
        },

        getSaveStateConfig() {
            return {
                cacheKey: `dashboard`,
            };
        },
    }
};
</script>
