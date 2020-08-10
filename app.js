
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname)));

app.post('/subscribe', (req, res) =>{
    const { email, js} = req.body;  
    console.log(req.body);

    const mcData = {
        members: [
            {
                email_adress: email,
                status: 'pending'
            }
        ]
    }
    
    const mcDataPost = JSON.stringify(mcData);

    const options = {
        url: 'https://us17.api.mailchimp.com/3.0/lists/f3eda7eb09',
        post: 'POST',
        headers: {
            Authorization: 'auth a7d6f25561972fb9c820df4a2f9b98da-us17'
        },
        body: mcDataPost
    }
    
    if (email){
        request(options, (err, response, body) =>{
            if(err){
                res.json({error: err})
            }else{
                if (js){
                    res.sendStatus(200);
                }else{
                    res.redirect('/success.html')
                }
            }
        })
    }else {
        res.status(404).send({message: 'failed'})
    }

})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('server started'));