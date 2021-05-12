# Movie Rec
Movie recommendation website created using Django and React

## Installation
To set up this project, clone the project into your local directory. (Assuming you have Django and React installed) :


### To set up Django
1. Create a virtual environment.
```bash
 pipenv shell
```
2. Go to folder root which is ...\backend
3. Download all the dependencies from the requirements.txt
```bash
 pip install -r /path/to/requirements.txt
```
4. Run Django using the command:
```bash
 pip manage.py runserver
```
5. Go to http://127.0.0.1:8000/main (If nothing is displayed, carry out the next steps first)

### To set up React
If changes are made to the code, it must be built in order to see the changes.
1. Go to folder ...\backend\movie-recommendation-react
2. Run the following command:
 ```bash
 npm run build
```

### To set up APIs
To produce recommendations and display movies, you must create a TMDB account and Google Firebase Account to generate your APIs. Add the APIs in a '.env' file in the movie-recommendation-react directory:
 ```bash
 REACT_APP_TMDB_API_KEY=ADD_YOUR_API_TMDB_KEY
REACT_APP_FIREBASE_API=ADD_YOUR_API_FIREBASE_KEY
REACT_APP_FIREBASE_APP_ID=ADD_YOUR_API_FIREBASE_ID
```

### To generate recommendations with the model
To generate recommendations, the website needs a model. This can be found in the ..\backend\ml-25m folder and should be called knnModel. You must first unzip this file into the same ml-25m folder.


### Run Website

After carrying out all the above steps, you can run the server using the command:
```bash
 pip manage.py runserver
```
