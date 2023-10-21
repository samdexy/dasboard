<template>
  <tile :position="position">


               <div class="markup">
      <h1 class="text-right">Tasks</h1>
      </div>
<div class="grid gap-padding h-full overflow-scroll">

       <table class="table">
         <tbody>
          <tr v-for="task in tasks">
              <td class="text-dimmed">{{ task.employee }}</td>       
              <td>

                <ul class="taskList" v-for="item in task.taskList">
                  <li>{{ item }}</li>
                </ul>
                
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
import Tasks from '../services/Tasks/Tasks';
import axios from 'axios';

export default {
    components: {
        Tile,
    },

    mixins: [echo],

    props: ['position','cloudid','cloudsecret', 'appurl', 'sheetskey'],

    data() {
        return {
             tasks:[]
        };
    },

    created() {
        this.getTasks();
        // refresh om de 4 uur 
        //setInterval(this.getTasks(), 3600000*12);
    },

    methods: {
        getTasks() {
            this.tasks = [];
            Tasks.getTasks(this.cloudid,this.cloudsecret, this.appurl, this.sheetskey).then(response => {

              for (let i = 0; i < response.data.values.length; i++) {

              if(i == 0){
                  for (let e = 0; e < response.data.values[0].length; e++) {

                    let newTask = {
                            employee: '',
                            order: 0,
                            taskList: []
                        };
                   
                    newTask.employee = response.data.values[0][e];
                    newTask.order = e;

                    this.tasks.push(newTask)
                  }

             }

            else { 
              for (let k = 0; k < response.data.values[i].length; k++) {

                for (let u = 0; u < this.tasks.length; u++){

                      if(k == this.tasks[u].order){

                       // console.log(response.data.values[i][k])
                    
                        if(!response.data.values[i][k] == ""){
                        this.tasks[u].taskList.push(response.data.values[i][k]);

                        }


                      }
                }
              }
            }                    

                }

            });
        },
        getEventHandlers() {},
    },
};
</script>
