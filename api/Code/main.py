
import cv2
import math
import numpy as np
import os
import operator
import thinning as p
from keras.models import load_model
MIN_CONTOUR_AREA = 100
import random
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

def original_preprocessing(img):
    w = 0
    b = 0
    for i in range(len(img)):
        for j in range(len(img[0])):
            if img[i, j] == 0:
                b += 1
            else:
                w += 1
    if (w > b):
        im_bw = cv2.bitwise_not(img)
    return im_bw

def characterSegmentation(thinning_img,originalImage):


    #tinging_img=noise_clearing(tinging_img)
    height, width = thinning_img.shape
    arr = np.empty(width, dtype=np.int8)
    # step1 White Pixel count
    for colIndex in range(width):
        whitePixels = 0
        for rowIndex in range(height):
            if thinning_img[rowIndex, colIndex] == 255:
                whitePixels += 1
        arr[colIndex] =  whitePixels if whitePixels<=1 else 2

    begin = 0

    for col in arr:
        if col > 0:
            break
        begin += 1
    last = len(arr)
    for col in reversed(arr):
        if col > 0:
            break
        last -= 1

    start, end, psc, threshold = 0, 0, [], 7

    psc.append(begin)
    for i in range(begin + 1, last):
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

    cv2.imshow("asdasd",thinning_img)
    cv2.waitKey()
    cv2.destroyAllWindows()


    cropedImage = []

    for i in range(0, len(psc) - 1):
        cropedImage.append(originalImage[0:height, psc[i]:psc[i + 1]])
    cropedImage.append(originalImage[0:height, psc[-1]:last])
    i = 0
    for img in cropedImage:
        height,width= img.shape
        # result = []
        # if height > width:
        #     img = np.pad(img, pad_width=round((height-width)/2), mode='constant')
        #     result = np.zeros((height,height))
        #     result[:img.shape[0], :img.shape[1]] = img
        # else:
        #     img = np.pad(img, pad_width=round((width - height) / 2), mode='constant')
        #     result = np.zeros((width,width))
        #     result[:img.shape[0], :img.shape[1]] = img
        img = np.pad(img, pad_width=2, mode='constant')

        #kernel = np.ones((3, 3), np.uint8)

        #img_dilation = cv2.dilate(img, kernel, iterations=1)

        charimage=cv2.bitwise_not(cv2.resize(img,(28,28),cv2.INTER_CUBIC))
        #predictCharacter(charimage)
        cv2.imwrite("output\\characterSegmentation\\" + str(counter()) + ".png",charimage)
def colSegmentation(img):

    im_bw=preprocessing(img)
    original_img_bw = original_preprocessing(img)
    # cv2.imshow('lol', im_bw)
    #cv2.imwrite(str(counter())+'.png',im_bw)
    # cv2.imshow('lol2', img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    Boundries = []
    original_boundaries = []
    height, width = im_bw.shape
    original_height, original_width = original_img_bw.shape

    #for thinned image
    for i in range(len(im_bw[0])):#width(no.of columns)
        blackPixel = 0
        current_cell= i
        for j in range(len(im_bw)):#height(no.of rows in column)
            if im_bw[j, current_cell] == 255:
                blackPixel += 1
            elif (current_cell < len(im_bw[0])-1 and im_bw[j, current_cell + 1] == 255):
                blackPixel += 1
                current_cell+=1
            elif (current_cell != 0 and im_bw[j, current_cell - 1] == 255 ):
                blackPixel += 1
                current_cell-=1

        if blackPixel >= round(height * .90):
            Boundries.append(i)

    #for thinned image
    for i in range(0, len(Boundries) - 1):
        crop = im_bw[0 + 4:height - 3, Boundries[i] + 4:Boundries[i + 1]]
        original_crop = original_img_bw[0 + 4:original_height - 3,Boundries[i] + 4:Boundries[i + 1]]
        img = str(counter())
        if len(crop[0]) > 10 and len(crop) > 10:
            cv2.imwrite("output\\cols\\" + img + ".png", original_crop)
            wordSegmentaion(crop,original_crop)



'''def wordSegmentaion(img2):
    height, width = img2.shape
    histogram = []
    start = []
    end = []
    cropPoints = []

    for i in range(len(img2[0])):
        sum = 0
        for j in range(len(img2)):
            if img2[j][i] == 255:
                sum += 1
        histogram.append(sum/height)
    for x in range(len(histogram)-1):
        if histogram[x] == float(0) and histogram[x+1] > float(0):
            start.append(x)
        elif histogram[x+1] == float(0) and histogram[x] > float(0):
            end.append(x)
    print(start)
    print(end)
    for i in range(0, len(start) - 1):
        if start[i + 1] - end[i] > 10:  # space Threshold
            cropPoints.append(start[i + 1])
    print(cropPoints)
    for i in range(0, len(cropPoints)):
        if i == 0:  # firstWord
            croppedImage = img2[0:height, 0:cropPoints[i]]
            if len(croppedImage[0]) > 10:
                cv2.imwrite("output\\wordSegmentation\\" + str(random.randint(1, 10000)) + ".png", croppedImage)
                characterSegmentation(croppedImage)
            #cv2.imshow(str(i) + ".png", croppedImage)
        else:  # anyWord
            croppedImage = img2[0: height, cropPoints[i - 1]:cropPoints[i]]
            if len(croppedImage[0]) > 10:
                cv2.imwrite("output\\wordSegmentation\\" + str(random.randint(1, 10000)) + ".png", croppedImage)
                characterSegmentation(croppedImage)
            #cv2.imshow(str(i) + ".png", croppedImage)

    print(cropPoints)

    if len(cropPoints) == 0:
        #cv2.imshow(str(random.randint(1, 101)) + ".png", img2)
        cv2.imwrite("output\\wordSegmentation\\" + str(random.randint(1, 10000)) + ".png", img2)
        characterSegmentation(img2)
    else:
        croppedImage = img2[0:height, cropPoints[len(cropPoints) - 1]:width]  # lastWord
        #cv2.imshow(str(random.randint(1, 10000)) + ".png", croppedImage)
        if len(croppedImage[0]) > 10:
            cv2.imwrite("output\\wordSegmentation\\" + str(random.randint(1, 10000)) + ".png", croppedImage)
            characterSegmentation(croppedImage)

    cv2.waitKey(0)
'''
def wordSegmentaion(thiningImage,originalImage):
    # dilation
    kernel = np.ones((20, 40), np.uint8)

    img_dilation = cv2.dilate(thiningImage, kernel, iterations=1)
    #cv2.imshow('dilated',img_dilation)
    #cv2.waitKey(0)

    # find contours
    im2, ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # sort contours
    sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[0])
    #print(len(sorted_ctrs))
    for i, ctr in enumerate(sorted_ctrs):
        # Get bounding box
        x, y, w, h = cv2.boundingRect(ctr)

        # Getting ROI
        roi_original = originalImage[y:y + h, x:x + w]
        roi2_thining = thiningImage[y:y + h, x:x + w]

        # show ROI

        height = roi_original.shape[0]
        width = roi_original.shape[1]
        if(height>40 and width>40):
            #cv2.imshow('segment no:' + str(i), roi)
            cv2.imwrite("output\\wordSegmentation\\"+str(counter()) + ".png", roi_original)
            #cv2.imwrite("output\\wordSegmentation\\"+str(counter()) + ".png", roi2)
            cv2.rectangle(thiningImage, (x, y), (x + w, y + h), (90, 0, 255), 2)
            characterSegmentation(roi2_thining,roi_original)
            cv2.waitKey(0)

def rowSegmentation(img):
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, img) = cv2.threshold(imgGray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    height, width = img.shape
    thirdWidth = width / 3
    pointsSet = set()
    points = list()
    for x in range(len(img)):
        blackPixelCount = 0
        SequentiallyPixels= []
        for y in range(len(img[0])):
            if img[x][y] == 0:
                blackPixelCount += 1
                SequentiallyPixels.append(True)
            else:
                SequentiallyPixels.append(False)
            if blackPixelCount >= thirdWidth and SequentiallyPixels.count(True) >= SequentiallyPixels.count(False): #enhanced rowSegmentaion
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
                cv2.imwrite("output\\rows\\" + str(x) + ".png", croppedImage)
                colSegmentation(croppedImage)

def resizeimg(input_img, w, h):
    # print "Hello"
    o_height = input_img.shape[0]
    o_width = input_img.shape[1]
    aspect_ratio = o_width / (o_height * 1.0)

    if (aspect_ratio < 1.777):  # aspect ratio less than 16:9
        # aspectRatio = o_width / (o_height*1.0)
        height = h
        width = int(height * aspect_ratio)
        input_img = cv2.resize(input_img, (width, height))

    elif (aspect_ratio > 1.777):  # aspect ratio more than 16:9

        # aspectRatio = o_height / (o_width*1.0)
        width = w
        height = int(width / aspect_ratio)
        input_img = cv2.resize(input_img, (width, height))

    else:  # aspect ratio exactly 16:9
        input_img = cv2.resize(input_img, (h, h))
    return input_img




def load_char_mappings(mapping_path):
    """
    load EMNIST character mappings. This maps a label to the correspondent byte value of the given character
    return: the dictionary of label mappings
    """
    mappings = {}
    with open(mapping_path) as f:
        for line in f:
            (key, val) = line.split()
            mappings[int(key)] = int(val)

    return mappings


def predictCharacter(image):
    cv2.imshow("asd",image)
    cv2.waitKey()
    img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    (thresh, img) = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    img = cv2.bitwise_not(img)
    mappings = load_char_mappings("Model//emnist-balanced-mapping.txt")
    model = load_model('Model//model.h5')
    img = img.reshape(1, 28, 28, 1)
    img = img.astype('float64')
    y_pred_int = model.predict_classes(img)
    print(chr(mappings.get(y_pred_int[0])))




def main():
    # os.makedirs("output\\rows")
    # os.makedirs("output\\cols")
    # os.makedirs("output\\wordSegmentation")
    # os.makedirs("output\\words-result")
    # os.makedirs("output\\OriginalCols")
    # img = cv2.imread("Tables-examples\\table10.jpg")
    # rowSegmentation(img)
    img = cv2.imread("C:\\Users\\mohamed\\Downloads\\87.png")
    predictCharacter(img)
    #wordSegmentaion(img)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    return


if __name__ == "__main__":
    main()
# end i