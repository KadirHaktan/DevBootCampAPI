
const NodeGeoCoder=require('node-geocoder')

const options={
    provider:"mapquest",
    httpAdapter:'https',
    apiKey:"VmodZ27KtFQDNK6GtETDhI8Jc2PIKzA5",
    formatter:null
}

const nodegeoCoder=NodeGeoCoder(options)

module.exports=nodegeoCoder
