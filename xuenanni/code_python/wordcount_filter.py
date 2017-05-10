# -*- coding: utf-8 -*-
"""
Created on Sun May  7 22:27:20 2017

@author: yilingx
"""

import json


cutoff = 100
delete = ['for', 'in', 'within', 'and', 'here', 'i', 'am', 'you', 'today', 'available',
          'forward', 'us', 'pm', 'am', 'us', 'if', 'looking', 'min', 'free', 'look', 'email',
          'phone', 'solutions', 'see', 'note', 'one', 'three', 'price', 'unit', 'some', 'st',
          'ave','pays','building','street','avenue','city','updated','at','all','ss','be', 'to',
          'the', 'many', 'have', 'br', 'sq', 'ft', 'feet', 'no', 'yes', 'outside', 'across','ok',
          'fee','features','jennifer','very','all','include','includes','now','a','has','llc',
          'by','may','on','off','plus','or','lease','inman','common','area','steps','that','apt',
          'recently','lots','home','tons','only','over','most','matt','with','about','throughout'
          ,'rooms','over','detail','minutes','around','minute','details','what','next','between',
          'not','first','second','third','ma','key','carl','super','real','can','we',
          'additional','dali','information','white','end','me','pay','properties','estate',
          'everything','avail','per','subject','sized','move','x','ng','style','will','less',
          'than','showing','deal','keller','williams','olga','bajenova','putnum','belinda','mcmillian',
          'counters','rcg','sf','arrange','showings','able','responde','foot','totally',
          'under','of','ge','appointment','reference','immediate','benoit','opportunity','covered',
          'craig','scanzio','when','responding','lechmere','up','number','id','calvin','jacques','also',
          'top','floor','just','two','away','from','right','included','your','contact','please']

with open('./wordcount.json') as data:
    wordcount = json.load(data)
    filtered = {}
    result = []
    
    new = {}
    for word in wordcount.keys():
        word_l = word.lower()
        if word_l not in delete:
            new[word_l] = new.get(word_l, 0) + wordcount[word]
        
        
    for word in new.keys():
        if new[word] >=cutoff and word.isalpha():
                item = {}
                word_lower = word.lower()
                filtered[word_lower] = new[word]
                item['text'] = word_lower
                item['size'] = new[word]
                result.append(item)
    
     
with open('./wordcount_cut100.json', 'w') as outfile:  
    json.dump(result,outfile)
#    json.dump(filtered,outfile,indent=4, separators=(',', ':'))

test = ''
text_list = []
for key in filtered.keys():
    for i in range(int(round(filtered[key]/10,0))):
        test += key + ' '
        text_list.append(key)

with open('./text.json', 'w') as outfile:  
    json.dump(test,outfile)
    