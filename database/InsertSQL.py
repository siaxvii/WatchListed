import pandas as pd

# Load data
df = pd.read_csv('final.csv')

# Calculate mean vote across the whole dataset (C)
C = df['vote_average'].mean()

# Calculate the minimum number of votes required to be listed in the chart (m)
m = df['vote_count'].quantile(0.90)

# Function to calculate the weighted rating
def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    return (v / (v + m) * R) + (m / (v + m) * C)

# Apply the weighted rating function
df['weighted_rating'] = df.apply(weighted_rating, axis=1)

# Normalize the weighted rating to be out of 10
max_weighted_rating = df['weighted_rating'].max()
df['watchlisted_rating'] = (df['weighted_rating'] / max_weighted_rating) * 10

# Select necessary columns (update to reflect current column positions)
df = df[['id', 'name', 'overview', 'genres', 'number_of_seasons', 'number_of_episodes', 
         'first_air_date', 'last_air_date', 'networks', 'vote_count', 'vote_average', 
         'languages', 'popularity', 'backdrop_path', 'weighted_rating', 'watchlisted_rating']]

# Formats each row into SQL INSERT statements
def format_insert(row):
    if any(str(attr).strip() == '' for attr in row[:-1]):  # Checking all columns except the last one (languages)
        return None
    
    # Replaces single quotes with double single quotes and double quotes with empty string
    name = row['name'].replace("'", "''").replace('"', "")
    overview = row['overview'].replace("'", "''").replace('"', "")

    # Constructs the SQL INSERT INTO statement
    values = f"({row['id']}, '{name}', '{overview}', ARRAY{row['genres']}, {row['number_of_seasons']}, {row['number_of_episodes']}, '{row['first_air_date']}'::timestamp, '{row['last_air_date']}'::timestamp, ARRAY{row['networks']}, {row['vote_count']}, {row['vote_average']}, ARRAY{row['languages']}, {row['popularity']}, '{row['backdrop_path']}', {row['weighted_rating']}, {row['watchlisted_rating']}),"
    return values

# Splits DataFrame into two halves for two different insert files
half = len(df) // 2
df1 = df.iloc[:half]
df2 = df.iloc[half:]

# Applies formatting function to each row and joins into a single string for each half
insert_values1 = '\n'.join(filter(None, df1.apply(format_insert, axis=1)))
insert_values2 = '\n'.join(filter(None, df2.apply(format_insert, axis=1)))

# Removes trailing comma from the last row
insert_values1 = insert_values1.rstrip(',')
insert_values2 = insert_values2.rstrip(',')

# Adds semicolon at the end to complete SQL INSERT statements
sql_insert1 = f"INSERT INTO show (id, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, votecount, rating, languages, popularity, backgroundpath, weightedrating, watchlistedrating) VALUES\n{insert_values1};"
sql_insert2 = f"INSERT INTO show (id, name, overview, genres, numseason, numepisodes, firstaired, lastaired, networks, votecount, rating, languages, popularity, backgroundpath, weightedrating, watchlistedrating) VALUES\n{insert_values2};"

# Output file paths
output_file1 = 'sql_insertsONE.txt'
output_file2 = 'sql_insertsTWO.txt'

# Writes SQL INSERT statements to output files
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
