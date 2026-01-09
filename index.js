const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./databas.db');
//const insert = database.prepare('INSERT  data (key, value) VALUES (?, ?)');

function KollaSvar(användarsvar, svar){
  const fråga1 = användarsvar.toLowerCase();
  const svar1 = svar.toLowerCase();
  fråga1.split(" ");
  //fråga1.foreach((fråga2) => {
        if(fråga1 == svar1){
         return true;
        }
  //});
  else{return false;}
  
};

function läggatill(fråga, svar){
  db.run("INSERT INTO Fråga (fråga, Svar)VALUES('"+fråga+"','"+svar+"')",function(error){
    console.log(error);
  })
}
//läggatill("hej","hej");
let b = KollaSvar("hej","hej") 
if (b = true){
  console.log("jjj")
}
db.close;