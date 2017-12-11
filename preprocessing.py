import cv2
import  re
import numpy as np

def scale(img):
    return cv2.resize(img,(28,28),interpolation=cv2.INTER_LINEAR)

def getBoundaries(img):
    start = 0
    end = 0
    flag = False
    for col in range(len(img)):
        for row in range(len(img)):
            if img[row][col] == 0:
                start = col
                flag = True
                break
        if flag:
            break
    flag = False
    for col in reversed(range(len(img))):
        for row in range(len(img)):
            if img[row][col] == 0:
                flag = True
                end = col
                break
        if flag:
            break
    return (start,end)

def toTxt(intmatrix):
    '''Change a 2d list of lists of 1/0 ints into lines of '#' and '.' chars'''
    return '\n'.join(''.join(('#' if p else '.') for p in row) for row in intmatrix)

def crop(img):
    left, right = getBoundaries(img)
    upper, lower = getBoundaries(np.transpose(img))
    width = right-left
    height = lower-upper
    if  width < height:
        avg = int((128-width)/4)
        crop_img = img[upper:upper+height, left-avg:left+height-avg]
    else:
        avg = int((128 - width) / 4)
        crop_img = img[upper-avg:upper+width-avg, left:left + width]
    return crop_img

def preProcessing(img):
    img,_,_ = cv2.split(img)
    img = crop(img)
    img = scale(img)
    img[img < 255] = 0
    vector = img.flatten()
    string = np.array_str(vector)
    string = string.replace("\n", "")
    string = string.replace("]","").replace("[","")
    string = re.sub(r"\s+"," ",string) + "\n"
    f = open('j.txt' , 'a+')
    f.write(string)


if __name__ == '__main__':
    img = cv2.imread('hsf_0_00046.png')
    preProcessing(img)
