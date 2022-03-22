const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  req.user = {
    _id: '623a2be363004f14f6c84dd1',
  };
  next();
});

app.use((req, res, next) => {
  res.status(404).send({ message: 'Страница не найдена' });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-template-curly-in-string
  console.log('App listening on port ${PORT}');
});
