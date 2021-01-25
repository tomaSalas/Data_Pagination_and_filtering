/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/





/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function notFound() {
   let span = document.createElement("h2");
   span.textContent = "Not Found";
   let header = document.querySelector(".header");
   let input = header.firstElementChild;

   input.insertAdjacentHTML("beforerbegin", input);

}



let perPage = 9;
function showPage(list, section) {
   let startIndex = (section * perPage) - perPage;
   let endIndex = (section * perPage);
   let ul = document.querySelector(".student-list");
   ul.innerHTML = "";
   
   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         let obj = list[i];
            ul.insertAdjacentHTML("afterbegin", 
               `<li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src=${obj.picture["large"]} alt="Profile Picture">
                     <h3>${obj.name["first"]} ${obj.name["last"]}</h3>
                     <span class="email">${obj.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date"> Join: ${obj.registered["date"]}</span>
                  </div>
               </li>` );

      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let numberOfButtons = Math.ceil(list.length / perPage);
   let ul = document.querySelector(".link-list");
   ul.innerHTML = "";

   for (let i = 1; i <= numberOfButtons; i += 1) {
      ul.insertAdjacentHTML("beforeend", 
         `<li>
            <button type="button">${i}</button>
         </li>`);

   }

   firstButton = ul.querySelector("button");
   firstButton.className = "active";


   ul.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
         buttons = ul.children;
         for (let i = 0; i < buttons.length; i += 1) {
            let c = buttons[i].firstElementChild;
            c.className = "";
         }
         let button = event.target;
         button.className ="active";
      
         
         showPage(data, parseInt(button.textContent));
         

      }
   });

}

function search() {
   const header = document.querySelector(".header")
   header.insertAdjacentHTML("beforeend",`
                           <label for="search" class="student-search">
                              <input id="search" placeholder="Search by name...">
                              <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                           </label>`);

   header.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {

         let txtValue;
         let name;
         let input = document.querySelector("#search");
         let filter = input.value.toUpperCase();
         let ul = document.querySelector(".student-list");;
         let li = ul.getElementsByTagName('li');

         // Loop through all list items, and hide those who don't match the search query
         for (let i = 0; i < li.length; i += 1) {
            name = li[i].getElementsByTagName("h3")[0];
            txtValue = name.textContent || name.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
               li[i].style.display = "";
            } else {
               li[i].style.display = "none";
            }

            addPagination(li);
         }
      }

      header.addEventListener("keyup", () => {
         let txtValue;
         let counter = 0;
         let name;
         let input = document.querySelector("#search");
         let filter = input.value.toUpperCase();
         let ul = document.querySelector(".student-list");;
         let li = ul.children;
         for (let i = 0; i < li.length; i += 1) {
            name = li[i].getElementsByTagName("h3")[0];
            txtValue = name.textContent || name.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
               li[i].style.display = "";
            } else {
               li[i].style.display = "none";
               counter += 1
            } 
            if (li.length === counter) {
               counter = 0;
               notFound();
              console.log("not found");
               
            }

            addPagination(li);
            
 
         } 
         
      });
   });

}





// Call functions

showPage(data, 1);
addPagination(data);
search();