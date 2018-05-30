import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from keras.callbacks import EarlyStopping, ModelCheckpoint
from keras.utils import np_utils
from tensorflow.python.keras._impl.keras.optimizers import Adam
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import MaxPooling2D, Dropout
from tensorflow.python.keras.layers import Conv2D, Dense, Flatten

img_size = 28
img_size_flat = img_size * img_size
img_shape = (img_size, img_size)
img_shape_keras = (img_size, img_size, 1)
num_channels = 1
num_classes = 47
train_path = "emnist-balanced-train.csv"
test_path = "emnist-balanced-test.csv"

def rotate(img):
    flipped = np.fliplr(img.reshape(28, 28))
    return np.rot90(flipped).reshape(28, 28, 1)
def preprocess_data(dataset):
    X = dataset.iloc[:, 1:]
    y = dataset.iloc[:, 0]
    X = np.asarray(X).reshape(dataset.shape[0], 28, 28, 1).astype('float32')
    X /= 255
    for i in range(len(X)):
        X[i] = rotate(X[i])
    true_classes = y
    y = np_utils.to_categorical(y, 47)
    return X, y, true_classes
def plot_accuracy(history):
    # summarize history for accuracy
    plt.plot(history.history['acc'])
    plt.plot(history.history['val_acc'])
    plt.title('model accuracy')
    plt.ylabel('accuracy')
    plt.xlabel('epoch')
    plt.legend(['train', 'test'], loc='upper left')
    plt.show()
def plot_loss(history):
    # summarize history for loss
    plt.plot(history.history['loss'])
    plt.plot(history.history['val_loss'])
    plt.title('model loss')
    plt.ylabel('loss')
    plt.xlabel('epoch')
    plt.legend(['train', 'test'], loc='upper left')
    plt.show()




train = pd.read_csv(train_path)
test = pd.read_csv(test_path)
X_train, y_train, train_true_classes = preprocess_data(train)
X_test, y_test, test_true_classes = preprocess_data(test)

model = Sequential()
model.add(Conv2D(kernel_size=5,
                 strides=1,
                 filters=32,
                 activation='relu',
                 name='conv_layer1',
                 input_shape=img_shape_keras,
                 padding='same'))

model.add(MaxPooling2D(pool_size=2, strides=2))
model.add(Dropout(0.5))

model.add(Conv2D(kernel_size=5,
                 strides=1,
                 filters=64,
                 activation='relu',
                 name='conv_layer2',
                 padding='same'))
model.add(MaxPooling2D(pool_size=2, strides=2))
model.add(Dropout(0.5))

model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))

optimizer = Adam(lr=0.0001)
model.compile(optimizer=optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
early_stopping_monitor = EarlyStopping(patience=2,monitor='val_acc')
checkpoint = ModelCheckpoint(filepath='model.h5',
                                     monitor='val_acc',
                                     verbose=1,
                                     save_best_only=True,
                                     mode='max')
history = model.fit(X_train, y_train, validation_split=0.3, batch_size=200, epochs=50, callbacks=[early_stopping_monitor,checkpoint],
          verbose=2)

model.summary()
score = model.evaluate(X_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])

plot_accuracy(history)
plot_loss(history)


