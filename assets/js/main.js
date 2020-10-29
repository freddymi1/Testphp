(function(){
    var scrollY = function(){
        var supportPageOffset = window.pageXOffset !== undefined
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")
        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    }
    /**
     * LOSQUE l'on scroll
     *      SI le menu sors de l'ecran
     *      ALORS il deviendra fixe
     */
        window.makeSticky = function(element){
        var rect = element.getBoundingClientRect()
        var offset = parseInt(element.getAttribute('data-offset') || 0, 10)
        if(element.getAttribute('data-constraint')){
            var constraint = document.querySelector(element.getAttribute('data-constraint'))
        }else{
            var constraint = document.body
        }
        var constraintRect = constraint.getBoundingClientRect()
        var constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
        var top = rect.top + scrollY()
        var width = rect.width
        var fake = document.createElement('div')
        fake.style.width = rect.width + "px"
        fake.style.height = rect.height + "px"
        //Fonction
        var onScroll = function(){
            if(scrollY() > constraintBottom && element.style.position != 'absolute'){
                element.style.position = "absolute"
                element.style.bottom ='0'
                element.style.top = 'auto'
            }else if(scrollY() > top - offset && scrollY() < constraintBottom && element.style.position !='fixed'){
                element.classList.add('fixed')
                element.style.position = 'fixed'
                element.style.top = offset + "px"
                element.style.bottom = 'auto'
                element.style.width = rect.width + "px"
                element.parentNode.insertBefore(fake, element)
            }else if(scrollY() < top - offset && element.style.position != 'static'){
                element.classList.remove('fixed')
                element.style.position = 'static'
               if(element.parentNode.contains(fake)){
                    element.parentNode.removeChild(fake)
               }
            }
        }
        var onResize = function(){
            element.style.width = "auto"
            element.classList.remove('fixed')
            element.style.position = 'static'
            fake.style.display = "none"
            rect = element.getBoundingClientRect()
            constraintRect = constraint.getBoundingClientRect()
            constraintBottom = constraintRect.top + scrollY() + constraintRect.height - offset - rect.height
            top = rect.top + scrollY()
            fake.style.width = rect.width + "px"
            fake.style.height = rect.height + "px"
            fake.style.display = "block"
            onScroll()
        }
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
    }
    var elements = document.querySelectorAll('[data-sticky]')
    for(var i = 0; i < elements.length; i++){
        makeSticky(elements[i])
    }



$('#btnMembre').click(function(){
    $('#monModal').modal('show');
    $('#monModal').find('.modal-title').text('FORMULAIRE D\'INSCRIPTION') 
});
$('.alert').fadeIn().delay(8000).fadeOut('slow');
//$('.alert-danger').fadeIn().delay(4000).fadeOut('slow');
})()


 // Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("fermer")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
