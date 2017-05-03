# Triviathon

### Introduction 
Searching is very important part of present internet era. Most of the search engines try to give you exact and only information you ask through the query. Providing additional interesting facts along with required information makes user search more exploratory and help in increasing the user engagement. The latest search engines have started giving additional information to the user like www.yippy.com and others.

### Technology stack used
* **Backend** Python is used as backend. All the algorithms are written in python.
* **Frontend** It is Flask powered framework with css, html and javascript. (http://flask.pocoo.org/) 

### Data Scrapping 
* **[Pywikibot](https://www.mediawiki.org/wiki/Manual:Pywikibot)** has been used to extract wikipedia data for each searched entity. 
    
### Live Demo
Use the Triviathon web **[app](https://triviathon.herokuapp.com/)** . Click the get trivia about people and also play Triviathon- Game.

### Execution Instructions ( to run locally on the machine):

- Download and extract the Google News Word2Vec model into the "models" folder:
https://drive.google.com/file/d/0B7XkCwpI5KDYNlNUTTlSS21pQmM/edit 
  This is for the case if the entity is not already searched or cached.

- Install the following Python packages:

    $ pip install gensim

    $ pip install pywikibot
    
    $pip install wikipedia
    
    $ pip install flask

- Run the app locally:

    $ python app.py

- Results will appear on the web app screen itself
