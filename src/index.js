const config = require('./common/config/env.config.js');

const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const PacksRouter = require('./packs/routes.config');
const EmojiRouter = require('./emojis/routes.config');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

PacksRouter.routesConfig(app);
EmojiRouter.routesConfig(app);
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);

app.listen(config.port, function() {
    console.log('App listening at port %s', config.port);
});