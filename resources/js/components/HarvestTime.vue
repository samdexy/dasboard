<template>
  <tile :position="position">
    <div class="markup">
      <h1 class="text-right">Harvest time logs</h1>
    </div>
    <div class="grid gap-padding h-full overflow-scroll">
      <table class="table">
        <tbody>
          <tr v-for="log in logs">
            <td class="text-dimmed">
              <a
                class="text-default hover:text-purple"
                target="_blank"
                :href="'https://glue1.harvestapp.com/team/' + log.id"
              >{{log.name}}</a>
            </td>

            <td :style="(log.hours < 8) ? { 'color': '#E14647' } : { 'color': 'default' }">
              <b>{{log.hours}}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </tile>
</template>

<script>
import echo from '../mixins/echo';
import Tile from './atoms/Tile';
import HarvestTime from '../services/HarvestTime/HarvestTime';
import axios from 'axios';
import { constants } from 'fs';

export default {
    components: {
        Tile,
    },

    mixins: [echo],

    props: ['position', 'harvest_account_id', 'harvest_auth'],

    data() {
        return {
            results: [],
            logs: [],
        };
    },

    created() {
        this.getHarvest();

        // refresh harvest data after 5 mins
        // setInterval(this.getHarvest, 50000);
    },

    methods: {
        getHarvest() {
            this.logs = [];
            this.results = [];

//            console.log('Loading harvest logs...');

            HarvestTime.getHours(this.harvest_account_id, this.harvest_auth)
                .get()
                .then(response => {
                    var dataList = response['data']['time_entries'];
                    const strippedList = [];

                    for (var i = 0; i < Object.keys(dataList).length; i++) {
                        if (dataList[i]['user']['id'] != '2295234') {
                            strippedList.push({
                                id: dataList[i]['user']['id'],
                                name: dataList[i]['user']['name'],
                                hours: dataList[i]['hours'],
                            });

                            this.results = strippedList;
                        }
                    }
                })
                .finally(() => {
                    var inputArray = this.results,
                        outputArray = [];

                    inputArray.forEach(function(e) {
                        if (!this[e.name]) {
                            this[e.name] = { name: e.name, hours: 0 };
                            outputArray.push(this[e.name]);
                        }
                        this[e.name].hours += Number(e.hours);
                        this[e.name].id = e.id;
                        this[e.name].hours = parseFloat(this[e.name].hours.toFixed(10));
                    }, {});



                    axios.request({
                            baseURL: 'https://api.harvestapp.com/v2/users',
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                'Harvest-Account-Id': this.harvest_account_id,
                                Authorization: 'Bearer ' + this.harvest_auth,
                            },
                        })
                        .then(userRes => {

                          // TO CHECK vvvvvvvvv

                            let employeeList = [];


                            for (let i = 0; i < userRes.data.users.length; i++) {
                            

                            if(userRes.data.users[i].is_active == true && userRes.data.users[i].id != '2295234' && userRes.data.users[i].id != '2763501' && userRes.data.users[i].id != '2337808'){
                            employeeList.push({
                                id: userRes.data.users[i].id,
                                name: userRes.data.users[i].first_name,
                                hours: 0
                            });

                            }
                          }

                              for(var u = 0; u < employeeList.length; u++) {

                                  for(var p = 0; p < outputArray.length; p++) {

                
                                    if(employeeList[u].id == outputArray[p].id){

                                        employeeList[u].hours = outputArray[p].hours

                                    }

                              
                                } 

                                // console.log('employeelist: ',employeeList)
                              
                            } 

                           

                          
                            

                            // TO CHECK ^^^^^^^^^
                            this.logs = employeeList.sort((a, b) => a.hours - b.hours);
                        });
                });
        },
        getEventHandlers() {},
    },
};
</script>
