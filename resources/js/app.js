import Vue from 'vue';
import db from './indexeddb';
import collect from 'collect.js';
import axios from 'axios';

const app = new Vue({
    el: '#app',
    data: {
        newGoal: '',
        goals: []
    },
    created: async function () {
        this.goals = await db.goals.toArray();
    },
    methods: {
        async addGoal(event) {
            event.preventDefault();
            const goal = {
                goal: this.newGoal,
                column: 'A'
            };
            axios.post('/goals/add', goal)
                .then(function (response) {
                    console.log('response', response);
                })
                .catch(function (error) {
                    console.log('error', error);
                })
            this.goals.push(goal);
            await db.goals.add(goal);
            this.newGoal = '';
        },
        async deleteGoal(goal) {
            this.goals = collect(this.goals).filter(function (value, key) {
                return value.id !== goal.id;
            }).all();
            axios.get('/goals/'+goal.id+'/delete').then(response => console.log(response));
            await db.goals.delete(goal.id);
        }
    }
});