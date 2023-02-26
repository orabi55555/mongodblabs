//Data Modelling
//embedded document
{
  _id: <ObjectId>,
  userName: "xyz",
  contact:{
    "phone": "1223",
    "email": "iti@example.com"
  },
  access: {
    level: 5,
    group: dev
  }

}

// References
//user document
{
  _id: <ObjectId1>,
  "userName": "xyz"
}
//contact document
{
  _id: <ObjectId>,
  user_id: <ObjectId1>,
  "phone": "1223",
  "email": "iti@example.com"  
}

// access document
{
  _id: <ObjectId>,
  user_id: <ObjectId1>,
  level: 5,
  group: dev            
}

//////////////////////////

embedded One to ONe
// user document
{
  _id: 'ahmed_user',
  userName: 'Ahmed'
}
// Contact
{
  _id: Object('fjksf'),
  user_id: 'ahmed_user',
  phone: '123-456-789',
  email: 'ahmed@example.com'
}
// access
{
  _id: Object('wwe'),
  user_id: 'ahmed_user',
  level:5,
  group: 'dev'
}

{
  _id:"ahmed_user_id",
  userName: "Ahmed",

  contact: {
    phone: "number",
    email: "email"
  },

  access:{
    level: 5,
    group:"dev"
  }

}
-----> embedded document one to one

{
  _id:'ahmed_user',
  userName:'Ahmed',
  contact: {
    phone: '123-456-789',
    email: 'ahmed@example.com'
  },
  access: {
    level:5,
    group: 'dev'
  },
  salary:{
    gross: 10000,
    net: 8000
  }
}

// one to many
// address documents
{
  _id: "ahmed_user",
  street: '20 semoha',
  city: 'ALex',
  zip: '12345'
}
{
  _id: 'ahmed_user',
  street: 'camp shizar',
  city: 'Alex',
  zip: '12345'
}

one to many with Embedded documents


{
  _id:'ahmed_user',
  userName:'Ahmed',
  contact: {
    phone: '123-456-789',
    email: 'ahmed@example.com'
  },
  access: {
    level:5,
    group: 'dev'
  },
  salary:{
    gross: 10000,
    net: 8000
  },
  "addresses": [
    {
      _id: "ahmed_user",
      street: '20 semoha',
      city: 'ALex',
      zip: '12345'
},
{
    _id: 'ahmed_user',
    street: 'camp shizar',
    city: 'Alex',
    zip: '12345'
}
  ]
}

// One to Many with document references 
// org
{
  _id: "iti",
  name: "os",
  founded: "year"
}

{
  _id:"object_id",
  org_id: "iti",
  street: "post station"
}

{
  _id:"object_id",
  org_id: "iti",
  street: "smart vilage"
}


// embedded
// -> collection -> users -> documents -> document {document user info, document contact, document access}
db.user.insertOne({
  userName: 'Ahmed',
  contact: {
    phone: '123-456-789',
    email: 'ahmed@example.com'
  },
  access:{
    level: 5,
    group: 'dev'
  }
})

db.user.insertOne({
  userName: "ITI_SYSTEM",
  contact: {
    phone: "987-654-321"
  },
  access:{

  }
})


db.user.insertOne({
  userName:'Mohamed',
  addresses: [
    {
      street: '20 semoha',
      city: 'ALex',
      zip: '12345'
    },
    {
      street: 'camp shizar',
      city: 'Alex',
      zip: '12345'
    }
  ]
})

//references document
// var user = db.user.insertOne({
  userName: 'OS'
})

db.user.insertOne({
  user_id: user.insertedId,
  phone: '123-456-789',
  emial: 'ahmed@example.com'
})

db.user.insertOne({
  user_id: user.insertedId,
  level: 5,
  group: "dev"
})

var get_user_id = db.user.find({userName: 'Ahmed 3'})


// Implement Relation using Embedded Document



db.employee.insertOne({
  _id: ObjectId("32521df3f4948bd2f54218"),
  firstName: "John",
  lastName: "King",
  email: "john.king@abc.com",
  salary: "33000",
  DoB: new Date('Mar 24, 2011'),
  address: {
    street: "Upper Street",
    house: "No 1",
    city: "New York",
    country: "USA"
  }
})


//Implement Relation using Reference



db.address.insertOne({
  _id: 101,
  street: "Upper Street",
  house: "No 1",
  city: "New York",
  country: "USA"
})

db.employee.insertOne({
  firstName: "John",
  lastName: "King",
  email: "john.king@abc.com",
  salary: "33000",
  DoB: new Date('Mar 24, 2011'),
  address: 101
})

// Find Related Documents


var addrId = db.employee.findOne({ firstName: 'John' }).address;

db.address.findOne({ _id: addrId });


/*


find returns a cursor. A cursor can only be enumerated once,
so once you've enumerated a cursor it has reached the end and will yield no further documents.
So in the following example the variable a is assigned a cursor value,
and the first time we evaluate "a" in the shell it echoes the results of enumerating the cursor.
The second time we evalute "a" it enumerates the cursor again,
but this time the cursor is empty so no documents are echoed:

> var a = db.test.find().limit(1)
> a
{ "_id" : ObjectId("52dfccba5fd17fe6a4d0051a"), "a" : 16807, "b" : 475249 }
> a
>

The previous example returns a cursor even though you used limit(1).
It's not that "a" loses its value, it still refers to the same cursor,
it's just that the cursor it refers to has reached its end.

If you want to read a single document and have the return value be a document
instead of a cursor use findOne:

> var a = db.test.findOne()
> a
{ "_id" : ObjectId("52dfccba5fd17fe6a4d0051a"), "a" : 16807, "b" : 475249 }
> a
{ "_id" : ObjectId("52dfccba5fd17fe6a4d0051a"), "a" : 16807, "b" : 475249 }
>


*/

//jsonSchema Validation
/*
JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. 
You can use JSON schema to specify validation rules for your fields in a human-readable format.
*/
db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object", required: ["name", "year"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        }
      }
    }
  }
}
)

db.createCollection("students", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Student Object Validation",
      required: ["address", "major", "name", "year"],
      properties: {
        name: {
          bsonType: "string",
          description: "'name' must be a string and is required"
        },
        year: {
          bsonType: "int",
          minimum: 2017,
          maximum: 3017,
          description: "'year' must be an integer in [ 2017, 3017 ] and is required"
        },
        gpa: {
          bsonType: ["double"],
          description: "'gpa' must be a double if the field exists"
        }
      }
    }
  }
})

// The following insert operation fails because gpa is an integer when the validator requires a double.
db.students.insertOne({
  name: "Alice",
  year: Int32(2019),
  major: "History",
  gpa: Int32(3),
  address: {
    city: "NYC",
    street: "33rd Street"
  }
})

// valid
db.students.insertOne({
  name: "Alice",
  year: NumberInt(2019),
  major: "History",
  gpa: Double(3.0),
  address: {
    city: "NYC",
    street: "33rd Street"
  }
})

//https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#std-label-jsonSchema-keywords

/*
Consider an application that tracks customer orders. 
The orders have a base price and a VAT. 
  The orders collection contains these fields to track total price:

    price

    VAT

    totalWithVAT
*/
// https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr
//https://www.mongodb.com/docs/manual/core/schema-validation/specify-query-expression-rules/#std-label-schema-validation-query-expression
db.createCollection("orders",
  {
    validator: {
      $expr:
      {
        $eq: [
          "$totalWithVAT",
          { $multiply: ["$total", { $sum: [1, "$VAT"] }] }
        ]
      }
    }
  }
)
totalWithVAT = total * ( 1 + vat)
//With this validation, you can only insert documents if the totalWithVAT field equals total * (1 + VAT).
//The following operation fails because the totalWithVAT field does not equal the correct value:
db.orders.insertOne({
  total: NumberDecimal("141"),
  VAT: NumberDecimal("0.20"),
  totalWithVAT: NumberDecimal("169")
})
//41 * (1 + 0.20) equals 169.2, so the value of the totalWithVAT field must be 169.2.

db.orders.insertOne({
  total: NumberDecimal("141"),
  VAT: NumberDecimal("0.20"),
  totalWithVAT: NumberDecimal("169.2")
})

///
db.createCollection("users", 
  {
    validator: {
                $and: [ {
                "name": {$type: "string", $exists: true} },
              {
                "mobile": {$type: "string", $regex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/}
}, {
                "email": {$type: "string", $exists: true} }
] }
})

//You can combine query operator validation with JSON Schema validation.

// lineItems.discountedPrice must be less than lineItems.price. This rule is specified using the $lt operator.

// The items field must be an array.This rule is specified using $jsonSchema.
db.createCollection(
  "sales", {
    validator: {
      "$and": [
        // Validation with query operators
        {
          "$expr": {
            "$lt": ["$lineItems.discountedPrice", "$lineItems.price"]
          }
        },
        // Validation with JSON Schema
        {
          "$jsonSchema": {
            "properties": {
              "items": { "bsonType": "array" }
            }
          }
        }
      ]
    }
  }
)

restrict validation
query filter restriction

//Specify Validation With Query Operators

db.createCollection("users",
{
  validator: {
    $and: [ {
      "name": {$type: "string", $exists: true}
    },
      {
        "mobile": {$type: "string", $regex: /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/}
      },
      {
        "email": {$type: "string", $exists: true} }
      ] }
 })
 db.users.find({})
 db.users.find({})

//Specify Validation Level for Existing Documents
/*
our schema's validationLevel determines the documents for which MongoDB applies validation rules:
Validation Level        Behavior
strict                  (Default) MongoDB applies validation rules to all inserts and updates.

moderate                MongoDB only applies validation rules to existing valid documents. 
                        Updates to invalid documents which exist prior to the validation being 
                        added are not checked for validity.
*/

db.contacts.insertMany([
  { "_id": 1, "name": "Anne", "phone": "+1 555 123 456", "city": "London", "status": "Complete" },
  { "_id": 2, "name": "Ivan", "city": "Vancouver" }
])


db.runCommand({
  collMod: "contacts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["phone", "name"],
      properties: {
        phone: {
          bsonType: "string",
          description: "phone must be a string and is required"
        },
        name: {
          bsonType: "string",
          description: "name must be a string and is required"
        }
      }
    }
  },
  validationLevel: "strict"
})

//Because the validationLevel is strict, when any document is updated, MongoDB checks that document for validation.
//Test the validation.

/*
The following update commands modify both documents in the contacts collection 
such that neither of the documents 
are consistent with the validation rule which requires name to be a string:
*/
db.contacts.updateOne(
  { _id: 1 },
  { $set: { name: 10 } }
)

db.contacts.updateOne(
  { _id: 2 },
  { $set: { name: 20 } }
)


//Steps: Use moderate Validation
db.runCommand({
  collMod: "contacts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["phone", "name"],
      properties: {
        phone: {
          bsonType: "string",
          description: "phone must be a string and is required"
        },
        name: {
          bsonType: "string",
          description: "name must be a string and is required"
        }
      }
    }
  },
  validationLevel: "moderate"
})

/*
Because the validationLevel is moderate:

    If you update the document with _id: 1, MongoDB applies the new validation rules because the existing document meets the validation requirements.

    If you update the document with _id: 2, MongoDB does not apply the new validation rules because the existing document does not meet the validation requirements.
*/ 
db.contacts.updateOne(
  { _id: 1 },
  { $set: { name: 10 } }
)

db.contacts.updateOne(
  { _id: 2 },
  { $set: { name: 20 } }
)


//https://www.mongodb.com/docs/manual/reference/command/validate/#mongodb-dbcommand-dbcmd.validate

//Choose How to Handle Invalid Documents
https://www.mongodb.com/docs/manual/core/schema-validation/handle-invalid-documents/#std-label-schema-validation-handle-invalid-docs


/*
Validation Action        Behavior
error                    (Default) MongoDB rejects any insert or update that violates the validation criteria.
warn                     MongoDB allows the operation to proceed, but records the violation in the MongoDB log.
*/ 

db.createCollection("contacts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["phone"],
      properties: {
        phone: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "@mongodb\\.com$",
          description: "must be a string and end with '@mongodb.com'"
        }
      }
    }
  },
  validationAction: "error"
})

db.contacts.insertOne(
  { name: "Amanda", email: "amanda@xyz.com" }
)


db.createCollection("contacts2", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["phone"],
      properties: {
        phone: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "@mongodb\\.com$",
          description: "must be a string and end with '@mongodb.com'"
        }
      }
    }
  },
  validationAction: "warn"
})

db.contacts2.insertOne(
  { name: "Amanda", email: "amanda@xyz.com" }
)

/*
db.adminCommand() runs commands against the admin database regardless of the database 
context in which it runs.
*/ 
db.adminCommand(
  { getLog: 'global' }).log.forEach(x => { print(x) }
  )






/////////////////////////////////////
// index
db.Employee.createIndex({ Employeeid: 1 })
db.Employee.createIndex({ Employeeid: 1, EmployeeName: 1})

// find index
db.Employee.getIndexes()
// drop index
db.Employee.dropIndex({Employeeid: 1})

// all indexes 
db.Employee.dropIndexes()


///////////////////


//Aggregation
//Aggregation Pipelines

/*
The aggregation pipeline is an array 
of one or more stages passed in the db.aggregate() or db.collection.aggregate() method.
db.collection.aggregate([ {stage1}, {stage2}, {stage3}...])

Every stage receives the output of the previous stage, processes the data further, 
and sends it to the next stage as input data. 
Aggregation pipeline executes on the server can take advantage of indexes

See the list of stages
https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference
*/




db.employees.insertMany([
  {
    _id: 1,
    firstName: "John",
    lastName: "King",
    gender: 'male',
    email: "john.king@abc.com",
    salary: 5000,
    department: {
      "name": "HR"
    }
  },
  {
    _id: 2,
    firstName: "Sachin",
    lastName: "T",
    gender: 'male',
    email: "sachin.t@abc.com",
    salary: 8000,
    department: {
      "name": "Finance"
    }
  },
  {
    _id: 3,
    firstName: "James",
    lastName: "Bond",
    gender: 'male',
    email: "jamesb@abc.com",
    salary: 7500,
    department: {
      "name": "Marketing"
    }
  },
  {
    _id: 4,
    firstName: "Rosy",
    lastName: "Brown",
    gender: 'female',
    email: "rosyb@abc.com",
    salary: 5000,
    department: {
      "name": "HR"
    }

  },
  {
    _id: 5,
    firstName: "Kapil",
    lastName: "D",
    gender: 'male',
    email: "kapil.d@abc.com",
    salary: 4500,
    department: {
      "name": "Finance"
    }

  },
  {
    _id: 6,
    firstName: "Amitabh",
    lastName: "B",
    gender: 'male',
    email: "amitabh.b@abc.com",
    salary: 7000,
    department: {
      "name": "Marketing"
    }
  }
])



//$match Stage
/*
The $match stage is usually the first stage to select only the matching documents from a collection.
It is equivalent to the Find() method. The following example demonstrates an aggregation pipeline with a single $match stage.
*/ 

{/* db.employees.find({gender:"female"}) */}

db.employees.aggregate([{ $match: { gender: 'female' } }])

//$group Stage
/*
Use the $group stage to group the input documents by the specified _id expression and returns 
a single document containing the accumulated values for each distinct group
*/ 



db.employees.aggregate([
  { $group: { _id: '$department.name' } }
])

/*
 only the $group stage is specified in the pipeline array. 
 The $group uses _id field to calculate the accumulated values for all the input documents as a whole. 
 The expression { _id:'$department.name'} creates the distinct group on the field $department.name. 
 Since we don't calculate any accumulated values, 
 it returns the distinct values of $department.name,
*/

//calculate the accumulated values for each group. The following calculates the number of employees in each department. 


db.employees.aggregate([
  {
    $group: { _id: '$department.name', totalEmployees: { $sum: 1 } }
  }])

/*
 we create distinct groups using _id:'$department.name' expression. 
 In the second expression totalEmployees: { $sum:1 }, 
 the totalEmployees is a field that will be included in the output, 
 and { $sum:1 } is an accumulator expression where $sum is an 
 Accumulator Operator that returns a sum of numerical values. 
 Here, { $sum:1 } adds 1 for each document that falls under the same group.
 https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/#accumulator-operator 
*/

// aggregation pipeline contains two stages.


db.employees.aggregate([
  { $match: { gender: 'male' } },
  {
    $group: { _id: '$department.name', totalEmployees: { $sum: 1 } }
  }])

/*
the first stage selects all male employees and passes them as input to the second stage $group as an input. 
So, the output calculates the sum of all male employees.

calculates the sum of salaries of all male employees in the same department.
*/ 


db.employees.aggregate([
  { $match: { gender: 'male' } },
  {
    $group: { _id: { deptName: '$department.name' }, totalSalaries: { $sum: '$salary' } }
  }])

/*
{ $match:{ gender:'male'}} returns all male employees. 
In the $group stage, an accumulator expression totalSalaries: { $sum:'$salary'} 
sums up numeric field salary and include it as totalSalaries in the output for each group.
*/

//$sort Stage
// The $sort stage is used to sort the documents based on the specified field in ascending or descending order.


db.employees.aggregate([
  { $match: { gender: 'male' } },
  { $sort: { firstName: 1 } }
])

// pipeline contains three stages to sort the groupped documents.


db.employees.aggregate([
  { $match: { gender: 'male' } },
  { $group: { _id: { deptName: '$department.name' }, totalEmployees: { $sum: 1 } } },
  { $sort: { deptName: 1 } }
])


/*
the $match stage returns all the male employees and passes it to the next stage $sort. 
The { $sort:{ firstName:1}} expression sorts the input documents by the firstName field in ascending order. 
1 indicates the ascending order and -1 indicates descending order.
*/


//Use the aggregation pipeline stage $lookup to find the related data from the collection, 
//https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/#mongodb-pipeline-pipe.-lookup

db.employee.aggregate([{ $lookup: { from: 'address', localField: 'address', foreignField: "_id", as: 'addr' } }])


// example

db.universities.insert([
{
  country : 'Spain',
  city : 'Salamanca',
  name : 'USAL',
  location : {
    type : 'Point',
    coordinates : [ -5.6722512,17, 40.9607792 ]
  },
  students : [
    { year : 2014, number : 24774 },
    { year : 2015, number : 23166 },
    { year : 2016, number : 21913 },
    { year : 2017, number : 21715 }
  ]
},
{
  country : 'Spain',
  city : 'Salamanca',
  name : 'UPSA',
  location : {
    type : 'Point',
    coordinates : [ -5.6691191,17, 40.9631732 ]
  },
  students : [
    { year : 2014, number : 4788 },
    { year : 2015, number : 4821 },
    { year : 2016, number : 6550 },
    { year : 2017, number : 6125 }
  ]
}
])


db.courses.insert([
{
  university : 'USAL',
  name : 'Computer Science',
  level : 'Excellent'
},
{
  university : 'USAL',
  name : 'Electronics',
  level : 'Intermediate'
},
{
  university : 'USAL',
  name : 'Communication',
  level : 'Excellent'
}
])


// match stage

db.universities.aggregate([
  { $match : { country : 'Spain', city : 'Salamanca' } }
]).pretty()


// project statge 
//we only need the fields country, city and name.

db.universities.aggregate(
  [
    {
      $project :
      {
        _id : 0, country : 1, city : 1, name : 1
      }
    }
]
).pretty()


//we want to know the number of documents per university in our ‘universities’ collection
db.universities.aggregate(
  [
    {
      $group :
      {
        _id : '$name', totaldocs : { $sum : 1 }
      }
    }
]
).pretty()

/*

Operator	Meaning
$count	  Calculates the quantity of documents in the given group.
$max	    Displays the maximum value of a document’s field in the collection.
$min	    Displays the minimum value of a document’s field in the collection.
$avg	    Displays the average value of a document’s field in the collection.
$sum	    Sums up the specified values of all documents in the collection.
$push	    Adds extra values into the array of the resulting document.
*/


//$out
/*
This is an unusual type of stage because it allows you to carry 
the results of your aggregation over into a new collection, or into an existing one after dropping it, 
or even adding them to the existing documents

The $out stage must be the last stage in the pipeline.
*/ 

db.universities.aggregate([
  { $group : { _id : '$name', totaldocs : { $sum : 1 } } },
  { $out : 'aggResults' }
])

db.aggResults.find().pretty()


//$unwind
/*
You cannot work directly on the elements of an array within a document with stages such as $group. 
The $unwind stage enables us to work with the values of the fields within an array.

Where there is an array field within the input documents, you will sometimes need to output the document several times, once for every element of that array.

Each copy of the document has the array field replaced with the successive element.

In the next example, I am going to apply the stage only to the document whose field name contains the value USAL.
*/

db.universities.aggregate([
  { $match : { name : 'USAL' } },
  { $unwind : '$students' }
]).pretty()

// sort
/*
let’s sort the documents obtained as a result of the $unwind stage by the number of
students in descending order.

In order to get a lesser output, I am going to project only the year and the number of students
*/
db.universities.aggregate([
  { $match : { name : 'USAL' } },
  { $unwind : '$students' },
  { $project : { _id : 0, 'students.year' : 1, 'students.number' : 1 } },
  { $sort : { 'students.number' : -1 } }
]).pretty()

//$limit

db.universities.aggregate([
  { $match : { name : 'USAL' } },
  { $unwind : '$students' },
  { $project : { _id : 0, 'students.year' : 1, 'students.number' : 1 } },
  { $sort : { 'students.number' : -1 } },
  { $limit : 2 }
]).pretty()


//addFields
/*
It is possible that you need to make some changes to your output in the way of new fields. 
In the next example, we want to add the year of the foundation of the university.
*/
db.universities.aggregate([
  { $match : { name : 'USAL' } },
  { $addFields : { foundation_year : 1218 } }
]).pretty()

// $count
//The $count stage provides an easy way to check the number of documents obtained in the output of the previous stages of the pipeline.

db.universities.aggregate([
  { $unwind : '$students' },
  { $count : 'total_documents' }
]).pretty()

//$sortByCount
/*
This stage is a shortcut for grouping, counting and then sorting in 
descending order the number of different values in a field.

Suppose you want to know the number of courses per level, sorted in descending order.
*/
db.courses.aggregate([
  { $sortByCount : '$level' }
]).pretty()



//MongoDB User Management Commands
/*
The mongo DB User management command contains the commands related to the users. 
We can create, delete, and update the users using the following User Management Commands.

The MongoDB createUser command creates a new user for the database from where we run the command. 
If the user already exists, it will return the duplicate user error.
*/
// syntex

/*
    {  
     createUser: "<user_name>",  
     pwd: "<cleartext password>"  
     customData: { <any info.> },  
     roles: [  
       { role: "<role>", db: "<database>" } | "<role>",  
       ...  
     ],  
     writeConcern: { <write concern> },  
     authenticationRestrictions: [  
        { clientSource: [ "<IP|CIDR range>", ... ], serverAddress: [ "<IP|CIDR range>", ... ] },  
        ...  
     ],  
     mechanisms: [ "<scram-mechanism>", ...],   
     digestPassword: <boolean>  
*/

// The createUser command has the following field:
/*
Field 	        Type 	Description
createUser 	    string 	This field contains the name of the new user.
pwd 	          string 	This field contains the user's password. The value can be either the user's password in cleartext string or passwordPrompt() to prompt for the user's password.
customData 	    document 	This field contains the data that an admin wishes to associate with the particular user.
roles 	        array 	The field grants any role to the user.
digestPassword 	boolean 	The digestPassword indicates that it is a server or a client who digests the password.
writeConcern 	  document 	This field contains the write concern for the creation operation.
authentication  array 	It enforces the authentication rules on the created user. It provides a list of IP addresses and CIDR ranges from which the user is allowed to connect.
Restrictions 	
mechanism 	array 	This field specifies the SCRAM mechanisms. The valid SCRAM values are SCRAM-SHA-1 and SCRAM-SHA-256.
*/ 

db.getSiblingDB("student").runCommand({
  createUser: "admin@mongodb",
  pwd: passwordPrompt(),
  customData: { empId: 101 },
  roles: [
    { role: "clusterAdmin", db: "admin" },
    { role: "readAnyDatabase", db: "admin" },
    "readWrite"
  ],
  writeConcern: { w: "majority", wtimeout: 5000 }
})


                          db.createUser(
                          {user: "user99",
                          pwd: "password",
                          roles:[{role: "userAdminAnyDatabase" , db:"admin"}]})

//db.getSiblingDB(<database>)
//Used to return another database without modifying the db variable in the shell environment.
/*
creates a user admin@mongodb on the student database. 
The command gives admin@mongodb the clusterAdmin 
and readAnyDatabase roles on the admin database and the readwrite role on the student's database.
*/
//MongoDB dropUser command
// syntax
    // {
    //   dropUser: "<user>",
    //   writeConcern: { <write concern> }
    // }

/*
Field 	      Type 	Description
dropUser 	    string 	The dropUser field contains the name of the user that you want to delete.
writeConcern 	document 	This field contains the write concern level for the removal operation.
*/ 

use products
db.runCommand({
  dropUser: " admin@mongodb ",
  writeConcern: { w: "majority", wtimeout: 5000 }
})  
//MongoDB updateUser command
/*
The MongoDB updateUser command updates the users details in the database 
on which we run the command. It will completely replace the previous field's values when 
we use the command, 
including the roles that are assigned and the authenticationRestrictions arrays.
*/

/*
Syntax:
    {  
      updateUser: "<user_name>",  
      pwd: "<cleartext password>"  
      customData: { <any information> },  
      roles: [  
        { role: "<role>", db: "<database>" } | "<role>",  
        ...  
      ],  
      authenticationRestrictions: [  
         {  
           clientSource: ["<IP>" | "<CIDR range>", ...],  
           serverAddress: ["<IP>", | "<CIDR range>", ...]  
         },  
         ...  
      ],  
      mechanisms: [ "<scram-mechanism>", ... ],  
      digestPassword: <boolean>,  
      writeConcern: { <write concern> }  
    }  
*/
/*
Field 	        Type 	Description
updateUser 	    string 	It contains the name of the user that we need to update.
pwd 	          string 	It contains the user's password, or you can use the password prompt to prompt for the password.
customData 	    document 	This field contains the data that an admin wishes to update in the particular user.
roles 	        array 	This field grants a role to the user.
digestPassword 	boolean 	It indicates, if the server or client will digest the password.
writeConcern 	  document 	This field contains the write concern for the creation operation.
authentication
Restrictions 	   array 	It enforces the authentication rules on the created user. It provides a list of IP addresses and CIDR ranges from which the user is allowed to connect.
mechanism 	     array 	This field specifies the SCRAM mechanisms. The valid SCRAM values are SCRAM-SHA-1 and SCRAM-SHA-256.
*/ 

use products
db.runCommand({
  updateUser: "appClient01",
  customData: { employeeId: "0x3039" },
  roles: [{ role: "read", db: "assets" }]
})


// Role Management Methods

//The role management commands are used to manage the role of the users. 
//db.createRole(role, writeConcern)
/*
The createRole method is used to assign a role under the database. 
Using this method, we can specify privileges for the role by explicitly listing the privileges. 
You may also perform it by getting the role to inherit privileges from some different roles or both. 
The role always applies to the database on which we are running the method.

    {  
      role: "<role_name>",  
      privileges: [  
         { resource: { <resource> }, actions: [ "<action>", ... ] },  
         ...  
      ],  
      roles: [  
         { role: "<role_name>", db: "<database_name>" } | "<role>",  
      ],  
      authenticationRestrictions: [  
        {  
          clientSource: ["<IP>" | "<CIDR range>", ...],  
          serverAddress: ["<IP>" | "<CIDR range>", ...]  
        }, ]}  
*/

//The JTPAdmin role on the admin database will be created using the cerate role method:
use admin
db.createRole(
  {
    role: "JTPAdmin",
    privileges: [
      { resource: { cluster: true }, actions: ["addShard"] },
      { resource: { db: "config", collection: "" }, actions: ["find", "update", "insert", "remove"] },
      { resource: { db: "users", collection: "usersCollection" }, actions: ["update", "insert", "remove"] },
      { resource: { db: "", collection: "" }, actions: ["find"] }
    ],
    roles: [
      { role: "read", db: "admin" }
    ]
  },
  { w: "majority", wtimeout: 5000 }
)  
//db.dropRole(rolename, writeConcern)
// The drop role method is used to remove the specified user - defined role from the database on which we are running the method.
use test
db.dropRole("testrole", { w: "majority" }) 
// db.dropAllRoles(writeConcern)
use tutorials
db.dropAllRoles({ w: "majority" })  

// db.getRole(rolename, args)
/*
In MongoDB, a role inherits the instance of some other role. This method is used to get the parent roles 
from which this role inherits privileges. Also, all the role's privileges can be returned using this method.

When we run the db.getRole() 
method from the database that contains both the user-defined roles and built-in roles, then the specified command can retrieve the information.
*/ 

use tutorials
db.getRole("Admin")  
//db.getRoles()
/*
Returns information for all the roles in the database on which the command runs.
We can use this method with or without an argument. If we run this method without an argument, 
the method returns the inheritance information for the user-defined roles of the database.

will return the documents for all the existing roles on the tutorials database and also includes role privilege and built-in role
*/ 
db.getRoles(
  {
    rolesInfo: 1,
    showPrivileges: true,
    showBuiltinRoles: true
  }
)  
//db.updateRole(<rolename>, <update>, <writeConcern>)
/*
The update role method is used to update a user-defined role. To update a user-defined role, it must run on the specified role's database. When we update a field, it will completely replace the old field's values.

In the case, we need to add or remove roles/privileges without replacing each value, we have to use one or more of the listed methods:

    grantRolesToRole()
    grantPrivilegesToRole()
    revokeRolesFromRole()
    revokePrivilegesFromRole()

*/ 


use tutorial
db.updateRole(
  "librarian",
  {
    privileges:
      [
        {
          resource: { db: "tutorials", collection: "books" },
          actions: ["update", "createCollection", "createIndex"]
        }
      ],
    roles:
      [
        {
          role: "read",
          db: "products"
        }
      ]
  },
  { w: "majority" }
)

//  mongo compass 