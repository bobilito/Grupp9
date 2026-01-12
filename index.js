const sqlite3 = require('sqlite3').verbose();
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
function login(namn, lösenord){
  db.get("SELECT lösenord FROM Personer WHERE namn == '"+namn+"'",function(error, row){
    if(error){
    console.log(error);
   }
   console.log(row)
   if (row.lösenord == lösenord)
   {
   console.log("du har rätt lösenord");
   }
   else{
    console.log("du har fel lösenord");
   }
  })

}
//användardataspara("1234","bob");
//läggatill("hälsningsfras","hej");
/*let b = KollaSvar("asd hej  ","hej") 
if (b == true){
  console.log("du hade rätt svar")
}*/
//login("bob", "12345");
db.close;