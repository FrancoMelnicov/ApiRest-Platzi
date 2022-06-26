const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT || 3000;
const  { logsErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

//permite recibir informacion de tipo json en las peticiones
app.use(express.json());

//cors
const whitelist = ['http://localhost:4200'];
const options = {
  origin: (origin, callback) => {
    (whitelist.includes(origin) || !origin) ? callback(null, true) : callback(new Error('Acceso no permitido'))
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send("Server en puerto 3000");
})

app.listen(port, () => {
  console.log('Puerto corriendo en:', port)
})

//router
routerApi(app);

//middlewares
app.use(logsErrors);
app.use(boomErrorHandler)
app.use(errorHandler);
