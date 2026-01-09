const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./databas.db');

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
//läggatill("hälsningsfras","hej");
let b = KollaSvar("asd hej  ","hej") 
if (b == true){
  console.log("du hade rätt svar")
}
db.close;