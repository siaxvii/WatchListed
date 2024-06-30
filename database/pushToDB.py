#pushToDB.py connects to a postgreSQL database,
#Reads SQL insert statements from "sql_inserts.txt" and executes them

import psycopg2

DATABASE_URL = "postgresql://lasya:tR4-6SqgRzkQaDe01TzU4A@watchlisted-15080.7tt.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
#DATABASE_URL = Removed from file for privacy

conn = psycopg2.connect(DATABASE_URL)

#Reads file with SQL insertion statements into a variable 
with open('sql_inserts.txt', 'r', encoding='utf-8') as file:
    sql_inserts = file.read()

#Creates database cursor to execute SQL insertions, commits transaction to db
try:
    with conn.cursor() as cur:
        cur.execute(sql_inserts)
        conn.commit()
        print("All statements executed successfully.")
except Exception as e:
    print(f"An error occurred: {e}")
    conn.rollback()
finally:
    conn.close()