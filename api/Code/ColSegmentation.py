import cv2
import thinning as p


class ColSegmentation:
    def preprocessing(self, im_bw):

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

    def getBoundariesIndices(self, thining_image):

        height, width = thining_image.shape

        Boundries = []

        for colIndex in range(width):  # width(no.of columns)
            whitekPixel = 0
            current_cell = colIndex  # to keep track for sequential col contain lines

            for rowIndex in range(height):  # height(no.of rows in column)
                if thining_image[rowIndex, current_cell] == 255:  # for check below pixel "high priority than other"
                    whitekPixel += 1
                elif (current_cell < width - 1 and thining_image[
                    rowIndex, current_cell + 1] == 255):  # for check right below pixel and not out of index
                    whitekPixel += 1
                    current_cell += 1
                elif (current_cell != 0 and thining_image[
                    rowIndex, current_cell - 1] == 255):  # for check left below pixel and not out of index
                    whitekPixel += 1
                    current_cell -= 1

            if whitekPixel >= round(height * .90):  # check Number of pixel , to know it is col or not
                Boundries.append(colIndex)
        return Boundries

    def colSegmentation(self, img):

        original_imgage = self.preprocessing(
            img)  # keep original image after preprocess,background white and words black
        thining_image = p.guo_hall_thinning(
            original_imgage.copy())  # make thining for image,it make background black and words white
        height, width = thining_image.shape

        Boundries = self.getBoundariesIndices(thining_image)

        colIndices = []

        # for thinned image
        for col in range(0, len(Boundries) - 1):
            thining_croped_image = thining_image[0:height, Boundries[col]:Boundries[col + 1]]
            original_croped_image = original_imgage[0:height, Boundries[col]:Boundries[col + 1]]
            # imgNumber = str(counter())
            if len(thining_croped_image[0]) > 10 and len(thining_croped_image) > 10:
                colIndices.append((thining_croped_image, original_croped_image))
                # cv2.imwrite("output\\cols\\" + imgNumber + ".png", original_croped_image)
                # wordSegmentaion(thining_croped_image, original_croped_image)
        return colIndices
