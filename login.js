let loginbtn = document.querySelector("#log-in");
let form = document.querySelector("form");

let emailinp = document.querySelector("#email-inp");
let passinp = document.querySelector("#pass-inp");

let errmsg = document.querySelector("#err-msg");


form.addEventListener("submit", (e)=>{
   e.preventDefault();

   if(emailinp.value == "" || passinp.value == "" ){    
     errmsg.innerText  = "Error : All the fields are mandatory";
     errmsg.style.color = "#FF4F4F";
     errmsg.style.display = "inline-block";
     return;
   }


  

  //   console.log(user);

   if(!localStorage.getItem("users")){
   
      errmsg.innerText  = `${emailinp.value} is not available You must sign in first`;
      errmsg.style.color = "#FF4F4F";
      errmsg.style.display = "inline-block";
      return;

   }
   else{

      let usersarr = JSON.parse(localStorage.getItem("users"));
      console.log(usersarr);

        for(let userobj of usersarr){
          if(userobj.email == emailinp.value && userobj.password == passinp.value){

             userobj.token = generatetoken();                 
              localStorage.setItem("currentuser",  JSON.stringify (userobj));

              errmsg.innerText  = "Successfully Signed Up!";
              errmsg.style.color = "#7ECD71";
              errmsg.style.display = "inline-block";

                setTimeout(()=>{
                 window.location.href  ="./shop/shop.html";
                },1000);
         
              return;
          }
        }


        errmsg.innerText  = `${emailinp.value} is not available or wrong password entered`;
        errmsg.style.color = "#FF4F4F";
        errmsg.style.display = "inline-block";
        return;


   }

          

});


function generatetoken(){
  let str = "";
  for(let i=0; i<16; i++){
      str +=   String.fromCharCode  (Math.floor(Math.random() * 89) + 33); //33 to 122
  }

  return str;
}