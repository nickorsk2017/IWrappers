const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 3000;

/** CORS middleware */
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}
/** App configure */
app.use(allowCrossDomain);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})
/** Send error response */
const sendResponseError = (message, type, response) => {
  response.writeHead(500, {
    'Content-type': 'application/json'
  });
  response.end(JSON.stringify({success: false, type, message: message}));
  response.send();
};
/** Send response from JSON file */
const sendResponseFromJSONFile = (filePath, response, errorData = null) => {
  if(fs.existsSync(filePath)) {
    /* Insted of doing all this */
    response.writeHead(200, {
      'Content-type': 'application/json'
    });
    const fileJSONString = fs.readFileSync(filePath, 'utf8');
    const result = {
      success: true,
      data: JSON.parse(fileJSONString)
    }
    response.end(JSON.stringify(result));
    response.send();
  } else {
    if(!errorData){
      sendResponseError('file is not found', 'file_not_found', response);
    } else {
      sendResponseError(errorData.message, errorData.type, response);
    }
  }
}
/** Server page */
app.get("/", (request, response) => {
  response.send('Server is started.')
})
/** Get films request */
app.get('/list/films', (request, response) => {
  const filePath = path.join(__dirname, 'data/vods.json');
  sendResponseFromJSONFile(filePath, response)
});
/** Get film request */
app.get('/film', (request, response) => {
  if(request.query.id){
    const idFilm = request.query.id;
    const filePath = path.join(__dirname, `data/${idFilm}.json`);
    sendResponseFromJSONFile(filePath, response, {
      message: `film with id == ${idFilm} not found.`,
      type: 'film_not_found'
    })
  } else {
    sendResponseError('id of film is undefined', 'id_undefined', response);
  }
});
/** Get countries request */
app.get('/list/countries', (request, response) => {
  const filePath = path.join(__dirname, 'data/countries-sorted.json');
  sendResponseFromJSONFile(filePath, response)
});
