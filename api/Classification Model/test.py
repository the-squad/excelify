import numpy as np
from keras.models import load_model
import cv2

#for testing on new unseen images

mappings_path = "emnist-balanced-mapping.txt"

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


image = "C:\\Users\\mohamed\\Desktop\\test-images\\28.png"

imgGray = cv2.imread(image)
img = cv2.cvtColor(imgGray, cv2.COLOR_BGR2GRAY)
(thresh, img) = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

img = cv2.resize(img, (28, 28))
img = cv2.bitwise_not(img)
cv2.imshow("asd", img)

print(img.size)

mappings = load_char_mappings(mappings_path)
model = load_model('model.h5')

img = img.reshape(1, 28, 28, 1)
img = img.astype('float64')
img /=10
y_pred_int = model.predict_classes(img)

print(y_pred_int)

print(chr(mappings.get(y_pred_int[0])))
cv2.waitKey()