import json
import cv2
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__))+"/../..")
from api.Code.ImageParser import ImageParser

if __name__ == "__main__":
    img = cv2.imread(sys.argv[1])
    sheet = ImageParser()
    sheet = sheet.parse(img)
    print(json.dumps(sheet))