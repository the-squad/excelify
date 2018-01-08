
import cv2
import math
import numpy as np
import os
import operator
import thinning as p
MIN_CONTOUR_AREA = 100

RESIZED_IMAGE_WIDTH = 500
RESIZED_IMAGE_HEIGHT = 500




def toTxt(intmatrix):
    '''Change a 2d list of lists of 1/0 ints into lines of '#' and '.' chars'''
    return '\n'.join(''.join(('#' if p else '.') for p in row) for row in intmatrix)

def noise_clearing(color_img):
    noise_cleared = cv2.fastNlMeansDenoisingColored(color_img, None, 10, 10, 7, 21)
    return noise_cleared

'''
class ContourWithData():

    npaContour = None
    boundingRect = None
    intRectX = 0
    intRectY = 0
    intRectWidth = 0
    intRectHeight = 0
    fltArea = 0.0

    def calculateRectTopLeftPointAndWidthAndHeight(self):
        [intX, intY, intWidth, intHeight] = self.boundingRect
        self.intRectX = intX
        self.intRectY = intY
        self.intRectWidth = intWidth
        self.intRectHeight = intHeight

    def checkIfContourIsValid(self):
        if self.fltArea > MIN_CONTOUR_AREA:
            return False
        return True
'''
#imgROIResized = cv2.resize(imgTestingNumbers, (RESIZED_IMAGE_WIDTH, RESIZED_IMAGE_HEIGHT))

#imgROIResized=noise_clearing(imgROIResized)

def main():
    w=0
    b=0
    imgTestingNumbers = cv2.imread("26.jpg")
    imgGray = cv2.cvtColor(imgTestingNumbers, cv2.COLOR_BGR2GRAY)
    cv2.imshow("img", imgGray)
    (thresh, im_bw) = cv2.threshold(imgGray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    cv2.imshow("Thres", im_bw)
    for i in range(len(im_bw)):
        for j in range(len(im_bw[0])):
            if im_bw[i, j] == 0:
                b += 1
            else:
                w += 1
    if (w > b):
        print("w")
        im_bw = cv2.bitwise_not(im_bw)
    else:
        print("b")
    tinging_img=p.guo_hall_thinning(im_bw)
    cv2.imshow("skel",tinging_img )




    arr=[]


    for i in range(len(tinging_img[0])):
        whitePixel = 0
        for j in range(len(tinging_img)):
            if tinging_img[j, i] == 255:
                whitePixel+=1

        arr.append(2)

        if whitePixel<=1:
            arr[i]=whitePixel
            #for j in range(len(tinging_img)):
            #tinging_img[j, i]=200


    x=0
    for i in arr:
        if i>0:
            break
        x+=1

    print(arr)

    start, end, psc, threshold = 0, 0, [], 7
    for i in range(x + 1, len(arr) - 1):
        if not arr[i] == 2 and start == 0:
            start = i
        elif arr[i] == 2 and not start == 0:
            end = i - 1
        if not start == 0 and not end == 0:
            if end - start > threshold or arr[start]==0 or arr[end]==0:
                ss = math.floor((start + end) / 2)
                psc.append(ss)
                for j in range(len(tinging_img)):
                    tinging_img[j, ss] = 200
                crop_img = tinging_img[200:400, 100:300]
            start, end = 0, 0

    print(psc)


    cv2.imshow("dwe", tinging_img)
    #print('\nFrom:\n%s' % toTxt(tinging_img))
    cv2.waitKey(0)

    cv2.destroyAllWindows()

    return

if __name__ == "__main__":
    main()
# end i