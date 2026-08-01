/* ==========================================================
            VIDYANATION ACADEMY
            PREMIUM SCRIPT.JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
                    FAQ ACCORDION
    ====================================================== */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item, index) => {

        // Alternate animation direction

        if (index % 2 === 0) {

            item.classList.add("from-left");

        } else {

            item.classList.add("from-right");

        }

        const button = item.querySelector(".faq-question");

        button.setAttribute("aria-expanded", item.classList.contains("active") ? "true" : "false");

        button.addEventListener("click", (e) => {

            // Close all other FAQs

            faqItems.forEach((other) => {

                if (other !== item) {

                    other.classList.remove("active");

                    const otherButton = other.querySelector(".faq-question");

                    if (otherButton) { otherButton.setAttribute("aria-expanded", "false"); }

                }

            });

            // Toggle current FAQ

            const isNowActive = !item.classList.contains("active");

            item.classList.toggle("active");

            button.setAttribute("aria-expanded", isNowActive ? "true" : "false");

            /* ===============================
                    GOLD RIPPLE EFFECT
            =============================== */

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = item.getBoundingClientRect();

            ripple.style.left =
                (e.clientX - rect.left) + "px";

            ripple.style.top =
                (e.clientY - rect.top) + "px";

            item.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });



    /* ======================================================
                FAQ SCROLL REVEAL
    ====================================================== */

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    faqItems.forEach((item) => {

        observer.observe(item);

    });



    /* ======================================================
            TESTIMONIAL CARD REVEAL
    ====================================================== */

    const testimonialCards =

        document.querySelectorAll(".testimonial-card");

    const testimonialObserver =

        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    }

                });

            },

            {

                threshold: 0.20

            }

        );

    testimonialCards.forEach((card) => {

        testimonialObserver.observe(card);

    });



    /* ======================================================
                OPTIONAL FLOAT EFFECT
    ====================================================== */

    testimonialCards.forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x =

                e.clientX - rect.left;

            const y =

                e.clientY - rect.top;

            const rotateY =

                ((x / rect.width) - 0.5) * 10;

            const rotateX =

                ((y / rect.height) - 0.5) * -10;

            card.style.transform =

                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

});
/* =====================================================
            PREMIUM SCROLL REVEAL
===================================================== */


    const revealElements = document.querySelectorAll(

        ".highlight-card, .glass-card, .feature-card, .testimonial-card, .faq-item, .contact-card, .social-card, .qr-card"

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    revealElements.forEach((el) => {

        observer.observe(el);

    });

/* ======================================================
            PREMIUM COUNTER ANIMATION
====================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = target / 80;

            function updateCounter(){

                current += increment;

                if(current < target){

                    counter.textContent = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                }

                else{

                    counter.textContent = target;

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    },

    {

        threshold:0.5

    }

);

counters.forEach((counter)=>{

    counterObserver.observe(counter);

});
/* ======================================================
                BACK TO TOP
====================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});
if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
/* ======================================================
                CURSOR GLOW
====================================================== */

const cursorGlow = document.getElementById("cursor-glow");

if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {

        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";

    });
}
/* =====================================================
                FREE DEMO MODAL
===================================================== */

/* =====================================================
        ACCESSIBLE MODAL HELPERS (open/close/focus)
===================================================== */

document.querySelectorAll(".close-demo, .close-vnsat").forEach(closeEl => {

    closeEl.addEventListener("keydown", function(e){

        if(e.key === "Enter" || e.key === " "){

            e.preventDefault();
            closeEl.click();

        }

    });

});

let vnLastFocusedElement = null;

function vnOpenModal(modal){

    if(!modal) return;

    vnLastFocusedElement = document.activeElement;

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    const focusable = modal.querySelector(
        'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
    );

    if(focusable){ focusable.focus(); }

}

function vnCloseModal(modal){

    if(!modal) return;

    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");

    if(vnLastFocusedElement){ vnLastFocusedElement.focus(); }

}

/* Trap Tab focus and close on Escape for any open modal */
document.addEventListener("keydown", function(e){

    const openModal = document.querySelector('.demo-modal[aria-hidden="false"]');

    if(!openModal) return;

    if(e.key === "Escape"){

        vnCloseModal(openModal);
        return;

    }

    if(e.key === "Tab"){

        const focusables = openModal.querySelectorAll(
            'input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])'
        );

        if(focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if(e.shiftKey && document.activeElement === first){

            e.preventDefault();
            last.focus();

        } else if(!e.shiftKey && document.activeElement === last){

            e.preventDefault();
            first.focus();

        }

    }

});

const demoModal = document.getElementById("demoModal");

const closeDemo = document.querySelector(".close-demo");

/* Open from every button */

document.querySelectorAll(".open-demo").forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        vnOpenModal(demoModal);

    });

});

/* Close button */

if (closeDemo) {

    closeDemo.addEventListener("click", function(){

        vnCloseModal(demoModal);

    });

}

/* Click outside */

window.addEventListener("click", function(e){

    if(e.target === demoModal){

        vnCloseModal(demoModal);

    }

});
/* =====================================================
        SUBMIT FREE DEMO TO GOOGLE FORM
===================================================== */

/* =====================================================
            SUBMIT TO WHATSAPP
===================================================== */

const demoForm = document.getElementById("demoForm");

if (demoForm) {

    demoForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("studentName").value;
        const phone = document.getElementById("studentPhone").value;
        const studentClass = document.getElementById("studentClass").value;
        const subject = document.getElementById("studentSubject").value;
        const message = document.getElementById("studentMessage").value;

        const text =
`🎓 *New Free Demo Request*

👤 Student Name: ${name}

📱 Mobile Number: ${phone}

🏫 Class: ${studentClass}

📚 Subject: ${subject}

💬 Message:
${message}`;

        const whatsappURL =
`https://wa.me/919171505292?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");

        demoForm.reset();

        document.getElementById("demoModal").style.display = "none";

    });

}
/* =====================================================
                VNSAT MODAL
===================================================== */

const vnsatModal = document.getElementById("vnsatModal");

const closeVnsat = document.querySelector(".close-vnsat");

document.querySelectorAll(".open-vnsat").forEach(button => {

    button.addEventListener("click", function(e){

        e.preventDefault();

        vnOpenModal(vnsatModal);

    });

});

if(closeVnsat){

    closeVnsat.addEventListener("click", function(){

        vnCloseModal(vnsatModal);

    });

}

window.addEventListener("click", function(e){

    if(e.target === vnsatModal){

        vnCloseModal(vnsatModal);

    }

});

const menuToggle=document.querySelector(".menu-toggle");

const navLinks=document.querySelector(".nav-links");

const overlay=document.querySelector(".mobile-overlay");

if(menuToggle){

menuToggle.onclick=function(){

const isOpen = navLinks.classList.toggle("active");

overlay.classList.toggle("active");

menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

}

}

if(overlay){

overlay.onclick=function(){

navLinks.classList.remove("active");

overlay.classList.remove("active");

if(menuToggle){ menuToggle.setAttribute("aria-expanded","false"); }

}

}

/* Close mobile menu with Escape key */
document.addEventListener("keydown", function(e){

    if(e.key === "Escape" && navLinks && navLinks.classList.contains("active")){

        navLinks.classList.remove("active");
        overlay.classList.remove("active");
        if(menuToggle){ menuToggle.setAttribute("aria-expanded","false"); }

    }

});


/* =====================================
      TOPPER SCROLL ANIMATION
===================================== */

const topperCards = document.querySelectorAll(".topper-item");

const topperObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{

threshold:0.15

}

);

topperCards.forEach(card=>{

topperObserver.observe(card);

});
/* =====================================================
        CONTACT PAGE FORM SUBMIT TO WHATSAPP
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("contactName").value;
        const phone = document.getElementById("contactPhone").value;
        const email = document.getElementById("contactEmail").value;
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactMessage").value;

        const text =
`📩 *New Contact Enquiry*

👤 Name: ${name}

📱 Mobile: ${phone}

✉️ Email: ${email}

📝 Subject: ${subject}

💬 Message:
${message}`;

        const whatsappURL =
`https://wa.me/919171505292?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");

        contactForm.reset();

    });

}

/* =====================================================
            VNSAT FORM SUBMIT TO WHATSAPP
===================================================== */

const vnsatForm = document.getElementById("vnsatForm");

if (vnsatForm) {

    vnsatForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("vnsatName").value;
        const phone = document.getElementById("vnsatPhone").value;
        const school = document.getElementById("vnsatSchool").value;
        const studentClass = document.getElementById("vnsatClass").value;
        const course = document.getElementById("vnsatCourse").value;
        const city = document.getElementById("vnsatCity").value;
        const message = document.getElementById("vnsatMessage").value;

        const text =
`🏆 *VNSAT REGISTRATION*

👤 Name: ${name}

📱 Mobile: ${phone}

🏫 School: ${school}

🎓 Class: ${studentClass}

📚 Program: ${course}

📍 City: ${city}

💬 Message: ${message}`;

        const whatsappURL =
`https://wa.me/919171505292?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");

    });

}
