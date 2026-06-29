import sqlite3

conn = sqlite3.connect('printer.db')
c = conn.cursor()

c.execute('''
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        cost INTEGER NOT NULL,
        weight INTEGER
    )
''')

c.execute("INSERT INTO orders (name, cost, weight) VALUES ('Stupid', 100, 10)")
c.execute("INSERT INTO orders (name, cost, weight) VALUES ('Dumb', 150, 10)")
c.execute("INSERT INTO orders (name, cost, weight) VALUES ('What', 100, 5)")
conn.commit()

sql ="SELECT * FROM orders ;"

c.execute(sql)

print(c.fetchall())