NBAWebApp is a React application that displays scheduled NBA games with their respective teams and basic game details for a given season. Users can navigate through the dates to see upcoming matches. I am going to begin expanding this by moving our data to an AWS RDS, this should allow us to add more data in a more optimized and modular manner. 

Files of Note -- 

App.js - Loads and parses our csv file, controls our date and game filters, and renders a list of game cards for the given date.

App.css - Provides Styling for our header and game cards.

The website is currently hosted on an AWS S3 bucket here:
http://react-nbaschedule-app.s3-website.us-east-2.amazonaws.com/


