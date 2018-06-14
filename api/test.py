import sys
import numpy as np
import json
b = np.arange(1,10).reshape(3,3).tolist()
print(json.dumps(b))