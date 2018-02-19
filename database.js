import Dexie from 'dexie';

const db = new Dexie('goalsetter');
db.version(1).stores({
    goals: '++id, goal, column'
});

export default db;