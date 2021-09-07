var mongoose = require('mongoose');

/* Creating schema named URL in MONGO DB */
var URL = mongoose.Schema({
    LongURL:
    {
        type:String
    },
    ShortURL:
    {
        type:String
    },
    Added_Date:
    {
        type: Date,
        default: Date.now
    }
});
module.exports = URL = mongoose.model('URL', URL);

/* .model create table of multiple rows, 'URL'  is the table name, 
URL is a entry */

