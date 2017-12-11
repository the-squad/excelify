import os
import cv2
from preprocessing import preProcessing
mypath = "D:\\GP\\by_class\\by_class\\4a\\train_4a"
f = []
i = 0
for root, dirs, files in os.walk(mypath):
    for file in files:
        if file.endswith(".png"):
            i+=1
            print(i)
            preProcessing(cv2.imread(os.path.join(root, file)))