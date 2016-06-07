var args = process.argv

if (args.length === 2) {
    console.log('Try to pass some arguments when invoking this script!')
    return
}

var Nightmare = require('nightmare')
var nightmare = Nightmare({
    waitTimeout: 60000,
    show: false
})
var from = 'cgk'
var to = 'fran'
var date = args[2]
var url = 'https://www.skyscanner.co.id/transportasi/penerbangan/' + from + '/' + to + '/' + date
console.log('Loading ' + url)

nightmare
    .goto(url)
    .wait(function() {
        text = $('.day-list-count').first().text()
        return text.indexOf('hasil') > -1
    })
    .evaluate(function() {
        var result = {}
        var airline = $('.day-list-item').find('.big-airline img').attr('alt')
        var price = $('.day-list-item').find('.mainquote-price')[0].text
        result['airline'] = airline
        result['price'] = price
        return result
    })
    .end()
    .then(function(result) {
        result['date'] = date
        console.log(JSON.stringify(result))
    })
    .catch(function(error) {
        console.error('Search failed:', error)
    })
