let slideIndex = 1;
createSlideShowItems();

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://s.yimg.com/cv/apiv2/default/20200528/test.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(JSON.parse(xobj.responseText));
          }
    };
    xobj.send();
 }

 function createSlideShowItems() {
    loadJSON(response => {
        let divSlideShowContainer = document.getElementsByClassName("slideshow-container")[0];
        let divSlideShowDots = document.getElementsByClassName("slideshow-dots")[0];
        let curItem = 1;
        const totalItens = response.data.length;

        response.data.forEach(item => {
            divSlideShowContainer.innerHTML +=
            "<div class='mySlides fade'>" +
                "<div class='numbertext'>"+ curItem +" / "+ totalItens +"</div>" +
                "<h3 class='slides-title'> "+ item.title_a +" </h3>" +
                "<p class='slides-summary'> "+ item.summary.substring(0,50) +" </p>" +
            "</div>"; 
            divSlideShowDots.innerHTML +=
            "<span class='dot' onclick='currentSlide("+ curItem +")'></span>"; 

            curItem++;
        });

        showSlides(slideIndex);
    });
 }