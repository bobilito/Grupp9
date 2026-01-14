const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const path = require('path');

const app = express();

//koppla databas
const db = new sqlite3.Database('./databas.db');
// Express 

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//api login
app.get("/", function(request, response){
      response.render('login');
});
app.get("/login.ejs", function(request, response){
      response.render('login');
});
app.get("/register.ejs", function(request, response){
      response.render('register');
});
app.get("/main.ejs", function(request, response){
      response.render('main');
});
app.get("/forgotpassword.ejs", function(request, response){
  response.render('forgotpassword');
});





//login
/*
function login(Namn, lösenord){
  db.get("SELECT lösenord FROM Personer WHERE namn == '"+namn+"'",function(error, row){
    if(error){
    console.log(error);
   }
   console.log(row);
   if (row.lösenord == lösenord)
   {
   console.log("du har rätt lösenord");
   }
   else{
    console.log("du har fel lösenord");
   }
  });
};



//register

function användardataspara(lösenord, namn){
  db.all("SELECT * FROM Personer WHERE namn == '"+namn+"' AND lösenord == '"+lösenord+"' OR namn = '"+namn+"'",function(error, rows){
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
  });
   }
  });
}








function KollaSvar(svar, facit){
  const svar1 = svar.toLowerCase().split(" ");
  const facit1 = facit.toLowerCase();
  let rättad = false;
  svar1.forEach((svar2) => {
    if(svar2 == facit1){
      rättad = true;
    }
  });
  return rättad;
};
function läggatill(fråga, svar){
  db.run("INSERT INTO Fråga (fråga, Svar)VALUES('"+fråga+"','"+svar+"')",function(error){
    console.log(error);
  })
};
function mainpage(){
  window.location.href="./main.html";
}


//användardataspara("1234","bob");
//läggatill("hälsningsfras","hej");
/*let b = KollaSvar("asd hej  ","hej") 
if (b == true){
  console.log("du hade rätt svar")
}*/
//login("bob", "12345");

//startar server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`servern kör på ${PORT}`);
});
db.close;