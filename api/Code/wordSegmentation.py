import cv2
import numpy as np

class WordSegmentation:

    def removeHorizontalLines(self,thiningImage, originalImage):

        minPixels = 2
        emptyRowsBelow = []
        emptyRowsup = []
        RowHasPixel = []

        # remove bottom lines
        for row in range(round(len(thiningImage) / 2), len(thiningImage)):
            whiteBixels = 0
            for col in range(len(thiningImage[0])):
                if thiningImage[row, col] == 255:
                    whiteBixels += 1

            if whiteBixels == 0:
                emptyRowsBelow.append(row)
            if whiteBixels == minPixels:
                RowHasPixel.append(row)

        # remove top lines
        for row in reversed(range(0, round(len(thiningImage) / 2))):
            whiteBixels = 0
            for col in range(len(thiningImage[0])):
                if thiningImage[row, col] == 255:
                    whiteBixels += 1

            if whiteBixels == 0:
                emptyRowsup.append(row)
            if whiteBixels == minPixels:
                RowHasPixel.append(row)

        if (emptyRowsup != []):
            thiningImage[0:emptyRowsup[0], :] = 0
            originalImage[0:emptyRowsup[0], :] = 0
        else:
            thiningImage[0:2, :] = 0
            originalImage[0:2, :] = 0

        if (emptyRowsBelow != []):
            thiningImage[emptyRowsBelow[0]:, :] = 0
            originalImage[emptyRowsBelow[0]:, :] = 0
        else:
            thiningImage[len(thiningImage) - 2:len(thiningImage), :] = 0
            originalImage[len(thiningImage) - 2:len(thiningImage), :] = 0

        return thiningImage, originalImage

    def removeVerticalLines(self,thiningImage):

        # cv2.imshow("before",image)
        lineColsRight = []
        lineColsleft = []
        NoOfPixelsCol = []

        # remove left Lines
        for col in range(len(thiningImage[0])):
            whiteBixels = 0
            for row in range(len(thiningImage)):
                if thiningImage[row, col] == 255:
                    whiteBixels += 1

            if whiteBixels == 0:
                break
            else:
                lineColsleft.append(col)
                NoOfPixelsCol.append(whiteBixels)
        for col, NoOFPixel in zip(lineColsleft, NoOfPixelsCol):
            if NoOFPixel > 3:
                thiningImage[:, col] = 0


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

    def calc(self,thiningImage):
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
        # return max(countArr)

        # print(countArr)
        avg = countArr[0]
        x = 0
        for integer in countArr:
            if integer - avg > 4:
                avg = integer
                x = 1

        if x == 1:
            return avg
        else:
            return 1000

    def wordSegmentaion(self,thiningImage, originalImage):
        # cv2.imshow("before", thiningImage)
        thiningImage, originalImage = self.removeHorizontalLines(thiningImage, originalImage)
        thiningImage = self.removeVerticalLines(thiningImage)

        # cv2.imshow("after",thiningImage)
        cv2.waitKey()
        cv2.destroyAllWindows()

        print("1")
        # dilation
        kernel = np.ones((20, self.calc(thiningImage)), np.uint8)

        img_dilation = cv2.dilate(thiningImage, kernel, iterations=1)
        # cv2.imshow('dilated',img_dilation)
        # cv2.waitKey(0)

        # find contours
        im2, ctrs, hier = cv2.findContours(img_dilation.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        # sort contours
        sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[0])
        # print(len(sorted_ctrs))
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
                #cv2.imwrite("output\\wordSegmentation\\" + str(counter()) + ".png", roi_original)
                # cv2.imwrite("output\\wordSegmentation\\"+str(counter()) + "thined.png", roi2_thining)
                #cv2.rectangle(thiningImage, (x, y), (x + w, y + h), (90, 0, 255), 2)
                #characterSegmentation(roi2_thining, roi_original)

