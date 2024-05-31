in the Backend folder ther are 4 folder :-

  config :- inside this folder there is 2 file one for database and another is Environment Variables (.env ) . After cloning this reps create and .env file inside config folder 
          <b>Note:- name of env should be .env only other wise config it in app.js file in backend </b>

          env file contain:- 
          
          MONGO_URI = "mongodb://localhost:27017/lms"
          PORT = 4000

  Controller :- write all the api logics in it 
  modal :- create/edit all the collection inside 
  routes :- create the api route inside route folder <br/>
            <b>Note:- if you are creating any new route file please configure it in app.js </b>

<h1>For Frontend folder</h1>
inside the frontend folder create an .env <b> file name should be .env only </b>

        env file contain:-  
        VITE_API="http://localhost:4000/api/v1"
<h2>
  api for table is fetched inside 
</h2>
    /src/redux/apiCall.js
