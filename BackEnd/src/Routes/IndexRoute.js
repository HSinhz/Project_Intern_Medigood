const loginRoute = require('./loginRouter');
const appRoute = require('./appRoute');
const personnelRoute = require('./personnelRoute');
const branchRoute = require('./branchRoute');
const medicineRoute = require('./medicineRoute');
const branchStoreRoute = require('./branchStoreRoute');

const uriApi = '/api/v1';
function route(app){
    app.use(`${uriApi}`, loginRoute);
    app.use(`${uriApi}`, appRoute);
    app.use(`${uriApi}`, personnelRoute);
    app.use(`${uriApi}`, branchRoute);
    app.use(`${uriApi}`, medicineRoute);
    app.use(`${uriApi}`, branchStoreRoute);
    



}
module.exports = route;