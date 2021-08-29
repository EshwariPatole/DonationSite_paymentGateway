const express = require('express')

const bodyParser = require('body-parser')

const path = require('path')

const PUBLISHABLE_KEY = "pk_test_51JRdrRSJOGpKxwXwmy39IK6TwGOu78ibFfQZo1Dka2AYHYuQHW2tj0KGaR9Mc2ZUhfdCFJXy6oGQDbpj5gBqpylj00K8vsckp4"

const SECRET_KEY = "sk_test_51JRdrRSJOGpKxwXwduPR492wJchv6rterJtGiV1QcdXsgh0kHjsUrz0vXN5xv3vVTA5HakUDprktwukgWGLb7qcj008UDcnRGo"

const stripe = require('stripe')(SECRET_KEY) 

const app = express()

app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json())

app.set("view engine","ejs")
const PORT = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.render('Home',{
        key:PUBLISHABLE_KEY
    })
})


app.post('/payment', (req, res) => { 
    
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Educate The Poor', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 10000,    // Charing Rs 100
            description: 'Web Development Product', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        console.log(charge)
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 


app.listen(PORT,() => {
    console.log(`App is listening on ${PORT}`)
})