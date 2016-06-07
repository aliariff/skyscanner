var spawn = require('child_process').spawn
var start = new Date(2016, 8, 1)
var end = new Date(2016, 8, 30)

function pad(n) {
    return (n < 10) ? ('0' + n) : n
}

var scrap = function(date) {
    ps = spawn('node', ['scrapper.js', date])

    ps.stdout.on('data', function(stream) {
        console.log(stream.toString())
    })

    ps.stderr.on('data', function(stream) {
        console.log(stream.toString())
    })

    ps.on('exit', function(code) {
        console.log('child process exited with code ' + code + ' ' + date)
    })
}

for (d = start; d <= end; d.setDate(d.getDate() + 1)) {
    date = new Date(d)
    stringDate = date.toLocaleDateString()
    stringDate = stringDate.split('/')
    year = stringDate[2].slice(-2)
    month = pad(stringDate[0])
    day = pad(stringDate[1])
    formatted = year + month + day
    scrap(formatted)
}
