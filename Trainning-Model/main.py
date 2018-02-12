import os
import cv2
from preprocessing import preProcessing
mypath = "E:\\GP\\by_class"
f = []
i = 0
for root, dirs, _ in os.walk(mypath):
    for charFolder in dirs:
        print('CHAR ', bytearray.fromhex(charFolder).decode())
        f = open(bytearray.fromhex(charFolder).decode()+'.txt' , 'a+')
        for _,_,files in os.walk(os.path.join(root, charFolder, 'train_'+charFolder)):
            for file in files:
                if file.endswith(".png"):
                    i+=1
                    print(len(files),i, i / len(files) * 100)
                    try:
                        preProcessing(cv2.imread(os.path.join(root, charFolder, 'train_'+charFolder, file)),f)
                    except:
                        pass
                    