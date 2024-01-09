const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(cors())
app.use(bodyParser.json())

  app.post("/login", (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/',
        clientId: '9b210a400aa5497a94ef800a2d466e69',
        clientSecret: 'bb92315cb92041dab86937a33e6f9c7f',
      })
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })

  app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3000/',
      clientId: '9b210a400aa5497a94ef800a2d466e69',
      clientSecret: 'bb92315cb92041dab86937a33e6f9c7f',
      refreshToken,
    })
  
    spotifyApi
      .refreshAccessToken()
      .then(data => {
        res.json({
          accessToken: data.body.accessToken,
          expiresIn: data.body.expiresIn,
        })
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
  })


app.listen(4000);