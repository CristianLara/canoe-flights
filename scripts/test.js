var travelpayoutsAPI =  require ( 'travelpayouts' );
var tapi =  travelpayoutsAPI ({token :  '37c94b5f979be2ee74f0cd9a9d9be5b7' });

tapi.prices.cheap({
    origin: 'SFO',
    destination: '-',
    depart_date: '2018-03-10',
    //return_date: '2018-03-25',
    currency:  'USD' ,
    //page: '1',
}, function ( err , result ) {
    if (err) throw err;
    //result = JSON.stringify(result, null, 2);
    //console.log (result);
    var array = [];
    for (key in result) {
        array.push(key);
        //console.log(key);
    }
    console.log(array);
    console.log(array.length);
    //console.log(result);
    //for (key in Object.keys(result)) {
    //    console.log(key);
    //}

    //console.log(Object.keys(result).length);
});

/*tapi.prices.latest({
    currency: 'usd',
    period_type: 'year',
    page: 1,
    limit: 30,
    show_to_affiliates: true,
    sorting: 'price',
    trip_class: 0
}, function (err, result) {
    if (err) throw err;
    console.log(result);
});*/
