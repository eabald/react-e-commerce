const express = require('express')
const cors = require('cors')
const bodyPareser = require('body-parser')
const path = require('path')
const compression = require('compression')
const enforce = require('express-sslify')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
const port = process.env.PORT || 5000

app.use(compression())
app.use(bodyPareser.json())
app.use(bodyPareser.urlencoded({ extended: true }))
app.use(cors())

if(process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/build', 'index.html')))
}


app.listen(port, error => {
  if(error) throw error
  console.log('Server running on port ' + port)
})

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  }

  stripe.charges.create(body, (stripeError, stripeResponse) => {
    if (stripeError) {
      res.status(500).send({ error: stripeError })
    } else {
      res.status(200).send({ success: stripeResponse })
    }
  })

})
