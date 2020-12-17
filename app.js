window.onload = function() {
    const container = document.querySelector('.container');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const slider = document.querySelectorAll('.slider');
    const slide = document.querySelectorAll('.slide');
    const slideContainer = document.querySelector('.slider-container');
    const navigationDot = document.querySelectorAll('.navigation-dots');
    const links = document.querySelectorAll('.link');
    const nav = document.getElementById('nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const footer = document.getElementById('footer');
    const time = 4000;
    const numberOfSlide = slide.length;
    const numberOfLinks = links.length;

    
    let currentLink = 0;
    let currentSlide = 0;
    let slideId;


    const startSlide = () => {
        slideId = setInterval(() => {  
            if(currentSlide===numberOfSlide-1) {currentSlide=0}
            else {currentSlide++};
            goToSlide(currentSlide);
        }, time);
    }

    window.onscroll = function() {
        if (window.scrollY > 22) {
          nav.classList.add("scrolled");
          navLinks.classList.add('nav-scroll')
        } else {
          nav.classList.remove("scrolled");
          navLinks.classList.remove('nav-scroll')
        }
      };

    // add Click eventListener for every navbar
    for (let i=0;i<numberOfLinks;i++) {
        links[i].addEventListener('click', ()=> {setCurrentLink(i)})
    }

    // add click eventListener for hamburger navigation
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        footer.classList.toggle('blur');
        container.classList.toggle('blur');
        hamburger.classList.toggle('toggle');

    })


    // add Click eventListener for next button
    nextBtn.addEventListener('click', ()=> {
        if (currentSlide<numberOfSlide-1)
            currentSlide++;
            goToSlide(currentSlide);
            return;
    });

    // add Click eventListener for previous button
    prevBtn.addEventListener('click', ()=> {
        if (currentSlide>0)
            currentSlide--;
            goToSlide(currentSlide);
            return;
    });

    // pause autoslide when mouse enter the slide
    slideContainer.addEventListener('mouseenter', ()=> {
        clearInterval(slideId);
    })

    // unpause autoslide
    slideContainer.addEventListener('mouseleave', startSlide);

    function setCurrentLink(i) {
        links[currentLink].classList.add('link');
        links[currentLink].classList.remove('current-link');
        currentLink = i;
        links[currentLink].classList.add('current-link');
        links[currentLink].classList.remove('link');
    }

    function createNavigationDot() {

        // Create indicators
        for (let i=0; i<numberOfSlide; i++) {
            const dot = document.createElement('div');
            dot.classList.add("single-dot");
            navigationDot[0].appendChild(dot);
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }

        // Set first active indicator
        navigationDot[0].children[0].classList.add('active');
    }

    function setActiveClass(slideNumber) {
        let currentDot = document.querySelector('.active');
        currentDot.classList.remove('active');
        navigationDot[0].children[slideNumber].classList.add('active');
    }

    function goToSlide(slideNumber) {
        slider[0].style.transform = `translateX(${slideNumber*(-33.33)}%)`;
        currentSlide = slideNumber;
        setActiveClass(slideNumber);
        clearInterval(slideId);
        startSlide();
    };

    // Set home link as currentLink
    setCurrentLink(0);

    // create navigation dots for slider
    createNavigationDot();

    // start autoSlide
    startSlide();
}