document.addEventListener("DOMContentLoaded", function () {
    const splash = document.querySelector(".splash");
    const logo = document.querySelector(".logo");
    const formContainer = document.querySelector(".form-container");

    setTimeout(function () {
        splash.style.opacity = "0"; // Fade out the splash screen
        setTimeout(function () {
            splash.style.display = "none"; // Hide the splash screen
            formContainer.style.display = "block"; // Show the form container
            logo.style.display = "block"; // Show the logo
        }, 1000); // Adjust the duration (in milliseconds) based on your animation duration
    }, 2000); // Adjust the duration (in milliseconds) based on your animation duration
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("survey-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        const name = form.name.value;
        const gender = form.gender.value;
        const hobbies = form.hobbies.value;
        const age = parseInt(form.age.value);
        const aiKnowledge = parseInt(form["ai-knowledge"].value);
        const aiDepth = form["ai-depth"].value;
        const pythonExp = form["python-exp"].value;

        // Example conditions for redirecting to different dummy pages
        if ((age <= 15 && aiKnowledge <= 2)) {
            // Redirect to the beginner-friendly course site
            if (aiDepth != "Beginner") {
                alert("You wanted " + aiDepth + ". You've been assigned the beginner course. Continue with this course and proceed to the next level once completed. Continue...");
            } else {
                alert("You've been assigned the beginner course. Continue...");
            }
            window.location.href = "https://ai-ta.my.canva.site/home";
        } else if ((aiKnowledge <= 4 && aiDepth <= 4) || aiDepth === "medium") {
            // Redirect to the medium level course site
            alert("You've been assigned the medium course. Continue...");
            window.location.href = "med_course/course.html?username="+name+"&userage="+age+'&usergender='+gender+'&userhobbies='+hobbies;
        } else {
            // Redirect to the advanced course site
            alert("You've been assigned the advanced course. You seem to know a lot about AI! Try this challenge. Good Luck! Continue...");
            window.location.href = "https://www.kaggle.com/competitions/titanic";
        }
    });
});

