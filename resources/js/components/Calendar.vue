<template>
  <tile :position="position">
    
    <h1 class="text-right">Agenda</h1>
    
    <div class="grid gap-padding h-full overflow-scroll absolute inner-pin">
      <ul class="align-self-center top-0 absolute mb-0">    
        <li v-for="event in events">
          <div class="my-2">
            <div :class="{ 'font-bold': withinWeek(event.date) }">{{ event.name }}</div>
            <div class="text-sm text-dimmed">{{ relativeDate(event.date) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </tile>
</template>
<script src="https://cdn.auth0.com/js/auth0/8.12.3/auth0.min.js"></script>

<script>
import echo from '../mixins/echo';
import Tile from './atoms/Tile';
import saveState from 'vue-save-state';
import { relativeDate, withinWeek } from '../helpers';
import Calendar from '../services/Calendar/Calendar.js';
import GAuth from 'vue-google-oauth2';
import Dashboard from './Dashboard'



export default {
    components: {
        Tile
    },

    mixins: [echo, saveState],

    props: ['position', 'cloudid', 'cloudsecret', 'appurl', 'apikey', 'calendarid'],

    data() {
        return {      
            events: [],
        };
    },

    created() {

       // refresh events every hour
       this.getEvents();
      // setInterval(this.getEvents, 1000 * 60 * 60);
       

    },


    mounted(){

    },

    methods: {
        relativeDate,
        withinWeek,
       
        getEvents(){


        Calendar.getEvents(this.appurl,this.cloudid,this.cloudsecret, this.apikey, this.calendarid)
            .then(response => {

                var evList = response.data['items'];

                // make new array from existing
                // pick only summary and name

                console.log('events: ',this.events);

                const strippedList = [];

                for (var i = 1; i <= Object.keys(evList).length; i++) {
                    if (evList[i]['start']['dateTime'] != null) {
                        strippedList.push({
                            name: evList[i]['summary'],
                            date: evList[i]['start']['dateTime'],
                        });
                    } else {
                        strippedList.push({
                            name: evList[i]['summary'],
                            date: evList[i]['start']['date'],
                        });
                    }

                
                    this.events = strippedList;
                }

            })
            .catch(error => {
                console.log('There was an error:', error.response);
            });
        },

        getEventHandlers() {
         
        },

        getSaveStateConfig() {
            return {
                cacheKey: 'calendar',
            };
        },
    },
};
</script>
