# QR Code Generator

## Description

This Python tool allows you to quickly and easily generate QR codes from an input .csv file.

## Features

- Generate QR codes from csv input
- Create QR codes for URLs
- Generate URLs for location names
- Save QR codes as image files (PNG)

## Installation

1. Ensure you have Python 3.13 or higher installed on your system.
2. Clone this repository: 
```https://github.com/hospital-gps-uky/hospital-navigation.git```
3. Navigate to the project directory:
```/src/qrStuff/```
4. Install the required dependencies:
    - Pillow
    - qrcode

## Usage

### Generating the CSV

To generate the .csv file that will be used to input the link and location data into the script you can use the .xlsx file which will autofill file names and links when a location name is input in the third column. One the .xlsx autofills these fields, copy the values to the .csv file.

### Command-line Interface

Generate the QR codes using the command-line interface:
```python newQRgenerator.py```
The image files will be output in the output directory with filenames corresponding to their location.

Options:
- `--input`: The input file name (default: entrance_urls.csv)
- `--output`: The output file directory (default: ./output)

## Examples
1. Generating QR codes from a different input file
```python newQRgenerator.py --input new_input.csv ```
2. Outputting QR codes to a different output directory
```python newQRgenerator.py --output ./new_output ```

## Know Issues
- When using the .xlsx file to auto generate the .csv, there is an issue when saving the .csv that results in the sting '????' to be added in the link and file names of the csv file. This does not show up in excel but when opening the .csv in a text editor, the string will appear. This string will break the script because the '?' character cannot be in a file path. Not sure if this is an excel issue or an issue with how the data is copied from the .xlsx to the .csv.

## Acknowledgements

- [qrcode library](https://github.com/lincolnloop/python-qrcode)
- [Pillow library](https://python-pillow.org/)
