const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const sequalize = require('./utils/database'); // class or constructor function - capital letter
const Product = require('./models/product');
const User = require('./models/user');
const CartItem = require('./models/cart-item');
const Cart = require('./models/cart');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// midlewares will start after incoming request
app.use((req, res, next) => {
  return User.findByPk(1)
    .then((user) => {
      // user is sequlize object with the utility methods
      // new field in request object
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFundController = require('./controllers/404');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFundController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequalize
  .sync() // define relations as we define above
  //.sync({ force: true })
  // forcing - overiding table - onli on odevelopment mode
  .then(() => User.findByPk(1))
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Basia', email: 'basia@wp.pl' });
    }
    return Promise.resolve(user);
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
