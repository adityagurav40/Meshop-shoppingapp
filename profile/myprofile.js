if(!localStorage.getItem("currentuser")){
    alert("you need to signup or login first");
     setTimeout(()=>{
      window.location.href  ="../index.html";
     },1000);
}

  
  let saveinfobtn = document.querySelector("#save-info");
  let logoutbtn = document.querySelector("#logout-btn");
  let form1 = document.querySelector("#profile1");
  
  let fnameinp = document.querySelector("#fname-inp");
  let lnameinp = document.querySelector("#lname-inp");

  let oldpassinp = document.querySelector("#old-pass-inp");
  let newpassinp = document.querySelector("#new-pass-inp");
  let cnfnewpassinp = document.querySelector("#cnf-new-pass-inp");
  
   let chanepassbtn = document.querySelector("#change-pass");
  let errmsg1 = document.querySelector("#err-msg1");
  let errmsg2 = document.querySelector("#err-msg2");
  

  let currentuser = JSON.parse(localStorage.getItem("currentuser"));
  fnameinp.value =currentuser.firstname;
  lnameinp.value = currentuser.lastname;


  let profileheader = document.querySelector(".pro-hdr");

  profileheader.innerHTML =`My Profile (${currentuser.firstname} ${currentuser.lastname})`;


  saveinfobtn.addEventListener("click", ()=>{
    
    //  e.preventDefault();
     console.log("hello");

     let usersarr = JSON.parse(localStorage.getItem("users"));
     console.log(usersarr);

     for(let i=0; i<usersarr.length; i++){
        if(usersarr[i].email==currentuser.email){
          currentuser = {
            firstname:  fnameinp.value,
            lastname:  lnameinp.value,
             email: usersarr[i].email,
             password: usersarr[i].password,
          }

          usersarr.splice(i, 1, currentuser);
          break;
        }
     }

     errmsg1.innerText  = "Details sucessfully updated";
     errmsg1.style.color = "#7ECD71";
     errmsg1.style.display = "inline-block";
       localStorage.setItem("users", JSON.stringify(usersarr));

       currentuser.token  = generatetoken();
       localStorage.setItem("currentuser", JSON.stringify(currentuser));

  });


  chanepassbtn.addEventListener("click", ()=>{
    
          if(oldpassinp.value == "" || newpassinp.value == ""||  cnfnewpassinp.value ==""){    
       errmsg2.innerText  = "Error : All the fields are mandatory";
       errmsg2.style.color = "#FF4F4F";
       errmsg2.style.display = "inline-block";
       return;
     }
  
     if(oldpassinp.value ==  newpassinp.value ){
      errmsg2.innerText  = "New Password matching with old password make sure it is different";
      errmsg2.style.color = "#FF4F4F";
      errmsg2.style.display = "inline-block";
      return;
     }

     if(newpassinp.value != cnfnewpassinp.value ){
      errmsg2.innerText  = "confirm password not matching with new password";
      errmsg2.style.color = "#FF4F4F";
      errmsg2.style.display = "inline-block";
      return;
     }



     let usersarr = JSON.parse(localStorage.getItem("users"));
     console.log(usersarr);

     for(let i=0; i<usersarr.length; i++){
        if(usersarr[i].email==currentuser.email && usersarr[i].password==oldpassinp.value){
          currentuser = {
            firstname:  usersarr[i].firstname,
            lastname:  usersarr[i].lastname,
             email: usersarr[i].email,
             password: newpassinp.value
          }

          usersarr.splice(i, 1, currentuser);


          localStorage.setItem("users", JSON.stringify(usersarr));
          localStorage.setItem("currentuser", JSON.stringify(currentuser));
   
          errmsg2.innerText  = "Password changed successfully";
          errmsg2.style.color = "#7ECD71";
          errmsg2.style.display = "inline-block";
          
          return;
        }
     }


     errmsg2.innerText  = "old password not matching with existing password";
     errmsg2.style.color = "#FF4F4F";
     errmsg2.style.display = "inline-block";
      
  });


  logoutbtn.addEventListener("click", ()=>{
    localStorage.removeItem("currentuser");
    localStorage.removeItem("cartproducts");
    localStorage.removeItem("products");
      
    alert("Redirecting you to index page...");
    setTimeout(()=>{
     window.location.href  ="../index.html";
    },1000);
     
  });



  function generatetoken(){
    let str = "";
    for(let i=0; i<16; i++){
        str +=   String.fromCharCode  (Math.floor(Math.random() * 89) + 33); //33 to 122
    }
  
    return str;
  }