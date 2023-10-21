<template>
  <tile :position="position">
    <h1 class="text-right">Freshdesk</h1>
    <div class="scroll-fadeout"></div>
    <div class="grid gap-padding h-full overflow-scroll absolute inner-pin">
      <ul class="align-self-center top-0 absolute mb-0">

        <a class="hover:no-underline text-default hover:text-default" target="_blank" v-for="issue in issues" :href="'https://glue-customer-support.freshdesk.com/a/tickets/' + issue.id">
        <li class="tickets hover:background-alien" v-bind:class="'priority_' + [issue.priority]">
        
          <div class="my-2">
            <p class="ticketSubj text-xl font-bold">{{issue.subject}}</p>
            <p class="text-dimmed">{{issue.name}}</p>
            <p class="underline">{{issue.email}}</p>
            <p v-if="issue.company!== ''">{{issue.company}}</p>
            <p class="text-sm text-dimmed">Due: {{issue.due}}</p>
            <p v-if="issue.pm!== ''" class="text-sm pm text-purple">{{issue.pm}}</p>

            <!--             <p>priority {{issue.priority}}</p>
            -->
          </div>
         
         
        </li>
    </a>
      
      </ul>
    </div>
  </tile>
</template>

<script>
import echo from '../mixins/echo';
import Tile from './atoms/Tile';
import Freshdesk from '../services/Freshdesk/Freshdesk';
import axios from 'axios';

export default {
    components: {
        Tile,
    },

    mixins: [echo],

    props: ['position', 'freshdesk_auth'],

    data() {
        return {
            issues: [],
        };
    },

    created() {
        this.getTickets();
        setInterval(this.getTickets, 500 * 60 * 60);
    },

    methods: {
        getTickets() {
            this.issues = [];

            Freshdesk.getIssues(this.freshdesk_auth).get().then(response => {
                for (var i = 0; i < response.data.results.length; i++) {
                    const issueData = {
                        id: '',
                        subject: '',
                        email: '',
                        name: '',
                        company: '',
                        priority: '',
                        due: '',
                        pm: '',
                    };

                    issueData.subject = response.data.results[i]['subject'];
                    issueData.priority = response.data.results[i]['priority'];
                    issueData.id = response.data.results[i]['id'];


                    var dueDate = new Date(response.data.results[i]['due_by']);
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

                    let formatted_date = dueDate.getDate() + ' ' + months[dueDate.getMonth()];
                    issueData.due = formatted_date;

                    // request PM
                    axios
                        .request({
                            baseURL:
                                `https://glue-customer-support.freshdesk.com/api/v2/agents/` +
                                response.data.results[i]['responder_id'],
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Basic " + this.freshdesk_auth,
                            },
                        })
                        .then(pmRes => {
                            issueData.pm = pmRes.data['contact']['name'];
                        });

                    // Request contact info
                    axios
                        .request({
                            baseURL:
                                `https://glue-customer-support.freshdesk.com/api/v2/contacts/` +
                                response.data.results[i]['requester_id'],
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Basic " + this.freshdesk_auth,
                            },
                        })
                        .then(contactRes => {
                            issueData.name = contactRes.data['name'];
                            issueData.email = contactRes.data['email'];

                            if (contactRes.data['company_id'] == !null) {
                                axios
                                    .request({
                                        baseURL:
                                            `https://glue-customer-support.freshdesk.com/api/v2/companies/` +
                                            contactRes.data['company_id'],
                                        method: 'get',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: "Basic " + this.freshdesk_auth,
                                        },
                                    })
                                    .then(companyRes => {
                                        issueData.company = companyRes.data['name'];
                                    });
                            } else {
                                issueData.company = '';
                            }

                            this.issues.push(issueData);
                        })
                        .then(() => (this.issues = this.issues.sort((a, b) => b.priority - a.priority)))
                        .catch(error => {
                            console.log('There was an error:', error.response);
                        });

                }
            });
        },
        getEventHandlers() {},
    },
};
</script>
