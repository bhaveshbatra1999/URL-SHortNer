var express = require('express');

var URLData = require('../model/URL_Data.js');

var crypto = require("crypto");
/* To generate random code of (bytes*2) digits */

class URL {
     saveURLdata(data, cb)
     {
        /* before saving the inputs in mongodb, we will check that the data already exists or not? 
            to  avoid duplicacy in database of same Long URL's
        */

        /* LongURL is in db and data.longURL is what user inputs */
        URLData.findOne({LongURL : data.longURL}, (err,found)=> {
            if(err)
            return cb({Status:"err", Msg:"Error while finding data."});
            else if(found)
            {
                /* if found then sendnack via urldata (long and short urls) from the db to print 
                which are there already */
                return cb({status:"suc", Msg:"Data Already Exist", urldata:found});
            }
            /* if not found i.e. else so now save the data in mongoDB while 
            generate short ULR with the help of crypto */
            else
            {
                let urlData = {
                    LongURL : data.longURL,
                    ShortURL : crypto.randomBytes(3).toString('hex')
                };
                var urldata = URLData(urlData);                                                
                urldata.save((err, done)=> { /* mongoDB function .save */
                    if(err)
                    return cb({ Status:"err", Msg: err});
                    else
                    {
                        /* now sendback the data via urldata to print */
                        return cb({ Status:"suc", Msg: "Data is saved", urldata:done})                     
                    }
                });
            }
        });
    }

    redirectURL(data, cb)
    { /* now we will find short url in the mongoDB, here ShortURL is in db 
        and data have the value of req.params.id */                
        URLData.findOne({ ShortURL : data }, (err,found)=> {
            if(err)
                return cb({status:"err", Msg:"Error While Finding Data"});
            else if(!found)
                return cb({status:"err", Msg:"No Data Found."});
            else 
            /* if ShortURL is found in DB then sendback the data (long & short URL's) 
            via urldata to print and create redirect  */
                return cb({status:"suc", Msg:"Data Found Successfully", urldata:found})
        });
    }
};
module.exports = URL;