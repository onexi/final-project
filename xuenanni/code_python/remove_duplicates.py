# -*- coding: utf-8 -*-
"""
Created on Sat Apr 29 16:33:36 2017

@author: yilingx
"""

import json
zipcode = '02140'

with open('./filtered_new/all_yl.json') as data:
    file = json.load(data)
    filtered = []
    title_list=[]
    for item in file:
        if item["title"] not in title_list:
            filtered += [item]
            title_list += item["title"]
            
with open('./filtered_new/all_filtered1.json', 'w') as outfile:  
    json.dump(filtered,outfile,indent=4, separators=(',', ':'))