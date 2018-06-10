import os
import cv2
from multiprocessing import Pool
from preprocessing import preProcessing

def fun(t):
    root,charFolder = t
    #print('CHAR ', bytearray.fromhex(charFolder).decode())
    try:
        if int(charFolder,16) >= 97:
             filename = bytearray.fromhex(charFolder).decode()+' S.txt'
        else:
            filename = bytearray.fromhex(charFolder).decode()+'.txt'
        print(filename)
        f = open(filename , 'a+')
        for _,_,files in os.walk(os.path.join(root, charFolder, 'train_'+charFolder)):
            for file in files:
                if file.endswith(".png"):
                    #i+=1
                    #print(len(files),i, i / len(files) * 100)
                    try:
                        #pass
                        preProcessing(cv2.imread(os.path.join(root, charFolder, 'train_'+charFolder, file)),f)
                    except:
                        pass
    except:
        pass
if __name__ == '__main__':
    mypath = "C:\\Users\\mosta\\Downloads\\Compressed\\by_class\\by_class"
    p = Pool()
    for root, dirs, _ in os.walk(mypath):
        if dirs.__len__() > 60:
            l = []
            for dir in dirs:
                l.append(tuple((root,dir)))
            p.map(fun,l)
            print("thread")
    p.close()
    p.join()