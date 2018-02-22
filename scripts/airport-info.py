import csv

with open('airport_data/airports.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
    for row in spamreader:
        # print ', '.join(row)
        if len(row[3]) == 3:
            # print '{' + row[3] ':' row[1], row[2], row[5], row[6] + '}'
            print '%s: {city: \'%s\', country: \'%s\', lat: %s, long: %s},' % (row[3], row[1], row[2], row[5], row[6])
