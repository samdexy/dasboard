<template>
  <tile :position="position">
    <div class="grid gap-padding h-full markup">
      <div
        class="grid justify-items-center h-full"
        style="grid-template-rows: auto 1fr auto;"
      >
        <div class="markup">
          <h1 class=" text-pink">Wie zijn week</h1>
        </div>
        <div
          class="text-white text-3xl align-self-center font-bold tracking-wide leading-none text-shadow"
        >{{ person.name }}</div>

      </div>

       <div class="">
          <div class="float-left">
            <p class="text-white leading-none mb-0">last week</p>
            <p class="text-pink leading-tight mb-0">{{ lastPerson}}</p>
          </div>
          <div class="float-right text-right">
            <p class="text-white leading-none mb-0">next week</p>
            <p class="text-pink leading-tight mb-0">{{ nextPerson}}</p>
          </div>
        </div>
    </div>
  </tile>
</template>

<script>
import echo from '../mixins/echo';
import Tile from './atoms/Tile';
import WieZijnWeek from '../services/WieZijnWeek/WieZijnWeek';
import axios from 'axios';

export default {
    components: {
        Tile,
    },

    mixins: [echo],
    props: ['position'],

    data() {
        return {
            person: {
                name: '',
                order: '',
            },
            lastPerson: '',
            nextPerson: '',
        };
    },

    created() {


        WieZijnWeek.getPerson().then(response => {
            this.person.name = response.data.firstName;
            this.person.order = response.data.order;

           // console.log(this.person.order);

            axios.request({
                    url: 'http://wiezijnweek-be.vm01.glue.be:3128/api/users',
                    method: 'get',
                }).then(res => {
                    //console.log(res.data.users);

                    for (let i = 0; i < res.data.users.length; i++) {

                       // console.log(res.data.users[i].firstName);

                        if (res.data.users[i].order == this.person.order - 1) {

                            this.lastPerson = res.data.users[i].firstName;
                        } else if (res.data.users[i].order == this.person.order + 9) {
                            this.lastPerson = res.data.users[i].firstName;
                        }
                        else if (res.data.users[i].order == this.person.order + 1) {
                            this.nextPerson = res.data.users[i].firstName;
                        } 

                    }
                });
        });
    },
    mounted() {},

    methods: {
        getEventHandlers() {},
    },
};
</script>
