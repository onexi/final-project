# -*- coding: utf-8 -*-
"""
Created on Sat Apr 29 14:49:01 2017

@author: yilingx
"""

import json


content = []
zipcodes = ['02138','02139','02141','02142','02143','02144','02145','02163']

for zipcode in zipcodes:
    with open('./filtered_new/' + str(zipcode)+'.js') as data:
        d = json.load(data)
        content += d

with open('./filtered_new/all_yl.json', 'w') as outfile:  
    json.dump(content,outfile,indent=4, separators=(',', ':'))