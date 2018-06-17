class ImageSegmentation:
    def __init__(self, thinned_image, original_image):
        self.thinned_image = thinned_image
        self.original_image = original_image
        self.height, self.width = thinned_image.shape

    def get_boundaries(self, col_white_pixels):
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