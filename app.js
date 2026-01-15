const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const path = require('path');
const session = require('express-session');
const { render } = require('ejs');

const app = express();

//koppla databas
const db = new sqlite3.Database('./databas.db');
// Express 
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//api login
app.get("/", function(request, response){
      request.session.user = {id:null};
      response.render('login');
});
app.get("/login", function(request, response){
      response.render('login');
});
app.get("/register", function(request, response){
      response.render('register');
});
app.get("/main", function(request, response){
      response.render('main');
});
app.get("/forgotpassword", function(request, response){
  response.render('forgotpassword');
});
app.get("/quiz", function(request, response){
  response.render('choosesubject');
});
app.get("/matte", function(request, response){
  fråga(response,'matte');
  //response.render('quiz',{message: "matte fråga", Rubrik: "Mattematik"});
});
app.get("/geografi", function(request, response){
  response.render('quiz',{message: "geografi fråga", Rubrik: "Geografi", Answer1:"hej", Answer2:"hej", Answer3:"hej", Answer4:"hej"});
});
app.get("/kemi", function(request, response){
  response.render('quiz',{message: "kemi fråga", Rubrik: "Kemi", Answer1:"hej", Answer2:"hej", Answer3:"hej", Answer4:"hej"});
});
app.get("/custom", function(request, response){
  response.render('quiz',{message: "egen fråga", Rubrik: "Custom", Answer1:"hej", Answer2:"hej", Answer3:"hej", Answer4:"hej"});
});
app.post("/answered", function(request, response){
  const question = request.body.question;
  const answer = request.body.answer;
  console.log("Fråga:", question);
  console.log(answer);
  KollaSvar(response, question, answer)
});
app.post("/login/data", function(request, response){
      const name = request.body.Username;
      const password = request.body.password;
      const value = login(response,name,password);
});
app.post("/register", function(request, response){
      const password = request.body.username;
      const name = request.body.password;
      const value = register(response,name,password);
});


//login
function login(response, namn, lösenord){
    db.get("SELECT lösenord FROM Personer WHERE namn == '"+namn+"'",function(error, row){
    if(error){
    console.log(error);
   }
   console.log(row);
   if (row.lösenord == lösenord)
   {
   console.log("du har rätt lösenord");
   response.render('main.ejs');
   }
   else{
    console.log("du har fel lösenord");
   }
  });
};



//register

function register(response, lösenord, namn){
  db.all("SELECT * FROM Personer WHERE namn == '"+namn+"' AND lösenord == '"+lösenord+"' OR namn == '"+namn+"'",function(error, rows){
    if(error){
    console.log(error);
   }
   if (rows !="")
   {
   console.log("användar namn upptaget");
   }
   else if(rows == ""){
   console.log("användar namn ej upptaget");
   db.run("INSERT INTO Personer (Lösenord, Namn)VALUES('"+lösenord+"','"+namn+"')",function(error){
   console.log(error);
   response.render('main.ejs') 
  });
  db.run("SELECT ID FROM Personer WHERE lösenord == '"+lösenord+"','"+namn+"'",function(err,ID){
    console.log(err);
    db.run("INSERT INTO Frågor (namn, personID, frågaID) VALUES('Mattequiz', "+ID+", 1),('Mattequiz', "+ID+", 2),('Mattequiz', "+ID+", 3),('Mattequiz', "+ID+", 4),('Mattequiz', "+ID+", 5)",function(err){
       console.log(err);
    });
  });
   }
  });
}

function fråga(response,subject){
  if (subject == "matte"){
      db.all("SELECT fråga.fråga, fråga.svar FROM fråga JOIN Frågor on Frågor.frågaID = fråga.ID WHERE frågor.namn == 'matte'",function(err,rows){
      let fråga1;
      let svar;
      svar = rows[0]
      response.render('quiz',{message: ""+svar.fråga+"", Rubrik: "Mattematik"});
      console.log(svar.fråga);
      console.log(err);
      });
  }
  if (subject == "geografi"){
    
  }
  if (subject == "kemi"){
    
  }
  if (subject == "egen"){
    
  }

}
function KollaSvar(respone, fråga, svar){
  
  db.get("SELECT Svar FROM fråga WHERE fråga.fråga = '"+fråga+"';",function(err,row){
      facit = row
      console.log(facit)
      console.log(err);
      const svar1 = svar.split(" ");
      
      svar1.forEach((svar2) => {
      if(svar2 == facit){
        console.log("rätt svar")
        bool = true;
      }
      else{ bool = false}
      });
      if(bool == true){
        respone.render("rightanswer")
      }
      else{
        respone.render("wronganswer")
      }
    });
};
function läggatill(fråga, svar){
  db.run("INSERT INTO Fråga (fråga, Svar)VALUES('"+fråga+"','"+svar+"')",function(error){
    console.log(error);
  })
};
function mainpage(){
  window.location.href="./main.html";
}

//startar server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`servern kör på ${PORT}`);
});
db.close;