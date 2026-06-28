#!/bin/bash 

echo "This is a test file for coding concepts."
echo "It demonstrates basic shell scripting."
echo "You can run this script to see how it works."
# Example of a simple loop
for i in {1..5}
do  
    echo "Iteration $i"
done
echo "Script execution completed."
# Making directory and creating a file
mkdir -p test_directory
echo "This is a test file inside the test_directory." > test_directory/test_file.html   
echo "Directory and file created successfully."
