from flask import Flask, send_file, request
import qrcode
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
from app import app

# Input the website URL to be encoded in the QR code
website_url = 'http://localhost:3000/' + "test"


# Overlay image for UK heathcare logo
img_overlay =  Image.open('./qrthings/ukhealthlogo.png')

# Generate a QR code for the website URL
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=30,
    border=10,
)
qr.add_data(website_url)
qr.make(fit=True)

qr_image = qr.make_image(fill_color="black", back_color="white")

#size logo 
overlay = img_overlay.resize((350,250))

#combine QR code and image
qr_image.paste(overlay, (50,1250))

#drawing object for formatting QR Code 
draw = ImageDraw.Draw(qr_image)

#add directions to the file to be downloaded 
text_color = 0
font_size = 100
font = ImageFont.truetype("qrthings/times.ttf", font_size)

font_size_description = 35
font_descript = ImageFont.truetype("qrthings/times.ttf", font_size_description)

title = "Need Directions?"
text_position = (400, 10)

sub_title = "Scan Me."
text_position_sub = (555,125)

descriptive_text = "For directions to your appointment, scan this QR Code with your phone camera."
text_position_descript = (150, 1200)

#Draw on image 
draw.text(text_position, title, fill = text_color, font = font)
draw.text(text_position_sub, sub_title, fill = text_color, font = font)

draw.text(text_position_descript, descriptive_text, fill = text_color, font = font_descript)

#show generated qr image - can save from here 
qr_image.show()

# Option to save QR code
qr_io = BytesIO()
#qr_image.save(qr_io, format='PNG')
qr_image.save('QRCode.png', 'PNG')
qr_io.seek(0)