const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LabReservationSystem', (err) => {
    if(!err)
        console.log('MongoDB LabReservationSystem connection succeeded...');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});



module.exports = mongoose;
console.log('hell8');
