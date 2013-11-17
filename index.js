var http = require('http'),
    router = require('route-emitter').createRouter(),
    request = require('hyperquest'),
    port = process.env.WENDIGO_PORT || 7654,
    bigfoot = process.env.BIGFOOT || 'http://localhost:8165',
    sasquatch = process.env.SASQUATCH || 'http://localhost:5450',
    yeren = process.env.YEREN || 'http://localhost:7353',
    yowie = process.env.YOWIE || 'http://localhost:7031'

router.listen('*', 'docs', function (req, res) {
  var method = req.method.toLowerCase()
  req.pipe(request[method](bigfoot)).pipe(request[method](sasquatch))
})

router.listen('*', 'users', function (req, res) {
  var method = req.method.toLowerCase()
  req.pipe(request[method](bigfoot)).pipe(request[method](yeren))
})

router.listen('*', 'stats', function (req, res) {
  var method = req.method.toLowerCase()
  req.pipe(request[method](bigfoot)).pipe(request[method](yowie))
})

http.createServer(router.route).listen(port)
