class ModelProcessing:
    def __init__(self):
        self.img_size = 28
        self.img_size_flat = self.img_size * self.img_size
        self.img_shape = (self.img_size, self.img_size)
        self.img_shape_keras = (self.img_size, self.img_size, 1)
        self.num_channels = 1
        self.num_classes = 47
        self.mappings_path = "../Classification Model/emnist-balanced-mapping.txt"
        self.test_path = "../Classification Model/emnist-balanced-test.csv"

    def rotate(self, img):
        flipped = np.fliplr(img.reshape(self.img_size, self.img_size))
        return np.rot90(flipped).reshape(self.img_size, self.img_size, 1)

    def preprocess_data(self, dataset):
        X = dataset.iloc[:, 1:]
        y = dataset.iloc[:, 0]
        X = np.asarray(X).reshape(dataset.shape[0], self.img_size, self.img_size, 1).astype('float32')
        X /= 255
        for i in range(len(X)):
            X[i] = self.rotate(X[i])
        true_classes = y
        y = np_utils.to_categorical(y, 47)
        return X, y, true_classes