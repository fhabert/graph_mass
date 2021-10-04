import sqlite3

# cursor.execute('Drop table flights;')
# cursor.execute('CREATE Table flights (\
#                 date VARCHAR(10), \
#                 plane VARCHAR(6), \
#                 takeoff INTEGER, \
#                 landing INTEGER);')

# data = ['date', 'F-HOKI', 1055, 1040]
# cursor.execute('''INSERT INTO flights(date, plane, takeoff, landing) \
#                         VALUES (?, ?, ?, ?);''', data)

def insert_data(data):
    con = sqlite3.connect('./planes.db')
    cursor = con.cursor()
    cursor.execute('''INSERT INTO flights(date, plane, takeoff, landing) \
                    VALUES (?, ?, ?, ?);''', data)
    con.commit()
