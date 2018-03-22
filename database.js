var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/goalsetter');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const goalSchema = mongoose.Schema({
    goal: String,
    column: String
});
const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;