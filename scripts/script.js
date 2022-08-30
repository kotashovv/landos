window.addEventListener('load', ()=>{
    
    let wrapper = document.querySelector('.wrapper');
    let preloader = document.querySelector(".loader-wrap");

    function showPage() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'none';
        setTimeout(() => {
            wrapper.style.opacity = '1';
        }, 500);
    }   

    showPage();

})