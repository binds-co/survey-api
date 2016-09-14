### Binds Survey

[![wercker status](https://app.wercker.com/status/e4335be926ae40b2e060896ef0c33a31/s/master "wercker status")](https://app.wercker.com/project/byKey/e4335be926ae40b2e060896ef0c33a31)


## Getting Started


### Initializing
 
include `binds.js/binds.min.js` :

```
<script src="../dist/binds.min.js" type="text/javascript" charset="utf-8"></script>

 ```
To instantiate the survey:
```
   var survey = binds(sendingID);

```
### methods

#### get()

```
   survey.get(); //returns the survey and sending object

   survey.get(:id); //returns either the question or the endMessage

   survey.get('question', :id); //returns question by id

   survey.get('endMessage', :id); //returns endMessage by id


   survey.get('theme', 'colors'); //returns the colors array

   survey.get('theme', 'fonts'); //returns the fonts array

   survey.get('theme', 'images'); //returns the images array

```

#### respond()

```
   survey.respond(:questionID, answer).then(function(nextQuestion){
   }); 

```

## Development
Clone the repo then `npm install` to install dependencies

`npm start` to start developing.

See [CONTRIBUTING.md](/blob/master/CONTRIBUTING.md)
 for information on structure, documentation, and code conventions.

