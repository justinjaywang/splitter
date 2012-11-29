var express = require('express')
    , app = module.exports = express();

// using the .html extension instead of having to name the views as *.ejs
app.engine('.html', require('ejs').__express);
// set folder where the pages are kept
app.set('views', __dirname + '/views');
// avoids having to provide the extension to res.render()
app.set('view engine', 'html');

app.use('/css/', express.static(__dirname + '/css'));
app.use('/js/', express.static(__dirname + '/js'));
app.use('/images/', express.static(__dirname + '/images'));

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
  { name: 'Camping trip', members: ['Adam', 'Becky', 'Cindy', 'David'], payments: [
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
  ] },
  { name: 'Roommates', members: ['Eddie', 'Fred', 'George'], payments: [
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
  ] },
  { name: 'Holiday party', members: ['Henry', 'Irene', 'Jack', 'Kelly', 'Laura'], payments: [
    { date: '2012-12-12', list: [
      { amount: '10.00', description: 'Decorations', payer: 'Irene', split: 'Everyone', id: 5 },
      { amount: '12.00', description: 'Party favors', payer: 'Laura', split: 'Everyone', id: 4 }
    ]},
    { date: '2012-12-10', list: [
      { amount: '13.10', description: 'Drinks', payer: 'Kelly', split: 'Everyone', id: 3 },
      { amount: '10.50', description: 'Snacks', payer: 'Laura', split: 'Everyone', id: 2 },
      { amount: '70.00', description: 'Fruit', payer: 'Henry', split: 'Everyone', id: 1 }
    ]}
  ] }
];
// empty group
var empty_group = { name: '', members: [], payments: [] };
// summary

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
      payments: groupObj.payments,
      pageTitle: groupObj.name,
      group: groupObj,
      name_linkified: name_linkified,
      formatTime: formatTime
    });
  });
  // edit payments
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
      group: groupObj,
      payment: [],
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
  app.listen(8080);
  console.log('EJS Demo server started on port 8080');
}