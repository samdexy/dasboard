<template>
  <tile :position="position">
    
    <h1 class="text-right">Harvest projects</h1>
    <div class="scroll-fadeout"></div>
    <div class="grid gap-padding h-full overflow-scroll absolute inner-pin">
        <div class="top-0 absolute mb-0 w-full">
          <ul v-for="proj in projects" class="projects">
            <li>
                <p class="font-bold text-xl projName">{{proj.name}}</p>
                <div class="percentageBar w-full"></div>
                <div class="percentageBarOverlay" :style="(proj.remaining >= 100) ? { 'width': '0%' } : { 'width': 'calc(' + '100% - ' + proj.remaining  + '%' + ')'}"></div>
                <p class="block float-right text-right w-1/2 text-dimmed">{{proj.remaining}}%</p>
                <p class="block float-left w-1/2 text-dimmed">{{proj.hours}} van {{proj.budget}} uur</p>
            </li>
          </ul>
        </div>
    </div>

  </tile>
</template>

<script>
import echo from '../mixins/echo';
import Tile from './atoms/Tile';
import HarvestProjects from '../services/HarvestProjects/HarvestProjects';
import axios from 'axios';

export default {
    components: {
        Tile,
    },

    mixins: [echo],

    props: ['position','harvest_account_id', 'harvest_auth'],

    data() {
        return {
            projects: []
        };
    },

    created() {

        // refresh harvest projects data after 5 mins
        this.getAllPages();
        setInterval(this.getAllPages, 50000);

    },

    methods: {
        
        getAllPages(){

            this.projects = []
            let pageNum;
            HarvestProjects.getPages(this.harvest_account_id, this.harvest_auth).get().then(res => {

            pageNum = res['data']['total_pages'];
        }).finally(() => {


        for(let p = 1; p <= pageNum; p++){

              this.getHarvest(p);

        }
        })
        },
        getHarvest(p) {

            HarvestProjects.getProjects(p,this.harvest_account_id, this.harvest_auth).get().then(response => {

                let projList = response['data']['projects'];

                for (var i = 0; i < Object.keys(projList).length; i++) {
                    if (projList[i]['budget'] !== null && projList[i]['budget_is_monthly'] == false && projList[i]['budget'] !== 0) {

                        //every project where budget !== null

                        const projectData = {
                            id: '',
                            name: '',
                            budget: '',
                            hours: 0,
                            remaining: 0
                        };


                        projectData.id = projList[i]['id'];
                        projectData.name = projList[i]['name'];
                        projectData.budget = projList[i]['budget'];


                            axios
                                .request({
                                    baseURL: 'https://api.harvestapp.com/v2/time_entries',
                                    method: 'get',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Harvest-Account-Id': this.harvest_account_id,
                                        Authorization:
                                            'Bearer ' + this.harvest_auth,
                                    },
                                    params: {
                                        project_id: projList[i]['id']
                                    },
                                })
                                .then(entryRes => {
                            
                                    var entryList = entryRes['data']['time_entries'];


                                    if (entryList.length != 0) {

                                        for (var o = 0; o < entryList.length; o++) {

                                            projectData.hours += Number((entryList[o]['hours']));

                                        }

                                         projectData.hours = parseFloat(projectData.hours.toFixed(10))


                                            let rem = Math.round((projectData.hours/Number(projectData.budget))*100);
                                            projectData.remaining = rem;

                                            if(rem >= 50){
                                               this.projects.push(projectData);
                                            }
                                        
                                    }
                                }).finally(() => {
                                    this.projects = this.projects.sort((a, b) => b.remaining - a.remaining);
                                   // console.log(this.projects)

                                });
                        

                    }
                }
            });



        },
        getEventHandlers() {},
    },
};
</script>
