


/*scrollReveal*/
const sr = ScrollReveal({
    duration:1000,
    mobile: true,
    reset:true
})
sr.reveal('.animate-scale',{
    scale:1.2,
    duration:1000,
    delay:300
})

sr.reveal('.animate-left',{
    origin: 'left',
    duration: 1000,
    distance: '25rem',
    delay: 300
});
sr.reveal('.animate-right',{
    origin: 'right',
    duration: 1000,
    distance: '25rem',
    delay: 300
});
sr.reveal('.animate-top',{
    origin: 'top',
    duration: 1000,
    distance: '10rem',
    delay: 600
});
sr.reveal('.animate-bottom',{
    origin: 'bottom',
    duration: 1000,
    distance: '25rem',
    delay: 600
});
