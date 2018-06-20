import cv2
import math
import numpy as np

from api.Code.ImageSegmentation import ImageSegmentation


class CharacterSegmentation(ImageSegmentation):
    def __init__(self, thinned_image, original_image):
        super(CharacterSegmentation, self).__init__(thinned_image, original_image)

    def add_padding(self ,img, pad_l, pad_t, pad_r, pad_b):
        height, width = img.shape
        # Adding padding to the left side.
        pad_left = np.zeros((height, pad_l), dtype=np.int)
        img = np.concatenate((pad_left, img), axis=1)

        # Adding padding to the top.
        pad_up = np.zeros((pad_t, pad_l + width))
        img = np.concatenate((pad_up, img), axis=0)

        # Adding padding to the right.
        pad_right = np.zeros((height + pad_t, pad_r))
        img = np.concatenate((img, pad_right), axis=1)

        # Adding padding to the bottom
        pad_bottom = np.zeros((pad_b, pad_l + width + pad_r))
        img = np.concatenate((img, pad_bottom), axis=0)

        return img

    def crop(self , image):
        col_sum = np.where(np.sum(image, axis=0) > 0)
        row_sum = np.where(np.sum(image, axis=1) > 0)
        y1, y2 = row_sum[0][0], row_sum[0][-1]
        x1, x2 = col_sum[0][0], col_sum[0][-1]
        return image[y1:y2, x1:x2]

    def center_image(self ,image):
        cropped_image = self.crop(image)
        height, width = cropped_image.shape
        diff = abs(height - width) / 2
        if (width > height):
            return cv2.resize(self.add_padding(cropped_image, 5, math.ceil(diff) + 5, 5, math.floor(diff) + 5), (28, 28))
        elif (width < height):
            return cv2.resize(self.add_padding(cropped_image, math.ceil(diff) + 5, 5, math.floor(diff) + 5, 5), (28, 28))
        return cv2.resize(cropped_image, (28, 28))
    ##TODO//Refactor_function
    def get_potential_segmentation_col(self, col_white_pixels, word_beginning, word_ending):

        start, end, threshold = 0, 0, 7
        potential_segmentation_col = [word_beginning]
        for col in range(word_beginning + 1, word_ending):
            if col_white_pixels[col] == 0 and start == 0:
                start = col
            elif not col_white_pixels[col] == 0 and not start == 0:
                end = col - 1
            if not start == 0 and not end == 0:
                if end - start >= threshold or col_white_pixels[start] == 0 or col_white_pixels[end] == 0:
                    ss = math.floor((start + end) / 2)
                    potential_segmentation_col.append(ss)
                    for j in range(len(self.thinned_image)):
                        self.thinned_image[j, ss] = 200
                start, end = 0, 0

        return potential_segmentation_col

    def get_col_white_pixels(self):
        col_white_pixels = np.empty(self.width, dtype=np.int8)
        # step1 White Pixel count
        for colIndex in range(self.width):
            whitePixels = 0
            for rowIndex in range(self.height):
                if self.thinned_image[rowIndex, colIndex] == 255:
                    whitePixels += 1
            col_white_pixels[colIndex] = whitePixels if whitePixels <= 1 else 2

        return col_white_pixels

    def character_segmentation(self):

        col_white_pixels = self.get_col_white_pixels()
        word_beginning, word_ending = self.get_boundaries(col_white_pixels)
        potential_segmentation_col = self.get_potential_segmentation_col(col_white_pixels, word_beginning, word_ending)

        cropedImage = []
        for i in range(0, len(potential_segmentation_col) - 1):
            cropedImage.append(
                self.original_image[0:self.height, potential_segmentation_col[i]:potential_segmentation_col[i + 1]])
        cropedImage.append(self.original_image[0:self.height, potential_segmentation_col[-1]:word_ending])

        characters = []

        for img in cropedImage:
            height , width = img.shape
            # img = np.pad(img, pad_width=2, mode='constant')
            # char_image = cv2.resize(img, (28, 28), cv2.INTER_CUBIC)
            try:
                characters.append(self.center_image(img))
            except:
                pass
            # cv2.imwrite("output\\characterSegmentation\\" + str(counter()) + ".png", charimage)

        return characters
