const { json } = require('body-parser');
const express = require('express');
const UserProfile = require('../models/userProfile');

const router = express.Router();
router.get('/', (req, res) => {

    UserProfile.find({ })
        .then((data) => {
        res.json(data);
        })
        .catch((error) => {
        console.log('error: ', daerrorta);
        })
    
    
})
router.post('/save', (req, res )=> {
    const data = req.body;
    const newUserProfile = new UserProfile(data);
    newUserProfile.save((error)=>{
        if (error) {
            res.status(500).json({msg: ' internal server errors'});
        } else {
            return res.json({
                msg: 'We have recieved data'
            });
        }
    })
    
})


module.exports = router;