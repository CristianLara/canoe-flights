# generates list of large airports 

""" 
Creates csv of large airports. To run, first download csv from http://ourairports.com/data/ 

Run script using the following command to generate csv called 'large_airport.csv'


cat path/to/downloaded/csv | python large_airports.py > large_airports.csv

We generate a list of both the IATA code and the airport name because dataset is 
incomplete and some airports are missing IATA codes and/or names are inconsistent so 
we capture both fields to be safe. 
"""
import csv
import sys

reader = csv.DictReader(sys.stdin, delimiter=',')

for row in reader:
	if row['type'] == 'large_airport':
		print row['iata_code']
		print row ['name'] # some airports don't have iata codes 


