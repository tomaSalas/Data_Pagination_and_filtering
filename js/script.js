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



// Call functions

showPage(data, 1);
addPagination(data);