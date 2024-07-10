#Reads "TMDB_tv_dataset_v3.csv" and filters out undesired columns

import pandas as pd
import csv

#Splits and cleans a comma-separated string into a list of strings
def clean_split(text):
    if pd.isna(text):
        return []
    else:
        return [item.strip() for item in text.split(',')]

df = pd.read_csv('TMDB_tv_dataset_v3.csv')

#Selects necessary columns and renames 'id' column to 'showid' in dataframe
df = df[['id', 'name', 'overview', 'genres', 'number_of_seasons', 'number_of_episodes', 
         'first_air_date', 'last_air_date', 'networks', 'vote_average', 'languages', 'backdrop_path']].rename(columns={'id': 'showid'})

#Replaces specific genre names using a dictionary
genre_replacements = {
    'Action & Adventure': 'Action',
    'Animation': 'Anime',
    'Sci-Fi & Fantasy': 'Sci-Fi'
}
df['genres'] = df['genres'].replace(genre_replacements, regex=True)

#Filters out shows with a rating of 0.0
df = df[df['vote_average'] != 0.0]

#Replaces NaN or null values in the 'languages' column with 'en'
df['languages'] = df['languages'].fillna('en')

#Replaces NaN or null values in the dataframe with an empty string
df = df.fillna(' ')

#Removes newline and carriage return characters from the 'overview' column
df['overview'] = df['overview'].str.replace('\n', ' ').str.replace('\r', ' ')

#Defines columns to apply clean_split function
columns_to_split = ['genres', 'networks', 'languages']

#Applies clean_split function to each column in columns_to_split
for col in columns_to_split:
    df[col] = df[col].apply(clean_split)

# Removes newline and carriage return characters from the 'overview' column
df['overview'] = df['overview'].str.replace('\n', ' ').str.replace('\r', ' ')

#Adds new autoincrementing 'id' column
df.insert(0, 'id', range(1, 1 + len(df)))

#Saves the modified DataFrame to a new CSV file with custom quoting
with open('final.csv', mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file, quoting=csv.QUOTE_NONNUMERIC)
    writer.writerow(df.columns)
    for row in df.itertuples(index=False, name=None):
        if any(str(attr).strip() == '' for attr in row[:-1]):
            continue
        writer.writerow(row)