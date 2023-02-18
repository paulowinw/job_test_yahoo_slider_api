let slideIndex = 1;
createSlideShowItems();
loadModal();

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
    let xobj = new XMLHttpRequest();
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
        const divSlideShowContainer = document.getElementsByClassName("slideshow-container")[0];
        const divSlideShowDots = document.getElementsByClassName("slideshow-dots")[0];
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

function loadModal() {
     // Get the modal
    const modal = document.getElementById("modal-browser-info");

    // Get the button that opens the modal
    const btn = document.getElementById("btn-browser-info");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close-modal")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        const modalText = document.getElementsByClassName("modal-text")[0];
        modalText.innerHTML = getBrowserInfo();
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function getBrowserInfo() {
    let nVer = navigator.appVersion;
    let nAgt = navigator.userAgent;
    let browserName  = navigator.appName;
    let fullVersion  = ''+parseFloat(navigator.appVersion); 
    let majorVersion = parseInt(navigator.appVersion,10);
    let nameOffset,verOffset,ix;

    // In Opera, the true version is after "OPR" or after "Version"
    if ((verOffset=nAgt.indexOf("OPR"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+4);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
        fullVersion = nAgt.substring(verOffset+8);
    }
    // In MS Edge, the true version is after "Edg" in userAgent
    else if ((verOffset=nAgt.indexOf("Edg"))!=-1) {
        browserName = "Microsoft Edge";
        fullVersion = nAgt.substring(verOffset+4);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
            (verOffset=nAgt.lastIndexOf('/')) ) 
    {
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion); 
        majorVersion = parseInt(navigator.appVersion,10);
    }

    return '<p> Browser name  = '+browserName+'<p/>'
        +'<p> Full version  = '+fullVersion+'<p/>'
        +'<p> Major version = '+majorVersion+'<p/>'
        +'<p> AppName = '+navigator.appName+'<p/>'
        +'<p> UserAgent = '+navigator.userAgent+'<p/>'
    ;
}

function validateEmail() {
    const input = document.getElementsByClassName("signup-email")[0];
    const display = document.getElementById("validation-email-message");
    if (input.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
      display.innerHTML = 'Subscription done!';
      display.classList.add("valid-email");
    } else {
      display.innerHTML = input.value + ' is not a valid email';
      display.classList.add("invalid-email");
    }
}