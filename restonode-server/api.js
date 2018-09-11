function api(app) {
  var mongojs = require("mongojs");

  var db = mongojs("orderManager", ["orders"]);

  var GOOGLE_API_KEY = '';

  const googleMapsClient = require("@google/maps").createClient({
    key: GOOGLE_API_KEY,
    Promise: Promise
  });

  app.post("/api/order", function(request, response) {
    console.log(request.body);
    db.orders.insert(request.body, function(err, doc) {
      if (err) console.log("Error: " + err);

      if (GOOGLE_API_KEY !== ''){
      googleMapsClient
        .distancematrix({ origins="40.6655101,-73.89188969999998",destinations=doc.lat+","+doc.lon })
        .asPromise()
        .then(response => {
          console.log(response.json.results);
        //   SAMPLE Response JSON
        //   {
        //     "destination_addresses" : [ "New York, NY, USA" ],
        //     "origin_addresses" : [ "Washington, DC, USA" ],
        //     "rows" : [
        //        {
        //           "elements" : [
        //              {
        //                 "distance" : {
        //                    "text" : "225 mi",
        //                    "value" : 361715
        //                 },
        //                 "duration" : {
        //                    "text" : "3 hours 49 mins",
        //                    "value" : 13725
        //                 },
        //                 "status" : "OK"
        //              }
        //           ]
        //        }
        //     ],
        //     "status" : "OK"
        //  }
          response.json(response.json.results.rows[0].elements[0].duration.value);
        })
        .catch(err => {
          console.log(err);
          response.json(err);
        });
    }else{
        response.json({'duration': 12122});
    }
    });
  });

  app.put("/api/order/:id", function(request, response) {
    var id = request.params.id;

    db.orders.findAndModify(
      {
        query: {
          _id: mongojs.ObjectId(id)
        },
        update: {
          $set: {
            firstName: request.body.firstName,
            middleName: request.body.middleName,
            lastName: request.body.lastName,
            phone: request.body.phone,
            email: request.body.email
          }
        },
        new: true
      },
      function(err, doc) {
        response.json(doc);
      }
    );
  });
}

module.exports = api;
