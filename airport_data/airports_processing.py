import csv 

"""
Using large_airports.csv from running large_airports.py, we generate complete 
csv of large airports with all the relevant information. 

Read in content from large_airports.csv into a list in memory 

raw_airport_info.csv is from https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat

If airport name and IATA code is in the list of large airports, we write it out into our final 
csv: airports.csv, which includes the following fields:
Name	Name of airport. May or may not contain the City name.
City	Main city served by airport. May be spelled differently from Name.
Country	Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.
IATA	3-letter IATA code. Null if not assigned/unknown.
ICAO	4-letter ICAO code.
Null if not assigned.
Latitude	Decimal degrees, usually to six significant digits. Negative is South, positive is North.
Longitude	Decimal degrees, usually to six significant digits. Negative is West, positive is East.
Altitude	In feet.
Timezone	Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.
DST	Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown). See also: Help: Time
Tz database time zone	Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".
"""

# list of large airport IATA and names (since some IATA codes are blank)
large_airport_iata = []
large_airport_names = []
with open('large_airport_info.csv', 'rb') as large_airports_csv:
	reader = csv.reader(large_airports_csv)
	for row in reader:
		if row and len(row[0]) == 3:
			large_airport_iata.extend(row)
		elif row:
			large_airport_names.extend(row)

# read in other csv file with iata codes, latitude, longitude, zone (airports.dat)
with open('airports_raw.csv', 'rb') as raw_airports_csv:
	# new_reader = csv.DictReader('raw_airports_csv', fieldnames=FIELD_NAMES)
	reader = csv.reader(raw_airports_csv)
	for row in reader:
		airport_name = row[1]
		airport_iata = row[4]
		if airport_iata in large_airport_iata or airport_name in large_airport_names:
			print row[1:12]