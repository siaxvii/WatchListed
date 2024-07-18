import pandas as pd

df = pd.read_csv('final.csv')

#Selects necessary columns
# Select necessary columns (update to reflect current column positions)
df = df[['id', 'name', 'overview', 'genres', 'number_of_seasons', 'number_of_episodes', 
         'first_air_date', 'last_air_date', 'networks', 'vote_count', 'vote_average', 
         'languages', 'popularity', 'backdrop_path', 'weighted_rating', 'watchlisted_rating']]

#Formats each row into SQL INSERT statements
def format_insert(row): 
    if any(str(attr).strip() == '' for attr in row[:-1]):  #Checking all columns except the last one (languages)
        return None
    

    #Replaces single quotes with double single quotes and double quotes with empty string
    name = row[1].replace("'", "''").replace('"', "")
    overview = row[2].replace("'", "''").replace('"', "")

    # Constructs the SQL INSERT INTO statement
    values = f"({row[0]}, '{name}', '{overview}', ARRAY{row[3]}, {row[4]}, {row[5]}, '{row[6]}'::timestamp, '{row[7]}'::timestamp, ARRAY{row[8]}, {row[9]}, {row[10]}, ARRAY{row[11]}, {row[12]}, '{row[13]}', {row[14]}, {row[15]}),"
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
sql_insert1 = f"INSERT INTO show (id, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, votecount, rating, languages, popularity, backgroundpath, weightedrating, watchlistedrating) VALUES\n{insert_values1};"
sql_insert2 = f"INSERT INTO show (id, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, votecount, rating, languages, popularity, backgroundpath, weightedrating, watchlistedrating) VALUES\n{insert_values2};"

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