window.onload = function() {
    const container = document.querySelector('.l_container');
    const nextBtn = document.getElementById('c_next');
    const prevBtn = document.getElementById('c_prev');
    const slider = document.querySelectorAll('.l_slider');
    const slide = document.querySelectorAll('.l_slide');
    const slideContainer = document.querySelector('.l_slider__container');
    const navigationDot = document.querySelectorAll('.c_navigation__dots');
    const links = document.querySelectorAll('.c_link');
    const nav = document.getElementById('l_nav');
    const hamburger = document.querySelector('.c_hamburger');
    const navLinks = document.querySelector('.c_nav__links');
    const footer = document.getElementById('c_footer');
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

    // box shadow for header when scrolling

    window.onscroll = function() {
        if (window.scrollY > 22) {
          nav.classList.add("scrolled");
        } else {
          nav.classList.remove("scrolled");
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

    // set style for current link clickedd
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

    //set active indicator
    function setActiveClass(slideNumber) {
        let currentDot = document.querySelector('.active');
        currentDot.classList.remove('active');
        navigationDot[0].children[slideNumber].classList.add('active');
    }

    function goToSlide(slideNumber) {
        slider[0].style.transform = `translateX(${slideNumber*(-25)}%)`;
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