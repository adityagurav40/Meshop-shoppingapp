if(!localStorage.getItem("currentuser")){
    alert("you need to signup or login first to access products");
     setTimeout(()=>{
      window.location.href  ="../index.html";
     },1000);
}



let products =  JSON.parse(localStorage.getItem("products")) || [];
let cartproducts =  JSON.parse (localStorage.getItem("cartproducts") ) || [];

let prodcont = document.querySelector(".product-container");
let filters = document.querySelectorAll(".filter");

let searchbar = document.querySelector("#search-bar");
console.log(filters);

if(!localStorage.getItem("products")){
    fetch('https://fakestoreapi.com/products/')
    .then((res) => {
        return res.json();
    })
    .then((json) => {
        products = json;
        products = modifyproducts(products);
        localStorage.setItem("products", JSON.stringify(products));
        console.log(products);   
        printData(products);
    })
}




function printData(products) {
    if(products.length == 0) {
        prodcont.innerHTML = `
          <h3>Sorry No products Available</h3>
        `;
        return;
    }

   let str="";
    for (let product of products) {
    
         str+= `
        <div class="item">
        <img src=${product.image} />
        <div class="info">
          <div class="card-title">${product.title}</div>
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">${product.sizes}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">                      
              <div class="circle" style="background-color: #000"></div>
              <div class="circle" style="background-color: #4938af"></div>
              <div class="circle" style="background-color: #203d3e"></div>
            </div>
          </div>
          <div class="row">Rating: ${ratingstars(product.rating.rate)}</div>
        </div>
        <button id="addBtn-${product.id}" onclick="addtocartfunc(event)">Add to Cart</button>
      </div>
     `

    }

    prodcont.innerHTML = str;
}

printData(products);

function ratingstars(rating) {

    rating = Math.round(rating);
    let str = "";
    for (let i = 0; i < rating; i++) {
        str += "⭐";
    }

    return str;

}

// function returnsizes(sizes) {
//  let str = "";
//  for(let size of sizes) {
//     str+= size + " ";
//  }

//  return str.trim();
// }

filters.forEach((filter) => {

    filter.addEventListener("click", (e) => {
        e.target.classList.toggle("active");

        let activearr = document.querySelectorAll(".active");
        let filteredarr = [];
        activearr.forEach((ele) => {
            let str = ele.innerText.toLowerCase();
            if(str=="all"){
                str="";
            }
            if(str=="men's"){
                str="men's1";
            }
            products.forEach((card) => {
                if (card.category.includes(str)) {
                    filteredarr.push(card);
                };
            })

        });


        console.log(filteredarr);
        printData(filteredarr);

    });
});


function modifyproducts(products){
    for(let product of products){
        if(product.category == "men's clothing" || product.category == "women's clothing"){
            product.colours= ["red","green","yellow","blue","voilet","black", "white",];
            product.sizes = ["s","m","l","xl"];

            if(product.category== "men's clothing"){
                product.category= "men's1 clothing"; 
            }
        }
        else if(product.category == "jewelery"){
            product.colours= ["red","blue","voilet", "gold", "silver"];
            product.sizes = ["s","m"];
        }
        else if(product.category == "electronics"){
            product.colours= ["black", "white"];
            product.sizes = ["N/A"];
        }
        
    }

    return products;
}

function applyfilters(){
     console.log("high");
    let ratingvalue = Number (document.querySelector(".sidenav>section:nth-child(3)>input").value);
    let $0to25 = document.querySelector("#firstp").checked;
    let $25to50 = document.querySelector("#secondp").checked;
    let $50to100= document.querySelector("#thirdp").checked;
    let $100plus = document.querySelector("#fourthp").checked;

    let filteredarr = [];
    for(let product of products){
        if(Math.round (product.rating.rate) >= ratingvalue){
            filteredarr.push(product);

            if($0to25 && (product.price<0 || product.price>25)){
                filteredarr.pop(product);
            }
            else if($25to50 && (product.price<25 || product.price>50)){
                filteredarr.pop(product);
            }
            else if($50to100 && (product.price<50 || product.price>100)){
                filteredarr.pop(product);
            }
            else if($100plus && product.price<100){
                filteredarr.pop(product);
            }
        }
        
    }

   printData(filteredarr);
}

searchbar.addEventListener("input", ()=>{
  let tofindstr = searchbar.value.toLowerCase().trim();

   
  let filteredarr = products.filter((product)=>{
        return (product.title.toLowerCase().includes(tofindstr)  || String(product.price).includes(tofindstr));
  });

  printData(filteredarr);
  
});

function addtocartfunc(event){

    let str = event.target.innerText;
    let id = Number (event.target.getAttribute('id').split('-')[1]);
    console.log(id);

    if(str=="Add to Cart"){
        event.target.innerText = "Added"

        for(let product of products){
            if(product.id == id){
                cartproducts.push(product);
                break;
            }
        }

    }
    else{
        event.target.innerText = "Add to Cart"

        for(let i=0; i< cartproducts.length; i++){
            if(cartproducts[i].id == id){
                cartproducts.splice(i, 1);
            }
        }

    }
    
   localStorage.setItem("cartproducts", JSON.stringify(cartproducts));

    console.log(cartproducts);

}