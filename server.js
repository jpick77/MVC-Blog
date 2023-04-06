const path = require('path');
const express = require('express');
const session = require('express-session');
const { engine } = require('./node_modules/express-handlebars/dist');
const routes = require('./Develop/controllers');

const sequelize = require('./Develop/config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
// const PORT = process.env.PORT || 3001;

// const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./Develop/views"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./Develop/public")));
// app.use('/', serveStatic(path.join(__dirname, "./Develop/public")))

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
