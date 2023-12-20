import pandas as pd
import numpy as np

# Load the existing dataset
existing_data = pd.read_csv('your_existing_dataset.csv')

# Function to generate augmented samples
def augment_data(data, n_samples=1000):
    augmented_samples = []

    for _ in range(n_samples):
        # Generate a random index from the existing data
        idx = np.random.randint(0, len(data))

        # Get a random row from the existing data
        sample = data.iloc[idx].copy()

        # Add random noise to each feature (adjust the scale as needed)
        noise = np.random.normal(scale=0.05, size=len(sample) - 1)  # Excluding the target variable
        sample.iloc[:-1] += noise

        # Append the augmented sample to the list
        augmented_samples.append(sample)

    return pd.DataFrame(augmented_samples)

# Generate an augmented dataset with 1000 rows
augmented_data = augment_data(existing_data, n_samples=1000)

# Concatenate the existing and augmented datasets
combined_data = pd.concat([existing_data, augmented_data], ignore_index=True)

# Save the augmented dataset to a new CSV file
combined_data.to_csv('augmented_dataset.csv', index=False)
