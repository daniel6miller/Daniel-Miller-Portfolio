window.addEventListener("load", ()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    // Page Loader
    document.querySelector(".page-loader").classList.add("fade-out");
    // After a while the circle loading effect will stop working
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    },1000);
});

//toggle-ball
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(":root,toggle");
ball.addEventListener("click", () => {
    items.forEach((item) => {
        item.classList.toggle("active");
    });
    // apply for the ball too
    ball.classList.toggle("active");
    });

// Toggle navbar
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", ()=>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});

function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}

//activate them
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}

// Active Section
// why do we use hash in here?
document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        // activate the overlay to prevent multiple clicks
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection;
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() => {
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        },500);
    }
});

// About Tabs

const tabsContainer = document.querySelector(".project-tabs"),
projectSection = document.querySelector(".projects-section");


tabsContainer.addEventListener("click", (e) => {
    // if we choose the one is not active
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        // we will pick the current active one and remove the active status of it
        tabsContainer.querySelector(".active").classList.remove("active");
        // add active status to the option that we pick
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        console.log(target);
        projectSection.querySelector(".tab-content.active").classList.remove("active");
        const projectHide = projectSection.querySelectorAll(".project-item.active");
        for (let i = 0; i < projectHide.length; i++) {
            projectHide[i].classList.remove("active");
          }
        const projectShow = projectSection.querySelectorAll(target);
        for (let i = 0; i < projectShow.length; i++) {
            projectShow[i].classList.add("active");
          }
    }
});

// Project Item details popup
document.addEventListener("click", (e)=> {
    if(e.target.classList.contains("view-project-btn")){
        toggleProjectPopup();
        // when the detail about the project is pop up, the scroll will be 
        // automatically scrolled to the location (0,0) which is the top page
        document.querySelector(".project-popup").scrollTo(0,0);
        projectItemDetails(e.target.parentElement);
    }
})

// Project Item details popup
document.addEventListener("click", (e)=> {
    if(e.target.classList.contains("view-game-btn")){
        toggleProjectPopup();
        // when the detail about the project is pop up, the scroll will be 
        // automatically scrolled to the location (0,0) which is the top page
        document.querySelector(".project-popup").scrollTo(0,0);
        projectGameDetails(e.target.parentElement);
    }
})

function toggleProjectPopup(){
    document.querySelector(".project-popup").classList.toggle("open");
    // we want to hide the scroll when the info of the project pop up
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}

// now we want to make the close button to work
// we call the function because right now the main screen is the popup => close the current main screen
document.querySelector(".pp-close").addEventListener("click", toggleProjectPopup);

//hide popup when clicking outside of it
// when we hit the screen randomly, we want to hide it
document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("pp-inner")){
        toggleProjectPopup();
    }
})

document.addEventListener("click", (e)=>{
    if(e.target.classList.contains("nav-inner")){
        document.querySelector(".home-text").classList.add("active");
        // we want to hide the scroll when the info of the project pop up
        document.body.classList.toggle("hide-scrolling");
        document.querySelector(".main").classList.toggle("fade-out");

    }
})




// how can we locate the right info when we want to open a project
// we locate them by the image
function projectGameDetails(projectItem){
    document.querySelector(".pp-header h3").innerHTML = "";

    document.querySelector(".pp-body").innerHTML=
    projectItem.querySelector(".project-item-game").innerHTML;
}

function projectItemDetails(projectItem){
    document.querySelector(".pp-header h3").innerHTML = 
    projectItem.querySelector(".project-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML=
    projectItem.querySelector(".project-item-details").innerHTML;
}

// window.addEventListener("load", () => {
//     const hash = window.location.hash;
//     if (hash) {
//         const project = document.querySelector(hash);
//         if (project) {
//             // Find the parent tab of the project
//             const parentTab = project.closest(".tab-content");
//             if (parentTab) {
//                 // Activate the correct tab
//                 document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
//                 parentTab.classList.add("active");

//                 // Activate the correct button
//                 document.querySelectorAll(".tab-item").forEach(btn => {
//                     btn.classList.toggle("active", btn.getAttribute("data-target") === `#${parentTab.id}`);
//                 });

//                 // Scroll to the project
//                 project.scrollIntoView({ behavior: "smooth" });
//             }
//         }
//     }
// });

// // Update URL when clicking "Project Details"
// document.querySelectorAll(".view-project-btn").forEach(btn => {
//     btn.addEventListener("click", (e) => {
//         const project = e.target.closest(".project-item");
//         if (project) {
//             window.location.hash = project.id;
//         }
//     });
// });


// // window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// window.addEventListener("keydown", function(e) {
//     if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
//         e.preventDefault();
//     }
// }, false);