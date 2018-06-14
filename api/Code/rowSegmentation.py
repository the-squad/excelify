import cv2
import operator

class RowSegmentation:
    def __init__(self,image):
        self.image=image
        self.height, self.width = image.shape

    def convert_to_binary(self):
        imgGray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        (_, img) = cv2.threshold(imgGray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        return img

    def is_segmentation_index(self,black_pixel_count,threshold,sequentially_pixels):
        return  black_pixel_count >= threshold and sequentially_pixels.count(True) >= sequentially_pixels.count(False)

    def get_segmentation_indices(self,img):
        segmentation_indices = set()
        threshold = self.width / 3
        for row_index in range(self.height):
            black_pixel_count = 0
            sequentially_pixels = []
            for col_index in range(self.width):
                if img[row_index][col_index] == 0:
                    black_pixel_count += 1
                    sequentially_pixels.append(True)
                else:
                    sequentially_pixels.append(False)
                if self.is_segmentation_index(black_pixel_count,threshold,sequentially_pixels) :  # enhanced rowSegmentaion
                    segmentation_indices.add(row_index)
        return segmentation_indices

    def get_segmentation_points(self,segmentation_indices):
        segmentation_points = list()
        for x in segmentation_indices:
            segmentation_points.append((0, x))
            segmentation_points.append((self.width, x))
        return sorted(segmentation_points, key=operator.itemgetter(1))

    def segmentation(self):
        img = self.convert_to_binary()
        segmentation_indices = self.get_segmentation_indices(img)
        segmentation_points = self.get_segmentation_points(segmentation_indices)
        # for x in range(0, len(segmentation_points), 2):
        #     if x != len(segmentation_points) - 1:
        #         cv2.line(img, segmentation_points[x], segmentation_points[x + 1], (0, 0, 255), 2)
        rows = list()
        for x in range(0, len(segmentation_points), 2):
            if x <= len(segmentation_points) - 3:
                row = img[segmentation_points[x][1]:segmentation_points[x + 3][1], segmentation_points[x][0]:segmentation_points[x + 3][0]]
                if len(row) > 10:
                    rows.append(row)
                    #cv2.imwrite("output\\rows\\" + str(x) + ".png", croppedImage)
                    #colSegmentation(croppedImage)
        return rows