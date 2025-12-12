/* -------------------- PROJECTS PAGE -------------------- */

let filterVisible = false;
let selectedFilters = [];
let allTags = [];
let enabledTags = [];
let tagsLoaded = false;
let projects = document.getElementsByClassName("project-card");

/* Shows or hides the filter options */
function showFilterOptions() {
  if (filterVisible) {
    document.getElementById("filter-main").style.visibility = "hidden";
    filterVisible = false;
  } else {
    document.getElementById("filter-main").style.visibility = "visible";
    filterVisible = true;
  }

  /* Gets all the tags from each project */
  if (!tagsLoaded) {

    for (let project of projects) {
      let tags = project.getElementsByTagName("li");
      for (let tag of tags) {
        let tagText = tag.innerText;
        if (!allTags.includes(tagText)) {
          allTags.push(tagText);
        }
      }
    }
    tagsLoaded = true;

    /* Displays every tag as a filter option */
    let filterContainer = document.getElementById("filters");
    let filterTemplate = document.getElementById("filter-template");

    /* Creates a filter option for each tag */
    for (let tag of allTags) {
        let newFilter = filterTemplate.cloneNode(true);
        newFilter.querySelector("input").id = tag;
        newFilter.querySelector("input").name = tag;
        newFilter.querySelector("input").onclick = function() {filterProjects(tag);};
        newFilter.querySelector("label").htmlFor = tag;
        newFilter.querySelector("label").innerText = tag;
        newFilter.hidden = false;
        filterContainer.appendChild(newFilter);
    }
  }
}


/* Toggles the filter for the given project tag */
function filterProjects(id) {
  if (enabledTags.includes(id)) {
    /* Removes the tag from enabledFilters by filtering it from the array */
    enabledTags = enabledTags.filter(tag => tag !== id);
  } else {
    enabledTags.push(id);
  }

  /* Applies the enabled filters to the project list */
  for (let project of projects) {
    /* If no filters are enabled, show all projects */
    if (enabledTags.length === 0) {
      project.style.display = "flex";
      continue;
    } 
    
    /* Otherwise, only show projects that match the enabled filters */
    else {
      project.style.display = "none";
      let tags = project.getElementsByTagName("li");
      for (let tag of tags) {
        let tagText = tag.innerText;
        if (enabledTags.includes(tagText)) {
          project.style.display = "flex";
        }
      }
    }
  }
}


/* -------------------- RESUME PAGE -------------------- */

let selectedBook = null;
let selectedSection = null;
let books = document.getElementsByClassName("resume-section-book");
let sections = document.getElementsByClassName("resume-section");

/* Opens the selected resume section book */
function openSection(sectionId) {
  books.namedItem(sectionId).style.visibility = "hidden";
  sections.namedItem(sectionId).style.display = "block";

  /* Closes the previously opened section */
  if (selectedBook !== null && selectedSection !== null) { 
    books.namedItem(selectedBook).style.visibility = "visible";
    sections.namedItem(selectedSection).style.display = "none";
  }

  selectedBook = sectionId;
  selectedSection = sectionId;

  /* Makes the close button visible */
  document.getElementById("close-book").style.visibility = "visible";
}


/* Closes the selected resume section book */
function closeSection() {
  if (selectedBook !== null && selectedSection !== null) { 
    books.namedItem(selectedBook).style.visibility = "visible";
    sections.namedItem(selectedSection).style.display = "none";
  }

  selectedBook = null;
  selectedSection = null;

  /* Hides the close button */
  document.getElementById("close-book").style.visibility = "hidden";
}


/* -------------------- RESUME PAGE -------------------- */

/* Submits the message form (no backend, so it will only show alerts) */

function submitMessage() {
  /* Checks that all required fields are filled */
  if (document.getElementById("sender-name").value === "" ||
      document.getElementById("sender-email").value === "" ||
      document.getElementById("topic").value === "" ||
      document.getElementById("subject").value === "") {
    alert("Please fill in all required fields before submitting the message.");
  }
  else {
    /* Alert to show that the message was sent */
    alert("Message sent:\n\nName: " + document.getElementById("sender-name").value + 
    "\nEmail: " + document.getElementById("sender-email").value + 
    "\nPhone number: " + document.getElementById("sender-phone").value + 
    "\nTopic: " + document.getElementById("topic").value + 
    "\n\nSubject: " + document.getElementById("subject").value + 
    "\n\nMessage:\n" + document.getElementById("message-main").value);

    /* Clears the form after submission */
    document.getElementById("sender-name").value = "";
    document.getElementById("sender-email").value = "";
    document.getElementById("sender-phone").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message-main").value = "";
  }
}
  

/* -------------------- SCROLL UP BUTTON -------------------- */

let scrollUpButton = document.getElementById("up-button");

window.onscroll = function() {
  checkScroll();
};

/* Shows/hides the scroll up button based on scroll position */
function checkScroll() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const viewportHeight = window.innerHeight;

  // Show the button if the user has scrolled more than one viewport height
  if (scrollPosition > viewportHeight) {
    scrollUpButton.style.visibility = "visible";
  } else {
    scrollUpButton.style.visibility = "hidden";
  }
}

/* When the user clicks on the button, scroll to the top of the document */
function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}