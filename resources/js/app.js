import Vue from 'vue';
import db from '../../database';
import collect from 'collect.js';

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
            this.goals.push(goal);
            await db.goals.add(goal);
            this.newGoal = '';
        },
        async deleteGoal(goal) {
            this.goals = collect(this.goals).filter(function (value, key) {
                return value.id !== goal.id;
            }).all();
            await db.goals.delete(goal.id);
        }
    }
});