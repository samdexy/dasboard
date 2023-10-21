<template>
  <tile :position="position">
    <div class="grid gap-padding h-full markup">
      <div class="grid gap-2 justify-items-center h-full" style="grid-template-rows: auto 1fr auto;">
        <div class="markup">
          <h1 class="text-right">Glue.be visitors</h1>
        </div>

        <div class="align-self-center font-bold text-4xl tracking-wide leading-none">{{ ActiveUsers }}</div>
      </div>
    </div>
  </tile>
</template>

<script>
import echo from '../mixins/echo';
import Tile from './atoms/Tile';
import Analytics from '../services/Analytics/Analytics';
import axios from 'axios';

export default {
    components: {
        Tile,
    },

    mixins: [echo],

    props: ['position','cloudid','cloudsecret', 'appurl'],

    data() {
        return {
            ActiveUsers: '',
        };
    },
created(){
      this.refreshTime();
      setInterval(this.refreshTime, 5000);

},
    mounted() {
        
    },

    methods: {

      refreshTime() {
        Analytics.getAnalytics(this.cloudid,this.cloudsecret, this.appurl).then(response => {

            this.ActiveUsers = response.data.totalsForAllResults['rt:activeUsers'];

        });
        },
        getEventHandlers() {},
    },
};
</script>
