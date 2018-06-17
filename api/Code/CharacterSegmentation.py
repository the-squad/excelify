import cv2
import math
import numpy as np


class CharacterSegmentation:
    def __init__(self, thinned_image, original_image):
        self.thinned_image = thinned_image
        self.original_image = original_image
        self.height, self.width = self.thinned_image.shape

    def get_word_boundaries(self, col_white_pixels):
        begin = 0
        for col in col_white_pixels:
            if col > 0:
                break
            begin += 1
        last = len(col_white_pixels)
        for col in reversed(col_white_pixels):
            if col > 0:
                break
            last -= 1
        return begin, last

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
        word_beginning, word_ending = self.get_word_boundaries(col_white_pixels)
        potential_segmentation_col = self.get_potential_segmentation_col(col_white_pixels, word_beginning, word_ending)

        cropedImage = []
        for i in range(0, len(potential_segmentation_col) - 1):
            cropedImage.append(
                self.original_image[0:self.height, potential_segmentation_col[i]:potential_segmentation_col[i + 1]])
        cropedImage.append(self.original_image[0:self.height, potential_segmentation_col[-1]:word_ending])

        characters = []

        for img in cropedImage:
            img = np.pad(img, pad_width=2, mode='constant')
            char_image = cv2.resize(img, (28, 28), cv2.INTER_CUBIC)
            characters.append(char_image)
            # cv2.imwrite("output\\characterSegmentation\\" + str(counter()) + ".png", charimage)

        return characters
