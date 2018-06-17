from random import random

import cv2
import math

from api.Code.CharacterSegmentation import CharacterSegmentation
from api.Code.Predict import Predict
from api.Code.RowSegmentation import RowSegmentation
from api.Code.ColSegmentation import ColSegmentation
from api.Code.WordSegmentation import WordSegmentation


class ImageParser:
    def parse(image):
        predict = Predict()
        row_segment = RowSegmentation(image)
        rows = row_segment.row_segmentation()
        sheet = []
        count = 0
        for row in rows:
            cv2.imwrite('output/rows/' + str(count) + ".png", row)
            count = count + 1
            print('in row')
            sheet_col = []
            col_segment = ColSegmentation()
            columns = col_segment.col_segmentation(row)
            for col in columns:
                cv2.imwrite('output/cols/' + str(count) + ".png", col[1])
                cv2.imwrite('output/cols/' + str(count) + "_thinning.png", col[0])
                count = count + 1
                print('in col')
                col_txt = ''
                word_segment = WordSegmentation(col[0], col[1])
                words = word_segment.word_segmentaion()
                for word in words:
                    cv2.imwrite('output/wordSegmentation/' + str(count) + ".png", word[1])
                    cv2.imwrite('output/wordSegmentation/' + str(count) + "_thinning.png", word[0])
                    count = count + 1
                    print('in word')
                    char_segment = CharacterSegmentation(word[0], word[1])
                    chars = char_segment.character_segmentation()
                    for char in chars:
                        print('in char')
                        char_text = predict.predict(char)
                        col_txt = col_txt + char_text
                        cv2.imwrite('output/characterSegmentation/'+str(count)+char_text+".png", char)
                        count = count +1
                    col_txt = col_txt + ' '
                sheet_col.append(col_txt)
            sheet.append(sheet_col)
        return sheet