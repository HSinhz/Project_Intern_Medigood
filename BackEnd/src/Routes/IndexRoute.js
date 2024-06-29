const loginRoute = require('./loginRouter');
const personnelRoute = require('./personnelRoute');
const branchRoute = require('./branchRoute');
const medicineRoute = require('./medicineRoute');
const branchStoreRoute = require('./branchStoreRoute');
const purchaseRoute = require('./purchaseRoute');
const distributeRoute = require('./distributeRoute');
const reportRoute = require('./reportRoute');
const appRoute = require('./appRoute');

const uriApi = '/api/v1';
function route(app){
    app.use(`${uriApi}`, loginRoute);
    app.use(`${uriApi}`, personnelRoute);
    app.use(`${uriApi}`, branchRoute);
    app.use(`${uriApi}`, medicineRoute);
    app.use(`${uriApi}`, branchStoreRoute);
    app.use(`${uriApi}`, purchaseRoute);
    app.use(`${uriApi}`, distributeRoute);
    app.use(`${uriApi}`, reportRoute);
    app.use(`${uriApi}`, appRoute);
}
module.exports = route;