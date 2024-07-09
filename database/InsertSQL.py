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

#Drops showid column because of redundancy
df = df.drop(columns=[df.columns[1]])

#Formats each row into SQL INSERT statements
def format_insert(row): 
    if any(str(attr).strip() == '' for attr in row[:-1]):  #Checking all columns except the last one (languages)
        return None
    
    name = row[1].replace("'", "''").replace('"', "")
    overview = row[2].replace("'", "''").replace('"', "")
    # Constructs the SQL INSERT INTO statement
    values = f"({row[0]}, '{name}','{overview}', ARRAY{row[3]}, {row[4]}, {row[5]}, '{row[6]}'::timestamp, '{row[7]}'::timestamp, ARRAY{row[8]}, {row[9]}, ARRAY{row[10]}, '{row[11]}'),"
    return values

#Splits DataFrame into two halves for two different insert files
half = len(df) // 2
df1 = df.iloc[:half]
df2 = df.iloc[half:]

#Applies formatting function to each row and joins into a single string for each half
insert_values1 = '\n'.join(filter(None, df1.apply(format_insert, axis=1)))
insert_values2 = '\n'.join(filter(None, df2.apply(format_insert, axis=1)))

#Removes trailing comma from the last row
insert_values1 = insert_values1.rstrip(',')
insert_values2 = insert_values2.rstrip(',')

#Adds semicolon at the end to complete SQL INSERT statements
sql_insert1 = f"INSERT INTO show (id, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, rating, languages, backgroundpath) VALUES\n{insert_values1};"
sql_insert2 = f"INSERT INTO show (id, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, rating, languages, backgroundpath) VALUES\n{insert_values2};"

#Output file paths
output_file1 = 'sql_inserts.txt'
output_file2 = 'sql_inserts2.txt'

#Writes SQL INSERT statements to output files
try:
    with open(output_file1, 'w', encoding='utf-8') as f:
        f.write(sql_insert1)
    print(f"SQL INSERT statements have been saved to {output_file1}")
except Exception as e:
    print(f"Error occurred while writing to file {output_file1}: {e}")

try:
    with open(output_file2, 'w', encoding='utf-8') as f:
        f.write(sql_insert2)
    print(f"SQL INSERT statements have been saved to {output_file2}")
except Exception as e:
    print(f"Error occurred while writing to file {output_file2}: {e}")