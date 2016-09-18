/**
 * Created by mrsfy on 18.09.2016.
 */
var exports = module.exports = function (req, res) {
    var request = require("request");

    var url = "http://w3.bilkent.edu.tr/www/akademiktakvim/";

    var conv = {
        "Ocak": 1,
        "Şubat": 2,
        "Mart": 3,
        "Nisan": 4,
        "Mayıs": 5,
        "Haziran": 6,
        "Temmuz": 7,
        "Ağustos": 8,
        "Eylül": 9,
        "Ekim": 10,
        "Kasım": 11,
        "Aralık": 12
    };

    request(url, function (error, response, html) {
        var cheerio = require("cheerio")
        if(!error) {
            var $ = cheerio.load(html);

            var events = [];
            var txt = "";
            $("table tbody tr").each(function (i, ele) {
                var strDate = $("td", this).eq(0).text().split("\n");
                var rgx = /(\d+)\s([a-zA-Z\s\ç\Ç\ö\Ö\ş\Ş\ı\İ\ğ\Ğ\ü\Ü]+)\s(\d{4})/;


                var s = strDate[0].match(rgx);
                var e = strDate.length > 1 ? strDate[1].match(rgx) : s;
                events[i] = {
                    text: $("td", this).eq(1).text(),
                    start_date: new Date(s[3], conv[s[2]], s[1]),
                    end_date: new Date(e[3], conv[e[2]], e[1]),
                    color: "#DD8616"
                };
            });

            res.send(events);
        } else
            res("Something went wrong!");
    });

};