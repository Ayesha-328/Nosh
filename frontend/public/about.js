console.log("About.js loaded successfully")

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const dots = document.querySelectorAll('.dot');

    console.log(slider)
    console.log(slides)
    console.log(dots)


    let currentSlide = 0;

    function showSlide(index) {
        const slideCount = slides.children.length;
        const sliderWidth = slider.clientWidth;
        slides.style.transform = `translateX(${-index * (sliderWidth / slideCount) * slideCount}px)`;
        
        dots.forEach((dot) => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log("Slider clicked")
            currentSlide = index;
            showSlide(currentSlide);
        });
    });


    // Show initial slide
    showSlide(currentSlide);
});

