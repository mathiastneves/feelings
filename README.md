Video Demo: https://youtu.be/3rLlOHQyKdU

## INTRODUCTION 
This application is based on the work of Dr. Gloria Wilcox known as the ‘Wheel of Feelings’. It allows users to identify more specific feelings based on broader feelings, check their definition and track their feelings daily.

## DISTINCTIVENESS AND COMPLEXITY
This application is distinct from other apps developed during the course, as it does not resemble a social media network, ecommerce website, wiki page or search page. Code was not reused from any of these projects.

Some features that are distinct from the previous projects are:
* Using CSS to make the app mobile-responsive
* Using CSS to create animations
* Using external APIs and learning to navigate CORS errors
* Using buttons inside forms and preventing them from refreshing the page
* Implementing fixtures
* Implementing a complex form and extracting data from checkboxes

As per the requirement, the application is complex enough, as it includes 3 models, utilizes Django for the backend and JavaScript for the frontend. More details about what each file is used for can be found below.

## FUNCTIONALITY
The main section allows users to select one or more feelings that define how they are feeling on that day - from a list of 7 common and easily identifiable feelings. 
After selecting these broad feelings, clicking ‘Dig Deeper’ will reveal several more specific feelings that are related to the broader feelings selected prior.
Upon clicking each feeling, the main section is updated with a definition for each feeling. This makes it easier to pinpoint the correct feelings for each day.
The blue button allows users to log a date for the feeling tracker - meaning that users can log feelings into the application that they are also tracking somewhere else.
Finally, the yellow button logs the feelings into the feeling tracker that is displayed below. Users can also delete entries from the tracker.
There are also two separate sections
* one displays a quote retrieved from an external API while loading the page. Users can get new quotes by clicking the button. Quotes can help with motivation
* the other contains a breathing exercise known as ‘square breathing’, created using CSS animation. Square breathing allows people to calm down when experiencing difficult emotions. The animation can be sped up or slowed down using the arrows.


## IMPROVEMENTS
Some improvements that can be done in future releases are:
* Allowing users to create an account and log in, so that multiple users can log feelings from the same machine
* Load definitions to the database, so there’s no need to call an API every time a definition is needed.

## MOTIVES
Being able to identify feelings with more specificity allows people to regulate their emotions more effectively. It’s also an important skill to increase emotional intelligence. 

## HOW TO RUN
Before running the application, a fixture needs to be installed using

```
python3 manage.py loaddata feelings/fixtures/emotions.json
```

This will populate the database with the feeling words and categories. Then, with all files in place, it can be run using 

```
python3 manage.py runserver  
```

## FILES
### /fixtures/emotions.json
This JSON fixture populates feelings and categories into the database. It was written by myself based on the Wheel of Emotions by Dr. Gloria Wilcox.

### /static/feelings/script.js
Contains all the JS necessary to run the application. Some of the main functionalities of this file are:
*Fetch an API to get random quotes
*Start and stop the breathing animation
*Add event listeners to the feeling buttons
*Fetch a different API to get definitions for the feelings selected
*Hide and display the additional feelings

### /static/feelings/styles.css
The main stylesheet for the feelings tracker. Other than purely aesthetic settings, this file also provides the settings for the breathing animation. Another important feature here is styling the main form, hiding all checkboxes and providing an alternative so users can notice which feelings are selected or not. Feelings on the main section are also color coded with the feelings log.

### /templates/feelings/index.html
This is the main html file for the feelings tracker. At the top is the navigation menu that links to the different sections on the page. Then, the main form that contains all feelings to be selected. Using Jinja made creating a big form a lot easier than writing all of this manually. The following sections contain the motivational quotes, the log, breathing exercise, and finally a brief ‘About’ section.

### /templates/feelings/layout.html
This is the html page that is extended by other html files. It includes a title tag for all pages, links to the CSS and JS files, and finally includes a viewport tag to help making the website responsive.

### models.py 
Creates 2 models: Feeling and Log. Feeling contains the fields ‘category’ and ‘feeling’, linking more specific feelings with broader ones. Log uses both ‘User’ and ‘Feeling’ as foreign keys, tracking which feelings were added each day.

### views.py
The Python code on this file is relatively simple, as this application contains only one view. 
Two POST requests can be received here - one for adding new entries, and one for deleting previous entries. Both options will also update the ‘message’ variable. Finally, this view will also get a list of all feelings from the database, so they can be loaded into the template.

### admin.py
This file was updated to register the 3 models being used (Feeling, Log, and User)

### urls.py
This file was updated to link the index view with the root URL path.
