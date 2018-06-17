from keras.models import load_model
import os

class Predict:

    def __init__(self):
        self.mappings_path = os.path.dirname(os.path.abspath(__file__))+"/../Classification Model/emnist-balanced-mapping.txt"
        self.model = load_model(os.path.dirname(os.path.abspath(__file__))+"/../Classification Model/model.h5")
        self.mappings = self.load_char_mappings(self.mappings_path)

    def load_char_mappings(self,mapping_path):
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

    def predict(self,image):
        img = image.reshape(1, 28, 28, 1)
        img = img.astype('float64')
        # img /= 10
        y_pred_int = self.model.predict_classes(img)
        return chr(self.mappings.get(y_pred_int[0]))