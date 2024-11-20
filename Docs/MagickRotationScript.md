# Image Processing with ImageMagick

This project processes images by applying horizontal offsets using ImageMagick.
The offsets are specified in a CSV file, and the processed images are saved in
an output directory. The project logs the processing details in a log file.

## Quickstart
- Copy and paste the 360 image filenames into the first column of
  image_offsets.csv
- Copy and paste the corresponding offsets into the second column
Run the following:
`python ./magick.py`


## Project Structure

- **image_offsets.csv**: CSV file containing image file names and their
  corresponding offsets.
- **input_images**: Directory containing the original images to be processed.
- **magick.py**: Main script to process the images.
- **output_images**: Directory where the processed images will be saved.
- **processing_log.txt**: Log file to record processing details.

## Requirements

- Python 3.x
- pandas
- ImageMagick

## Installation

1. Install Python 3.x from [python.org](https://www.python.org/).
2. Install the required Python packages:
    ```sh
    pip install pandas
    ```
3. Install ImageMagick from [imagemagick.org](https://imagemagick.org/).

## Usage

1. Place the images to be processed in the `input_images` directory.
2. Create or update the `image_offsets.csv` file with the image file names and
   their corresponding offsets. The CSV file should have the following format:

    ```
    File,Offset
    image1.jpg,1936
    image2.png,-1936
    ```

3. To calculate the offset values, you can use an Excel formula based on the
   data in your file. For example, if you have a sheet named `Sheet1` with
   relevant data in columns G and H, you can use the following formula to
   determine the offset:

    ```
    =IF(Sheet1!G2="Lens Front (for location)", (180-Sheet1!H2)*(7744/360), (90-Sheet1!H2)*(7744/360))
    ```

    This formula checks the value in `Sheet1!G2`. If it is "Lens Front (for
    location)", it calculates the offset as `(180-Sheet1!H2)*(7744/360)`.
    Otherwise, it calculates the offset as `(90-Sheet1!H2)*(7744/360)`.

    >Important note, if you want to rotate the home point of the image
    >clockwise, your pixel offset will be negative.

4. Run the [magick.py](/magick.py) script:
    ```sh
    python magick.py
    ```

5. The processed images will be saved in the [output_images](/output_images/)
   directory, and the processing details will be logged in the
   [processing_log.txt](/processing_log.txt) file.

## Script Details

### Configuration

The script uses the following configuration variables:

- `CSV_FILE`: Path to the CSV file containing image offsets.
- `INPUT_DIR`: Directory containing the original images.
- `OUTPUT_DIR`: Directory to save the processed images.
- `LOG_FILE`: Log file to record processing details.

### Functions

- `log_message(message)`: Appends a message with a timestamp to the log file and
  prints it.
- `process_image(file_name, offset)`: Processes a single image by applying a
  horizontal offset using ImageMagick.
- `main()`: Main function to read the CSV file, validate its contents, and
  process each image.

## Example

Here is an example of how to use the script:

1. Place the images `image1.jpg` and `image2.png` in the
   [input_images](/input_images/) directory.
2. Create the [image_offsets.csv] file with the following content:

    ```
    File,Offset
    image1.jpg,1936
    image2.png,-1936
    ```

3. Run the script:
    ```sh
    python magick.py
    ```

4. The processed images will be saved in the [output_images](/output_images/)
   directory, and the processing details will be logged in the
   [processing_log.txt](/processing_log.txt) file.
