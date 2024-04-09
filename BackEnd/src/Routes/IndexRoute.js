const loginRoute = require('./loginRouter');
const appRoute = require('./appRoute');
const personnelRoute = require('./personnelRoute');
const branchRoute = require('./branchRoute');

const uriApi = '/api/v1';
function route(app){
    app.use(`${uriApi}`, loginRoute);
    app.use(`${uriApi}`, appRoute);
    app.use(`${uriApi}`, personnelRoute);
    app.use(`${uriApi}`, branchRoute);


}
module.exports = route;