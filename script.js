// myProducts.filter((item)=>item.title.includes(search.value))

// myCartProductArray = myProducts.filter((item)=> myCartIDs.includes(item.id))



if(localStorage.getItem("currentuser")){
  alert("you have already logged in");
    setTimeout(()=>{
    window.location.href  ="./profile/myprofile.html";
   },1000);
}