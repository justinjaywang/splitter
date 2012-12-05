var express = require('express');

var app = exports.app = express.createServer();
exports.port = process.env.PORT || 3600;

// // using the .html extension instead of having to name the views as *.ejs
// app.engine('.html', require('ejs').__express);
// set folder where the pages are kept
app.set('views', __dirname + '/views');
// avoids having to provide the extension to res.render()
app.set('view engine', 'ejs');

app.use('/css/', express.static(__dirname + '/css'));
app.use('/js/', express.static(__dirname + '/js'));
app.use('/images/', express.static(__dirname + '/images'));
app.use('/touch-icons/', express.static(__dirname + '/touch-icons'));
app.use('/splash/', express.static(__dirname + '/splash'));
app.use('/font/', express.static(__dirname + '/font'));

/* functions */
function formatTime(timeString) {
  // takes date 2007-01-08 and returns January 8, 2007
  var values = timeString.split("-");
  var year = values[0];
  var i = parseInt(values[1])-1;
  var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  var month = months[i];
  var date = parseInt(values[2]);
  return month + ' ' + date + ', ' + year;
}

/* data */
// groups
var groups = [
  { name: 'Camping trip', members: ['Adam', 'Becky', 'Cindy', 'David'], email:['adam@splitter.com','becky@splitter.com','cindy@splitter.com','david@splitter.com'],
    summary: [ 
      { person: 'Adam', paid: '18.30', share: '85.37', balance: '-67.07', owes: [{ person: 'Cindy', amount: '67.07'}], is_owed: [] },
      { person: 'Becky', paid: '6.05', share: '85.37', balance: '-79.32', owes: [{ person: 'Cindy', amount: '79.32'}], is_owed: [] },
      { person: 'Cindy', paid: '286.60', share: '85.37', balance: '201.23', owes: [], is_owed: [{ person: 'Adam', amount: '67.07' }, { person: 'Becky', amount: '79.32' }, { person: 'David', amount: '54.87' }] },
      { person: 'David', paid: '30.50', share: '85.37', balance: '-54.87', owes: [{ person: 'Cindy', amount: '54.87'}], is_owed: [] }
    ],
    payments: [
    { date: '2012-12-02', list: [
      { amount: '46.30', description: 'Gas', payer: 'Cindy', split: 'Everyone', id: 7 }
      ]},
    { date: '2012-12-01', list: [
      { amount: '5.50', description: 'Marshmallows', payer: 'Adam', split: 'Everyone', id: 6 },
      { amount: '12.80', description: 'Sausages', payer: 'Adam', split: 'Everyone', id: 5 },
      { amount: '6.05', description: 'S\'mores', payer: 'Becky', split: 'Everyone', id: 4 }
      ]},
    { date: '2012-11-29', list: [
      { amount: '30.50', description: 'Firewood', payer: 'David', split: 'Everyone', id: 3 },
      { amount: '205.00', description: 'Campsite', payer: 'Cindy', split: 'Everyone', id: 2 },
      { amount: '35.30', description: 'Gas', payer: 'Cindy', split: 'Everyone', id: 1 }
      ]}
    ] 
  },
  { name: 'Roommates', members: ['Eddie', 'Fred', 'George'],email:['eddie@splitter.com','fred@splitter.com','george@splitter.com'],
    summary: [ 
      { person: 'Eddie', paid: '80.00', share: '50.00', balance: '30.00', owes: [], is_owed: [{ person: 'Fred', amount: '30.00' }] },
      { person: 'Fred', paid: '10.00', share: '50.00', balance: '-40.00', owes: [{ person: 'Eddie', amount: '30.00'}, { person: 'George', amount: '10.00' }], is_owed: [] },
      { person: 'George', paid: '60.00', share: '50.00', balance: '10.00', owes: [], is_owed: [{ person: 'Fred', amount: '10.00' }] }
    ],
    payments: [
    { date: '2012-12-13', list: [
      { amount: '30.00', description: 'Groceries', payer: 'Eddie', split: 'Everyone', id: 5 }
      ]},
    { date: '2012-12-10', list: [
      { amount: '10.00', description: 'Dish soap and sponges', payer: 'Fred', split: 'Everyone', id: 4 }
      ]},
    { date: '2012-12-08', list: [
      { amount: '50.00', description: 'Internet bill', payer: 'Eddie', split: 'Everyone', id: 3 },
      { amount: '35.00', description: 'Groceries', payer: 'George', split: 'Everyone', id: 2 }
      ]},
    { date: '2012-12-01', list: [
      { amount: '25.00', description: 'Water bill', payer: 'George', split: 'Everyone', id: 1 }
      ]}
    ]
  },
  { name: 'Holiday party', members: ['Henry', 'Irene', 'Jack', 'Kelly', 'Laura'],email:['henry@splitter.com','irene@splitter.com','jack@splitter.com','kelly@splitter.com','laura@splitter.com'],
    summary: [ 
      { person: 'Henry', paid: '7.00', share: '10.52', balance: '-3.52', owes: [{ person: 'Laura', amount: '3.52'}], is_owed: [] },
      { person: 'Irene', paid: '10.00', share: '10.52', balance: '-0.52', owes: [{ person: 'Laura', amount: '0.52'}], is_owed: [] },
      { person: 'Jack', paid: '0.00', share: '10.52', balance: '-10.52', owes: [{ person: 'Kelly', amount: '2.58'}, { person: 'Laura', amount: '7.94'}], is_owed: [] },
      { person: 'Kelly', paid: '13.10', share: '10.52', balance: '2.58', owes: [], is_owed: [{ person: 'Jack', amount: '2.58'}] },
      { person: 'Laura', paid: '22.50', share: '10.52', balance: '11.98', owes: [], is_owed: [{ person: 'Henry', amount: '3.52'}, { person: 'Jack', amount: '0.52'}, { person: 'Irene', amount: '7.94'}] }
    ],
    payments: [
    { date: '2012-12-12', list: [
      { amount: '10.00', description: 'Decorations', payer: 'Irene', split: 'Everyone', id: 5 },
      { amount: '12.00', description: 'Party favors', payer: 'Laura', split: 'Everyone', id: 4 }
      ]},
    { date: '2012-12-10', list: [
      { amount: '13.10', description: 'Drinks', payer: 'Kelly', split: 'Everyone', id: 3 },
      { amount: '10.50', description: 'Snacks', payer: 'Laura', split: 'Everyone', id: 2 },
      { amount: '70.00', description: 'Fruit', payer: 'Henry', split: 'Everyone', id: 1 }
      ]}
    ]
  }
];

// empty group
var empty_group = { name: '', members: [], summary: [], payments: [] };

/* routing */
// groups level
app.get('/', function(req, res){
  res.render('groups', {
    pageTitle: 'Groups',
    groups: groups
  });
});
app.get('/add-group', function(req, res){
  res.render('edit-group', {
    pageTitle: 'New Group',
    group: empty_group
  });
});
// within a group
groups.forEach(function(groupObj){
  var name_linkified = groupObj.name.replace(/\s/g, '-').toLowerCase();
  // group home
  app.get('/'+name_linkified, function(req, res){
    res.render('group-home', {
      pageTitle: groupObj.name,
      group: groupObj,
      payments: groupObj.payments,
      summary: groupObj.summary,
      name_linkified: name_linkified,
      formatTime: formatTime
    });
  });
  // individual summary for each member in a group
  groupObj.summary.forEach(function(personObj){
    var person_linkified = personObj.person.replace(/\s/g, '-').toLowerCase();
    app.get('/'+name_linkified+'/user/'+person_linkified, function(req, res){
      res.render('person-summary', {
        pageTitle: personObj.person,
        name: groupObj.name,
        name_linkified: name_linkified,
        person: personObj.person,
        person_linkified: person_linkified,
        paid: personObj.paid,
        share: personObj.share,
        balance: personObj.balance,
        owes: personObj.owes,
        is_owed: personObj.is_owed
      });
    })
    app.get('/'+name_linkified+'/user/'+person_linkified+'/add', function(req, res){
      res.render('edit-payment', {
        pageTitle: 'New payment',
        name_linkified: name_linkified,
        date: '',
        amount: '',
        description: '',
        payer: personObj.person,
        split: 'Everyone'
      });
    })
  })
  // payments within group
  groupObj.payments.forEach(function(payment_by_date){
    var date = payment_by_date.date;
    payment_by_date.list.forEach(function(paymentObj){
      app.get('/'+name_linkified+'/payment/'+paymentObj.id, function(req, res){
        res.render('edit-payment', {
          pageTitle: 'Edit Payment',
          name_linkified: name_linkified,
          date: date,
          amount: paymentObj.amount,
          description: paymentObj.description,
          payer: paymentObj.payer,
          split: paymentObj.split
        });
      });
    })
  })
  // edit group
  app.get('/'+name_linkified+'/edit', function(req, res){
    res.render('edit-group', {
      pageTitle: 'Edit Group',
      group: groupObj
    });
  });
  // add payment in page
  app.get('/'+name_linkified+'/add', function(req, res){
    res.render('edit-payment', {
      pageTitle: 'New Payment',
      date: '',
      name_linkified: name_linkified,
      amount: '',
      description: '',
      payer: 'No one',
      split: 'Everyone'
    });
  });
})

if (!module.parent) {
  app.listen(exports.port);
  console.log('EJS Demo server started on port ' + exports.port);
}