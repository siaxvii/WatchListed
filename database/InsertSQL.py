#InsertSQL.py processes "final.csv" to filter and clean data
#It then formats each row into a SQL commands for DB insertion
import pandas as pd

df = pd.read_csv('final.csv')

#Selects necessary columns
df = df.iloc[:, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]

#Filters TV shows with a rating of 0.0
df = df[df.iloc[:, 10] != 0.0]

#Replaces NaN or null values in the 'languages' column with 'en'
df.iloc[:, 11] = df.iloc[:, 11].fillna('en')

#Replaces NaN or null values in the dataframe with an empty string
df = df.fillna(' ')

#Removes newline and carriage return characters from the 'overview' column
df.iloc[:, 3] = df.iloc[:, 3].str.replace('\n', ' ').str.replace('\r', ' ')

#Function to format each row into SQL INSERT statement
def format_insert(row): 
    if any(str(attr).strip() == '' for attr in row[:-1]):  #Checking all columns except the last one (languages)
        return None
    
    name = row[2].replace("'", "''").replace('"', "")
    overview = row[3].replace("'", "''").replace('"', "")
    #Constructs the SQL INSERT INTO statement
    values = f"({row[0]}, {row[1]}, '{name}','{overview}', ARRAY{row[4]}, {row[5]}, {row[6]}, '{row[7]}'::timestamp, '{row[8]}'::timestamp, ARRAY{row[9]}, {row[10]}, ARRAY{row[11]}, '{row[12]}'),"
    return values

#Applies the formatting function to each row and join them into a single string
insert_values = '\n'.join(filter(None, df.apply(format_insert, axis=1)))

#Removes the trailing comma from the last row
insert_values = insert_values.rstrip(',')

#Adds a semicolon at the end to complete SQL INSERT statement
sql_insert = f"INSERT INTO shows (id, showid, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, rating, languages, backdroppath) VALUES\n{insert_values};"

output_file = 'sql_inserts.txt'

#Writes the SQL INSERT statements to the output file
try:
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(sql_insert)
    print(f"SQL INSERT statements have been saved to {output_file}")
except Exception as e:
    print(f"Error occurred while writing to file: {e}")