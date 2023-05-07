  
  let signupbtn = document.querySelector("#sign-up");
  let form = document.querySelector("form");
  
  let fnameinp = document.querySelector("#fname-inp");
  let lnameinp = document.querySelector("#lname-inp");
  let emailinp = document.querySelector("#email-inp");
  let passinp = document.querySelector("#pass-inp");
  let cnfpassinp = document.querySelector("#cnf-pass-inp");
  let errmsg = document.querySelector("#err-msg");
  
  
  form.addEventListener("submit", (e)=>{
     e.preventDefault();
  
     if(fnameinp.value == "" || lnameinp.value == ""||  emailinp.value =="" || passinp.value =="" || cnfpassinp.value ==""){    
       errmsg.innerText  = "Error : All the fields are mandatory";
       errmsg.style.color = "#FF4F4F";
       errmsg.style.display = "inline-block";
       return;
     }
  
     if(passinp.value != cnfpassinp.value){
      errmsg.innerText  = "Password not matching";
      errmsg.style.color = "#FF4F4F";
      errmsg.style.display = "inline-block";
      return;
     }

     let user = {
        firstname: fnameinp.value,
        lastname: lnameinp.value,
        email: emailinp.value,
        password: passinp.value,
       }

      console.log(user);

     if(!localStorage.getItem("users")){
     
           let usersarr = [];
           usersarr.push(user);

           localStorage.setItem("users", JSON.stringify(usersarr));

     }
     else{

        let usersarr = JSON.parse(localStorage.getItem("users"));
        console.log(usersarr);

          for(let userobj of usersarr){
            if(userobj.email === emailinp.value){
                console.log("hi");
                errmsg.innerText  = `User with email ${userobj.email} already exists`;
                errmsg.style.color = "#FF4F4F";
                errmsg.style.display = "inline-block";
                found=true;
               return;
            }
          }

        
        usersarr.push(user);
        localStorage.setItem("users", JSON.stringify(usersarr));


     }
  
      user.token = generatetoken();
     localStorage.setItem("currentuser", JSON.stringify(user));
    
     errmsg.innerText  = "Successfully Signed Up!";
     errmsg.style.color = "#7ECD71";
     errmsg.style.display = "inline-block";
   
  
     setTimeout(()=>{
      window.location.href  ="./shop/shop.html";
     },1000);
  
        
  
  });
  
  
  function generatetoken(){
    let str = "";
    for(let i=0; i<16; i++){
        str +=   String.fromCharCode  (Math.floor(Math.random() * 89) + 33); //33 to 122
    }
  
    return str;
  }