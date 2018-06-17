import cv2
import math
import numpy as np
import operator
import thinning as p
from keras.models import load_model

from api.Code.ImageParser import ImageParser

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
    return im_bw



def characterSegmentation(thinning_img, originalImage):

    # tinging_img=noise_clearing(tinging_img)
    height, width = thinning_img.shape
    arr = np.empty(width, dtype=np.int8)
    # step1 White Pixel count
    for colIndex in range(width):
        whitePixels = 0
        for rowIndex in range(height):
            if thinning_img[rowIndex, colIndex] == 255:
                whitePixels += 1
        arr[colIndex] = whitePixels if whitePixels <= 1 else 2

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
        if arr[i] == 0 and start == 0:
            start = i
        elif not arr[i] == 0 and not start == 0:
            end = i - 1
        if not start == 0 and not end == 0:
            if end - start >= threshold or arr[start] == 0 or arr[end] == 0:
                ss = math.floor((start + end) / 2)
                psc.append(ss)
                for j in range(len(thinning_img)):
                    thinning_img[j, ss] = 200
            start, end = 0, 0

    #cv2.imshow("asdasd", thinning_img)
    cv2.waitKey()
    cv2.destroyAllWindows()

    cropedImage = []

    for i in range(0, len(psc) - 1):
        cropedImage.append(originalImage[0:height, psc[i]:psc[i + 1]])
    cropedImage.append(originalImage[0:height, psc[-1]:last])
    i = 0
    for img in cropedImage:
        height, width = img.shape
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

        # kernel = np.ones((3, 3), np.uint8)

        # img_dilation = cv2.dilate(img, kernel, iterations=1)

        charimage = cv2.bitwise_not(cv2.resize(img, (28, 28), cv2.INTER_CUBIC))
        # predictCharacter(charimage)
        cv2.imwrite("output\\characterSegmentation\\" + str(counter()) + ".png", charimage)


def colSegmentation(img):


    original_imgage = preprocessing(img)   #keep original image after preprocess,background white and words black
    thining_image = p.guo_hall_thinning(original_imgage.copy())  #make thining for image,it make background black and words white


    Boundries = [] #for keep colIndices for crop

    height, width = thining_image.shape

    for colIndex in range(width):  # width(no.of columns)
        whitekPixel = 0
        current_cell = colIndex #to keep track for sequential col contain lines

        for rowIndex in range(height):  # height(no.of rows in column)
            if thining_image[rowIndex, current_cell] == 255: #for check below pixel "high priority than other"
                whitekPixel += 1
            elif (current_cell < width - 1 and thining_image[rowIndex, current_cell + 1] == 255): #for check right below pixel and not out of index
                whitekPixel += 1
                current_cell += 1
            elif (current_cell != 0 and thining_image[rowIndex, current_cell - 1] == 255): #for check left below pixel and not out of index
                whitekPixel += 1
                current_cell -= 1

        if whitekPixel >= round(height * .90): #check Number of pixel , to know it is col or not
            Boundries.append(colIndex)

    # for thinned image
    for i in range(0, len(Boundries) - 1):
        thining_croped_image = thining_image[0:height, Boundries[i]:Boundries[i + 1]]
        original_croped_image = original_imgage[0:height, Boundries[i]:Boundries[i + 1]]
        imgNumber = str(counter())
        if len(thining_croped_image[0]) > 10 and len(thining_croped_image) > 10:
            cv2.imwrite("output\\cols\\" + imgNumber + ".png", original_croped_image)
            wordSegmentaion(thining_croped_image, original_croped_image)


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


def calc(thiningImage):
    # tinging_img=noise_clearing(tinging_img)
    height, width = thiningImage.shape
    arr = np.empty(width, dtype=np.int8)
    # step1 White Pixel count
    for colIndex in range(width):
        whitePixels = 0
        for rowIndex in range(height):
            if thiningImage[rowIndex, colIndex] == 255:
                whitePixels += 1
        arr[colIndex] = whitePixels if whitePixels < 1 else 2
    countArr = []
    counter = 0

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

    # print(begin,"---",last)

    for colIndex in range(begin, last):
        if arr[colIndex] == 0:
            counter = counter + 1
        else:
            if counter > 0:
                countArr.append(counter)
            counter = 0
    #return max(countArr)

    ''''# print(countArr)
    avg=countArr[0]
    x=0
    for integer in countArr:
        if integer-avg >4:
            avg=integer
            x=1


    if x==1:
        return avg
    else:
        return 1000
    ###############################3'''


    # print(countArr)
    # print("UNsorted-----", countArr)
    countArr.sort()

    threshold = 0
    x = 0
    for i in reversed(range(len(countArr))):
        if countArr[i] - countArr[i - 1] > 6 and i > 1:
            threshold = countArr[i]
            x = 1

    if x == 1:
        return threshold
    else:
        return 1000




def removeHorizontalLines(thiningImage,originalImage):
    minPixels=2
    emptyRowsBelow=[]
    emptyRowsup=[]
    RowHasPixel=[]

    #remove bottom lines
    for row in range(round(len(thiningImage)/2),len(thiningImage)):
        whiteBixels=0
        for col in range(len(thiningImage[0])):
            if thiningImage[row,col]==255:
                whiteBixels+=1

        if whiteBixels==0:
            emptyRowsBelow.append(row)
        if whiteBixels==minPixels:
            RowHasPixel.append(row)

    #remove top lines
    for row in reversed(range(0,round(len(thiningImage) / 2))):
        whiteBixels = 0
        for col in range(len(thiningImage[0])):
            if thiningImage[row, col] == 255:
                whiteBixels += 1

        if whiteBixels == 0:
            emptyRowsup.append(row)
        if whiteBixels == minPixels:
             RowHasPixel.append(row)


    #if emptyRows==[]:

    # print(emptyRowsBelow)
    # print(emptyRowsup)


    if (emptyRowsup != []):
        thiningImage[0:emptyRowsup[0], :]=0
        originalImage[0:emptyRowsup[0], :]=0
    else:
        thiningImage[0:2, :] = 0
        originalImage[0:2, :] = 0

    if (emptyRowsBelow != []):
        thiningImage[emptyRowsBelow[0]:, :]=0
        originalImage[emptyRowsBelow[0]:, :]=0
    else:
        thiningImage[len(thiningImage) - 2:len(thiningImage), :] = 0
        originalImage[len(thiningImage) - 2:len(thiningImage), :] = 0


    return thiningImage,originalImage

'''
def removeVerticalLines(thiningImage):

    #cv2.imshow("before",image)
    lineColsRight=[]
    lineColsleft=[]
    NoOfPixelsCol=[]

    #remove left Lines
    for col in range(len(thiningImage[0])):
        whiteBixels=0
        for row in range(len(thiningImage)):
            if thiningImage[row, col] == 255:
                whiteBixels += 1

        if whiteBixels == 0:
            break
        else:
            lineColsleft.append(col)
            NoOfPixelsCol.append(whiteBixels)
    for col,NoOFPixel in zip(lineColsleft,NoOfPixelsCol):
        if NoOFPixel>3:
            thiningImage[:,col]=0


     # remove right Lines
    for col in reversed(range(len(thiningImage[0]))):
        whiteBixels = 0
        for row in range(len(thiningImage)):
            if thiningImage[row, col] == 255:
                whiteBixels += 1

        if whiteBixels == 0:
            break
        else:
            lineColsRight.append(col)
            NoOfPixelsCol.append(whiteBixels)
    for col, NoOFPixel in zip(lineColsRight, NoOfPixelsCol):
        if NoOFPixel > 3:
            thiningImage[:, col] = 0

    return thiningImage

'''
def removeVerticalLines(image):
    # remove left Lines
    image[:,0:2]=0
    # remove right Lines
    image[:,len(image[0])-2:len(image[0])]=0


    return image

def wordSegmentaion(thiningImage,originalImage):
    #cv2.imshow("before", thiningImage)
    thiningImage = removeVerticalLines(thiningImage)
    thiningImage,originalImage=removeHorizontalLines(thiningImage,originalImage)



    #cv2.imshow("after",thiningImage)
    cv2.waitKey()
    cv2.destroyAllWindows()


    print("1")
    # dilation
    kernel = np.ones((20,calc(thiningImage)), np.uint8)

    img_dilation = cv2.dilate(thiningImage, kernel, iterations=1)
    #cv2.imshow('dilated',img_dilation)
    #cv2.waitKey(0)

    # find contours
    im2, ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # sort contours
    sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[0])
    #print(len(sorted_ctrs))
    for i, ctr in enumerate(sorted_ctrs):
        print("2")
        # Get bounding box
        x, y, w, h = cv2.boundingRect(ctr)

        # Getting ROI
        roi_original = originalImage[y:y + h, x:x + w]
        roi2_thining = thiningImage[y:y + h, x:x + w]

        # show ROI

        height = roi_original.shape[0]
        width = roi_original.shape[1]

        if (height > 8 and width > 8):
            print("3")
            # cv2.imshow('segment no:' + str(i), roi)
            cv2.imwrite("output\\wordSegmentation\\" + str(counter()) + ".png", roi_original)
            #cv2.imwrite("output\\wordSegmentation\\"+str(counter()) + "thined.png", roi2_thining)
            cv2.rectangle(thiningImage, (x, y), (x + w, y + h), (90, 0, 255), 2)
            characterSegmentation(roi2_thining, roi_original)


def rowSegmentation(img):
    #cv2.imshow("before",img)
    cv2.waitKey()
    cv2.destroyAllWindows()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    (thresh, img) = cv2.threshold(imgGray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    height, width = img.shape
    thirdWidth = width / 3
    pointsSet = set()
    points = list()
    for x in range(len(img)):
        blackPixelCount = 0
        SequentiallyPixels = []
        for y in range(len(img[0])):
            if img[x][y] == 0:
                blackPixelCount += 1
                SequentiallyPixels.append(True)
            else:
                SequentiallyPixels.append(False)
            if blackPixelCount >= thirdWidth and SequentiallyPixels.count(True) >= SequentiallyPixels.count(
                    False):  # enhanced rowSegmentaion
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
    cv2.imshow("asd", image)
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
    img = cv2.imread("Tables-examples\\Table19.png")

    rowSegmentation(img)
    # predictCharacter(img)
    # wordSegmentaion(img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return


if __name__ == "__main__":
    img = cv2.imread("Tables-examples\\Table10.png")
    sheet = ImageParser()
    sheet = sheet.parse(img)
    print(sheet)
    # main()
    # end i



