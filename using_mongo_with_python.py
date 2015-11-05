import sys
import pymongo

# establish connection
connection = pymongo.MongoClient("mongodb://localhost")

# get a handle to database
db = connection.school
students = db.students

# drop existing colleciton
# students.drop()

def find():
	query = {'age': {'$gt': 18}}
	# examplre of query with regex
	# query = {'name': {'$regex': 'Mark|ALice', '$options': i}}
	projection = {'name': 1, 'age':1, '_id': 0} # 1 - incluse, 0 - exclude 
	cursor = None
	try:
		# projection argument is optional
		cursor = students.find(query, projection)
		# Example of Sort, Skip, Limit
		# Alayes executed in this order: 1 Sort, 2 Skip, 3 Limit
		# cursor = students.find(query).sort('name', pymongo.ASCENDING).skip(2).limit(2)
	except Exception as e:
		print "Unexpected error:", type(e), e



	sanity = 0
	for doc in cursor:
		print doc
		sanity += 1
		if sanity > 10:
			break


def find_one():
	query = {'name': 'Mark'}
	doc = None
	try:
		doc = students.find_one(query)
	except Exception as e:
		print "Unexpected error:", type(e), e

	print doc


def insert():
	richard = {'name': 'Richard', 'age': 21, 'interests': ['math']}
	try:
		students.insert_one(richard)
	except Exception as e:
		print "Unexpected error:", type(e), e


def insert_many():
	tom = {'name': 'Tom', 'age': 20, 'interests': ['weapon']}
	jerry = {'name': 'Jerry', 'age': 18, 'interests': ['run']}
	people_to_insert = [tom, jerry]
	try:
		students.insert_many(people_to_insert, ordered=True)
	except Exception as e:
		print "Unexpected error:", type(e), e


def update():
	try:
		students.update_one({'name': 'Mark'}, {'$set': {'interests': ['art']}})
		# Update each record
		#students.update_many({ }, {'$set': {'class': ['philosophy']}})
	except Exception as e:
		print 'Unexpected error', type(e), e

update()