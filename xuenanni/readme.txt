Readme
Team: HouseMatters
Team member: Xuenan Ni, Yihang Sui and Yiling Xie

The website we made is http://web.mit.edu/xuenanni/www/housematters/

Project Overview:
In this project, we analyzed the rental housing market in Cambridge and Somerville by visualizing: housing monthly rent, housing type, housing location and housing description.
As to fulfill personal interactive purpose, we used carto and google chart to visualize our data and made our own website to show the analyzation result to other users.
Project Objective:
In this project, we try to answer the following questions:
How does house rent varies across different neighborhoods in Cambridge and Somerville?
Where do rental houses cluster in Cambridge and Somerville?
What types of housing are most popular in Cambridge and Somerville?
How does the number of posting and housing rent vary in one year period?
What are the most frequent words used in housing posting?

Main part:
1. Parsing data
2. Data analysis
3. Data visualization
[ Data Soure:
April 2017: Boston.Craigslist.org (parsing by ourselves)
2015-2016: MAPC Craigslist Data provided by Prof. Joseph Ferreira ]
[ Data Summary:
April 2017: 7149 posting, 4144 filtered postings
41446 filtered posting ]
4. Website building

Procedures: 
--Parsing Data
1. Scrapy--download scrapy from https://scrapy.org/ you can read our code in folder "code_scrapy/craigslist_sample/spiders/test" using python to get all urls of each post after you search for zip codes in Cambridge and Somerville. Running the code returns files containing all the titles and urls for each zip code..  

2. Javascript--install npm of “request”, “cheerio”, “shelljs”, “fs”, “csv-write-stream”. Open the folder “code_javascript/add_data.js” and run “exercise.one” where you can combine all the urls.

3. Python--Combine all the urls per zip code and remove duplicates by examining repeating titles. Refer code in file “code_python/combine_zipcodes” and “code_python/remove_duplicates”

4. Javascript--Complete the prefix with “http://boston.craigslist.org”. Refer to “exercise.three” in “code_javascript/add_data.js”

5. Javascript--Curl all the content from the website, store the content into a local drive and combine the information from individual web page into one .js file. Refer to exercise.four, exercise.five and exercise.six in “code_javascript/add_data.js”

6. Javascript--extract key information from the file generated from the previous step. Use cheerio to identify the position where key info like title, link, description, etc. are stored and restore the data in an organized format. Refer to Refer to exercise.seven in “code_javascript/add_data.js”.

7. Python: filter out the duplicates introducing from combining posts from all zip codes one more time. Refer to “code_python/remove_duplicates”.

8. Javascript--export the .js file into .csv file because we want to use Carto to visualize spatial data and Carto takes .csv format. Refer to exercise.eight in “code_javascript/add_data.js”.

9. By reading the .csv file (data/csv_postgres/house_data), we discard rows with no available longtitude and latitude. 

10.Javascript and Python: generate word count. Refer to exercise.nine, exercise.ten, exercise.eleven and exercise.twelve in “code_javascript/add_data.js” and “code_python/wordcount_filter”. 


--Data Visualization
1. Carto: upload the .csv and shapefiles like Cambridge and Somerville’s neighbrhood polygons, MBTA stations, etc. to make maps. The online mapping tool Carto is at https://carto.com/

2. ArcGIS and QGIS
 
--Data Analysis
11. Postgres: select posts by season using SQL. We can see how many posts/what types of the room are by different selection query. (http://urbansim.mit.edu/phppgadmin/) The table are under folder “data/csv_postgres”.

12. Google chart: insert data from step 11 into google chart’ html. Refer to folder “data/google chart”.


--Website building
1. CSS--bootstrap template setting and scrolling navigation menu setting
2. Js--bootstrap js, jquery.js and scrolling navigation.js
3. Html--index.html & pop-up.html 
Index.html--include website contents;
Head: font link (google font), title, css link (local css), google chart script
Body:
Navigation: navigation bar
intro/ head section: head background picture and the website title
Rental price analysis:3 carto geospatial map and their descriptions respectively
Housing count analysis: 2 carto geospatial map and their descriptions respectively
Room type analysis: 1 carto geospatial map, 1 google bar chart and their descriptions respectively
Word cloud: 1 d3 wordcloud picture, 1 google bar chart and their descriptions respectively
History analysis: 1 carto geospatial video, 1 google bar chart and their descriptions respectively

About section: team introduction
Contact section: contact table and pop-up.php
Footer section: website ending
JS link:
end...

Pop-up.html--showing the users that their messages have been received after clicking “send message” 
4. Wordcloud.svg--formed from d3 wordcloud website (https://www.jasondavies.com/wordcloud/) for displaying in html
5. Img folder--including all the images we use in our website
