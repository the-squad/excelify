import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from keras.callbacks import EarlyStopping, ModelCheckpoint
from keras.utils import np_utils
from tensorflow.python.keras._impl.keras.optimizers import Adam
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import MaxPooling2D, Dropout
from tensorflow.python.keras.layers import Conv2D, Dense, Flatten

from api.Code.ModelProcessing import ModelProcessing


class ModelGenrator(ModelProcessing):
    def __init__(self):
        super(ModelGenrator,self).__init__()
        self.train_path = "../Classification Model/emnist-balanced-train.csv"


    def plot_accuracy(self,history):
        # summarize history for accuracy
        plt.plot(history.history['acc'])
        plt.plot(history.history['val_acc'])
        plt.title('model accuracy')
        plt.ylabel('accuracy')
        plt.xlabel('epoch')
        plt.legend(['train', 'test'], loc='upper left')
        plt.show()

    def plot_loss(self,history):
        # summarize history for loss
        plt.plot(history.history['loss'])
        plt.plot(history.history['val_loss'])
        plt.title('model loss')
        plt.ylabel('loss')
        plt.xlabel('epoch')
        plt.legend(['train', 'test'], loc='upper left')
        plt.show()

    def generate(self):
        train = pd.read_csv(self.train_path)
        test = pd.read_csv(self.test_path)
        X_train, y_train, _ = self.preprocess_data(train)
        X_test, y_test, _ = self.preprocess_data(test)

        model = Sequential()
        model.add(Conv2D(kernel_size=5,
                        strides=1,
                        filters=32,
                        activation='relu',
                        name='conv_layer1',
                        input_shape=self.img_shape_keras,
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
        model.add(Dense(self.num_classes, activation='softmax'))

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

        self.plot_accuracy(history)
        self.plot_loss(history)


