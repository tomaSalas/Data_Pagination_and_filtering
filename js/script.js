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

   input.insertAdjacentHTML("beforebegin", input);

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
         if (obj.error) {
            ul.insertAdjacentHTML("beforeend", `<h1 id="error">${obj.error}<h1>`);
         } else {
            ul.insertAdjacentHTML("beforeend", 
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
      
         
         showPage(list, parseInt(button.textContent));
         

      }
   });

}

function search(data) {
   const header = document.querySelector(".header");
   header.insertAdjacentHTML("beforeend",`
                           <label for="search" class="student-search">
                              <input id="search" placeholder="Search by name...">
                              <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
                           </label>`);
   const buttons = header.querySelector("button");

   buttons.addEventListener("click", (event) => {
         let name;
         let input = document.querySelector("#search");
         input.style.borderColor = "#1e90ff";
         let filter = input.value.toUpperCase();
         let objts = data;
         let matches = [];

         // Loop through all list items, and hide those who don't match the search query
         for (let i = 0; i < objts.length; i += 1) {
            let obj = objts[i];
            name = `${obj.name["first"]} ${obj.name["last"]}`;
            name = name.toLocaleUpperCase();
            if (name.includes(filter)) {
               matches.push(obj);
            }
         }
         if (matches.length === 0) {
            input.style.borderColor = "red";
            matches.push({
                           error: "Not Found",
            });

                     
      }
         showPage(matches, 1);
         addPagination(matches);
      });
      

       header.addEventListener("keyup", () => {
         let name;
         let input = document.querySelector("#search");
         input.style.borderColor = "#1e90ff";
         let filter = input.value.toUpperCase();
         let objts = data;
         let matches = [];

         // Loop through all list items, and hide those who don't match the search query
         for (let i = 0; i < objts.length; i += 1) {
            let obj = objts[i];
            name = `${obj.name["first"]} ${obj.name["last"]}`;
            name = name.toLocaleUpperCase();
            if (name.includes(filter)) {
               matches.push(obj);
            }
         }
         if (matches.length === 0) {
            input.style.borderColor = "red";

            matches.push({
                           error: "Not Found",
            });

                     
      }
         showPage(matches, 1);
         addPagination(matches);
      });
  

}





// Call functions

showPage(data, 1);
addPagination(data);
search(data);