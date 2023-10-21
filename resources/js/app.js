import './bootstrap.js';
import Echo from 'laravel-echo';
import Vue from 'vue';
import Vue2Filters from 'vue2-filters'
import BootstrapVue from 'bootstrap-vue'
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Statistics from './components/Statistics';
import InternetConnection from './components/InternetConnection';
import TeamMember from './components/TeamMember';
import TimeWeather from './components/TimeWeather';
import Freshdesk from './components/Freshdesk';
import timetrack from './components/HarvestTime';
import wiezijnweek from './components/WieZijnWeek';
import projects from './components/HarvestProjects';
import Analytics from './components/Analytics';
import Trains from './components/Trains';
import Twitter from './components/Twitter';
import Uptime from './components/Uptime';
import Velo from './components/Velo';
import TileTimer from './components/TileTimer';
import Tasks from './components/Tasks';
import GAuth from 'vue-google-oauth2'
import ajax from "vuejs-ajax"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueFirestore from 'vue-firestore';



Vue.config.productionTip = false;


new Vue({
    el: '#dashboard',

    components: {
        Dashboard,
        Calendar,
        Statistics,
        InternetConnection,
        TeamMember,
        TimeWeather,
        Trains,
        Twitter,
        timetrack,
        projects,
        wiezijnweek,
        Uptime,
        Velo,
        TileTimer,
        VueFirestore,
        Freshdesk,
        Analytics,
        Tasks,
        BootstrapVue

    },

    created() {
        let config = {
            broadcaster: 'pusher',
            key: window.dashboard.pusherKey,
            wsHost: window.location.hostname,
            wsPath: window.dashboard.clientConnectionPath,
            wsPort: window.dashboard.wsPort,
            disableStats: true,
        };

        if (window.dashboard.environment === 'local') {
            config.wsPort = 6001;
        }

        this.echo = new Echo(config);
    },
});

Vue.use(ajax, Vue2Filters)

