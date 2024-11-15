To easily generate QR codes: 
1. Create a .csv file with links in the first column and desired save names in the second column (see urlInfo.csv). 
2. Run newQRgenerator.py.
3. You will be prompted for two inputs. The first is the .csv file containing your QR code information, and the second is the name of the folder the codes will be saved in. For example, if my information is in urlInfo.csv and I want the codes to be saved in a folder named "newCodes", I would enter "urlInfo.csv" for the first prompt and "newCodes" for the second.
The script will generate a code for the information in each row of the .csv file.
Also: newQRgenerator.py and testQR.py are adapted from the original group's QR code generator; these versions work out of context unlike the original version. Destination URL's are hardcoded in testQR.py. See QRCode.png for sample output. 
