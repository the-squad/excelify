import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from keras.utils import np_utils
from keras.models import load_model

class ModelVerifier:
    def __init__(self):
        self.img_size = 28
        self.img_size_flat = self.img_size * self.img_size
        self.img_shape = (self.img_size, self.img_size)
        self.img_shape_keras = (self.img_size, self.img_size, 1)
        self.num_channels = 1
        self.num_classes = 47
        self.mappings_path = "C:\\Users\\mohamed\\Desktop\\Final\\emnist-balanced-mapping.txt"
        self.test_path = "C:\\Users\\mohamed\\Desktop\\Final\\emnist-balanced-test.csv"
        self.test = pd.read_csv(self.test_path)
        self.mappings = self.load_char_mappings(self.mappings_path)
        self.X_test, self.y_test, self.test_true_classes = self.preprocess_data(self.test)
        self.model = load_model("C:\\Users\\mohamed\\Documents\\GitHub\\graduation-project\\api\\Code\\Model\\model.h5")

    def rotate(self,img):
        flipped = np.fliplr(img.reshape(self.img_size, self.img_size))
        return np.rot90(flipped).reshape(self.img_size, self.img_size, 1)

    def preprocess_data(self,dataset):
        X = dataset.iloc[:, 1:]
        y = dataset.iloc[:, 0]
        X = np.asarray(X).reshape(dataset.shape[0], self.img_size, self.img_size, 1).astype('float32')
        X /= 255
        for i in range(len(X)):
            X[i] = self.rotate(X[i])
        true_classes = y
        y = np_utils.to_categorical(y, 47)
        return X, y, true_classes

    def plot_images(self,images, cls_true, cls_pred=None):
        assert len(images) == len(cls_true) == 16

        # Create figure with 3x3 sub-plots.
        fig, axes = plt.subplots(4, 4)
        fig.subplots_adjust(hspace=0.3, wspace=0.3)

        for i, ax in enumerate(axes.flat):
            # Plot image.
            ax.imshow(images[i].reshape(self.img_size, self.img_size), cmap='binary')

            # Show true and predicted classes.
            if cls_pred is None:
                xlabel = "True: {0}".format(cls_true[i])
            else:
                xlabel = "True: {0}, Pred: {1}".format(cls_true[i], cls_pred[i])

            # Show the classes as the label on the x-axis.
            ax.set_xlabel(xlabel)

            # Remove ticks from the plot.
            ax.set_xticks([])
            ax.set_yticks([])

        plt.show()

    def plot_example_errors(self,cls_pred):

        # cls_pred is an array of the predicted class-number for
        # all images in the test-set.

        # Boolean array whether the predicted class is incorrect.
        incorrect = (cls_pred != self.test_true_classes)

        # Get the images from the test-set that have been
        # incorrectly classified.
        images = self.X_test[incorrect]

        # Get the predicted classes for those images.
        cls_pred = cls_pred[incorrect]

        # Get the true classes for those images.
        cls_true = self.test_true_classes[incorrect]

        true_classes = []
        for i in cls_true:
            true_classes.append(chr(self.mappings.get(i)))

        pred_classes = []
        for i in cls_pred:
            pred_classes.append(chr(self.mappings.get(i)))

        # Plot the first 9 images.
        self.plot_images(images=images[0:16],
                    cls_true=true_classes[0:16],
                    cls_pred=pred_classes[0:16])

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

    def plot_examples(self):
        # plotting examples
        images = self.X_test[0:16]
        labels = self.test_true_classes[0:16]
        cls_true = []
        for i in labels:
            cls_true.append(chr(self.mappings.get(i)))

        y_pred = self.model.predict(images)
        y_pred_cls = np.argmax(y_pred, axis=1)
        cls_pred = []
        for i in y_pred_cls:
            cls_pred.append(chr(self.mappings.get(i)))
        self.plot_images(images=images, cls_true=cls_true, cls_pred=cls_pred)

    def plot_error(self):
        # plotting error examples
        y_pred = self.model.predict(self.X_test)
        cls_pred = np.argmax(y_pred, axis=1)
        self.plot_example_errors(cls_pred=cls_pred)

    def verify(self):
        # If you want to plot some examples
        self.plot_examples()

        # If you want to plot some missclassified examples
        self.plot_error()