import csv

inFile = 'TMDB_tv_dataset_v3.csv'
outFile = 'shows.csv'

# Function to read CSV file and return list of dictionaries
def read_csv(inFile):
    data = []
    with open(inFile, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data

#Cleans data and keeps desired columns
def clean_and_filter_columns(data):
    desired_columns = ['id', 'name', 'overview', 'genres', 'number_of_seasons',
                       'number_of_episodes', 'first_air_date', 'last_air_date',
                       'networks', 'vote_average', 'languages']
    
    cleaned_data = []
    for row in data:
        cleaned_row = {col: row[col] for col in desired_columns if col in row}
        cleaned_data.append(cleaned_row)
    
    return cleaned_data

# Function to write modified data back to CSV
def write_csv(data, outFile):
    fieldnames = data[0].keys()
    with open(outFile, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for row in data:
            writer.writerow(row)

# Read CSV file
data = read_csv(inFile)

cleaned_data = clean_and_filter_columns(data)

write_csv(cleaned_data, outFile)

print(f'Modified CSV file saved as {outFile}')
