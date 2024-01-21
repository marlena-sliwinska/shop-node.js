const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFundController = require('./controllers/404');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFundController.get404);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
