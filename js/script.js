// get the reference to the contact-list and totalContacts element
const contactList = document.querySelector(".contact-list");
const totalContactsElement = document.querySelector("#totalContacts");

// display the total number of contacts
totalContactsElement.textContent = "Total: " + users.length;

// set the limitation of contacts on each page
const contactsPerPage = 10;
let currentPage = 1;

window.addEventListener("load", () => {
    genContactItems(users, currentPage);
    genPaginationButtons(users);
})    
  
function genContactItems(users, page) {
    //clear contactList.innerHTML 
    contactList.innerHTML = "";
  
    const startIndex = (page - 1) * contactsPerPage;
    const endIndex = startIndex + contactsPerPage;
    const contactsToDisplay = users.slice(startIndex, endIndex);
  
    for (const user of contactsToDisplay) {
        // create the contact item
        const contactItem = document.createElement("li");
        contactItem.classList.add("contact-item");
        contactItem.classList.add("cf");
  
        // create the contact details
        const contactDetails = document.createElement("div");
        contactDetails.classList.add("contact-details");
        contactItem.appendChild(contactDetails);
  
        // create the avatar
        const avatar = document.createElement("img");
        avatar.classList.add("avatar");
        avatar.src = user.image;
        contactDetails.appendChild(avatar);
  
        // create the name
        const name = document.createElement("h3");
        name.textContent = user.name;
        contactDetails.appendChild(name);

        // create the email
        const email = document.createElement("span");
        email.textContent = user.name.replace(" ", ".").toLowerCase() + "@example.com";
        contactDetails.appendChild(email);
  
        // create the joined details    
        const joinedDetails = document.createElement("div");
        joinedDetails.classList.add("joined-details");
        contactItem.appendChild(joinedDetails);
 
        const joinedDate = document.createElement("span");
        joinedDate.classList.add("date");
        joinedDate.textContent = "Joined " + user.joined;
        joinedDetails.appendChild(joinedDate);
  
        contactList.appendChild(contactItem);
    }
}
  
function genPaginationButtons(users) {
    // calculate the total pages
    const totalPages = Math.ceil(users.length / contactsPerPage);
    const paginationContainer = document.querySelector(".pagination");
 
    //clear paginationContainer.innerHTML
    paginationContainer.innerHTML = "";
  
    for (let i = 1; i <= totalPages; i++) {
        const paginationItem = document.createElement("li");
        const paginationLink = document.createElement("a");
  
        paginationLink.href = "#";
        paginationLink.textContent = i;
  
        if (i == currentPage) {
            paginationLink.classList.add("active");
        }
  
        paginationLink.addEventListener("click", function() {
            currentPage = i;
            genContactItems(users, currentPage);
            updatePaginationButtons();
        });
  
        paginationItem.appendChild(paginationLink);
        paginationContainer.appendChild(paginationItem);
    }
}
  
function updatePaginationButtons() {
    const paginationButtons = document.querySelectorAll(".pagination li a");
  
    for (const button of paginationButtons) {
        button.classList.remove("active");
    }
  
    const currentButton = document.querySelector(".pagination li:nth-child(" + currentPage + ") a");
    
    currentButton.classList.add("active");
}  