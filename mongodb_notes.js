//  Mongo CRUD
//  CRUD - Mongo - SQL
//  Create - Insert - Insert
//  Read - Find - Select 
//  Update - Update - Update
//  Dalete - Remove - Delete

//  Inserting docs

doc = {"name", "Smith", "age": 30, "profession": "hacker"};
db.people.insert(doc);
db.people.find(); // all documents in the collection people
//  Primary key _id is unmutable

//  Get one random document from the collection
db.people.findOne();

//  Query
db.people.findOne({"name" : "Jones"});
// First argument: what to find
// Second argument: what to get from database
db.people.findOne({"name" : "Jones"}, {"name" : true, "_id" : false});

for (i = 0; i < 1000; i++) {
	names = ["exam", "essay", "quiz"];
	for (j = 0; j < 3; ++j) {
		db.scores.insert({"student" : i, 
			"type" : names[j] : Math.round(Math.random() * 100)});
	}
}

// Get all documents and show in readable way
db.scored.find().pretty();
db.scores.find({ student: 19, type : "essay" }, {"score" : true, "_id" : false});

// Using $gt, $lt, $gte, $lte
// Score should be greater than 95
db.scores.find( { score : { $gt : 95}});
db.scores.find( { score : { $gt : 95, $lte 98}, type : "essay"});

// Can work with  string, using lexicographic order
db.scores.find( { name: { $lt : "D", $gt "B"}});

// $exists, $type
db.people.find( {profession : { $exists: true}});
db.people.find( {profession : { $exists: false}});
db.people.find( {name : {type : 2}}); // type 2 is string type
db.people.find( {name: {$regex : 'a'}});

// using $or

db.people.find({ $or : [ {name : {regex : 'e$'}, {age : { $exists: true}}}]});

// $and
db.people.find({ $and : [{name : {$gt : 'c'}, name : {$regex : 'a'}]});
// the same as
db.people.find({name : {$gt : 'c', $regex : 'a'}});

//  Quering inside array
db.accounts.insert({ name: "Howard", favorites : ["pretzels", "beer"]});
db.accounts.insert({ name: "George", favorites : ["ice cream", "pretzels"]});

// also will watch for "pretzels" inside array
db.accounts.find( {favorites : "pretzels"})

// Using $in and $all
// order doesn't metters, document must contain both
db.accounts.find({ favorites : {$all : ["pretzels", "beer"]}});
// document must contain one of them
db.accounts.find({ favorites : {$in : ["Howard", "John"]}});

// Querying with dot notation
db.users.insert({name : "richard", email: {work: "richard@10gen.com",
	personal: kreuter@example.com}});
// Access to embded field
db.users.find({email.work : "richard@10gen.com"});

// Querying, Cursors
cur = db.people.find();
cur.hasNext();
cur.next();
cur.limit(5); // return 5 documents

// Counting
db.scores.count({ type: 'exam'});

// Update
// First argument - what to find
// Second argument - to what replace document, previous version will be lost
db.people.update({ name: 'Smith'}, {name: 'Thompson', salary : 1});

// Using $set comand
// update document, age will be updated in previous version
// if there is no field age - it will be crated
db.people.update({name: "Alice"}, {$set: {age: 30}});
// Increment age field, if there is no field - will create new value with value of increment step.
db.peiple.update({name: "Alice"}, {$inc: {age: 1}});

// $unset command, will remove field from the document
// Value after profession - is any value, mongodb will ignore it
db.people.update({name : "Jones"}, {$unset : {profession : 1}});

// Manipulation arrays inside the document
db.arrays.insert({ _id: 0 }, a : [1, 2, 3, 4, 5]});
// $set can change the value of the individual array item, usin syntax array.indext
db.arrays.update({ _id: 0 }, { $set : {"a.2", 5 }});
// $push add new element to the array
db.arrays.update({ _id: 0 }, { $push : { a : 6 }});
// $pop remove the most right element of the array
db.arrays.update({ _id: 0 }, { $pop : { a : 1 }});
// $pop with negative argument will remove the left most element
db.arrays.update({ _id: 0 }, { $pop : { a : -1 }});
// $pushAll - add multiple elements
db.arrays.update({ _id: 0 }, { $pushAll : { a : [ 7, 8, 9 ] }});
// $pull - remove any value from the array, in this sample - remove integer 5
db.arrays.update({ _id: 0 }, { $pull : { a : 5 }});
// $pullAll - remove list of elements
db.arrays.update({ _id: 0 }, { $pullAll : { a : [5, 6, 7] }});
// $addToSet - add element to array only if there is no such item
db.arrays.update({ _id: 0 }, { $addToSet : { a : 5 }});

// Upserts
// update existing document, or create new document
db.people.update({ name: George}, { age: 40 }, { upsert : true });