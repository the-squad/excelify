
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

def counter():
    if 'cnt' not in counter.__dict__:
        counter.cnt = 20
    counter.cnt += 1
    return counter.cnt

def preprocessing(im_bw):
    w = 0
    b = 0
    for i in range(len(im_bw)):
        for j in range(len(im_bw[0])):
            if im_bw[i, j] == 0:
                b += 1
            else:
                w += 1
    if (w > b):
        im_bw = cv2.bitwise_not(im_bw)

    im_bw = p.guo_hall_thinning(im_bw)
    return im_bw



def characterSegmentation(thinning_img):
    #tinging_img=noise_clearing(tinging_img)

    arr = []
    for i in range(len(thinning_img[0])):
        whitePixel = 0
        for j in range(len(thinning_img)):
            if thinning_img[j, i] == 255:
                whitePixel += 1

        arr.append(2)

        if whitePixel <= 1:
            arr[i] = whitePixel
    x = 0
    for i in arr:
        if i > 0:
            break
        x += 1
    y = len(arr)
    for i in reversed(arr):
        if i > 0:
            break
        y -= 1

    start, end, psc, threshold = 0, 0, [], 5
    # print(arr)
    # print(x)
    psc.append(x)
    for i in range(x + 1, y):
        if not arr[i] == 2 and start == 0:
            start = i
        elif arr[i] == 2 and not start == 0:
            end = i - 1
        if not start == 0 and not end == 0:
            if end - start >= threshold or arr[start] == 0 or arr[end] == 0:
                ss = math.floor((start + end) / 2)
                psc.append(ss)
                for j in range(len(thinning_img)):
                    thinning_img[j, ss] = 200
            start, end = 0, 0
    #cv2.imshow("blaadsadasd", thinning_img)
    arr_img = []
    height, width = thinning_img.shape
    #print(psc)
    for i in range(0, len(psc) - 1):
        arr_img.append(thinning_img[0:height, psc[i]:psc[i + 1]])
    arr_img.append(thinning_img[0:height, psc[-1]:y])
    i = 0
    for img in arr_img:
        i += 1
        cv2.imwrite("words-result\\" + str(counter()) + ".png", img)

def colSegmentation(img):

    im_bw=preprocessing(img)
    Boundries = []

    height, width = im_bw.shape

    for i in range(len(im_bw[0])):
        blackPixel = 0
        for j in range(len(im_bw)):
            if im_bw[j, i] == 255 or (i < len(im_bw[0])-1 and im_bw[j, i + 1] == 255) or (i != 0 and im_bw[j, i - 1] == 255 ):
                blackPixel += 1

        if blackPixel >= int(height * 3/4):
            Boundries.append(i)
    for i in range(0, len(Boundries) - 1):
        crop = im_bw[0 + 4:height - 3, Boundries[i] + 4:Boundries[i + 1]]
        img = str(counter())
        if len(crop[0]) > 10 and len(crop) > 10:
            cv2.imwrite("cols\\" + img + ".png", crop)
            characterSegmentation(crop)


def rowSegmentation(img):
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, img) = cv2.threshold(imgGray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    height, width = img.shape
    thirdWidth = width / 3
    blackPixelCount = 0
    pointsSet = set()
    points = list()
    for x in range(len(img)):
        blackPixelCount = 0
        for y in range(len(img[0])):
            if img[x][y] == 0:
                blackPixelCount += 1
            if blackPixelCount >= thirdWidth:
                pointsSet.add(x)
    for x in pointsSet:
        points.append((0, x))
        points.append((width, x))
    points = sorted(points, key=operator.itemgetter(1))
    for x in range(0, len(points), 2):
        if x != len(points) - 1:
            cv2.line(img, points[x], points[x + 1], (0, 0, 255), 2)

    for x in range(0, len(points), 2):
        if x <= len(points) - 3:
            croppedImage = img[points[x][1]:points[x + 3][1], points[x][0]:points[x + 3][0]]
            if len(croppedImage) > 10:
                cv2.imwrite("rows\\" + str(x) + ".png", croppedImage)
                colSegmentation(croppedImage)


def main():
    img = cv2.imread("Tables-examples\\Table.png")
    rowSegmentation(img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return


if __name__ == "__main__":
    main()
# end i