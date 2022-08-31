window.addEventListener('load', ()=>{
    
    let wrapper = document.querySelector('.wrapper');
    let preloader = document.querySelector(".loader-wrap");

    function showPage() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        preloader.style.visibility = 'none';
        let hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('show-bg');
        }
        setTimeout(() => {
            wrapper.style.opacity = '1';
        }, 500);
    }   

    showPage();

    let animInput = document.querySelectorAll('[data-inputanim]');

    if (animInput != null) {
        animInput.forEach(function(item){
            item.addEventListener('focus', ()=>{
                let placeHolder = item.nextElementSibling;
                placeHolder.classList.add('active');
                placeHolder.style.top = '-20px';
            });
            item.addEventListener('focusout', ()=>{
                let placeHolder = item.nextElementSibling;
                if(!item.value) {
                    placeHolder.style.top = '15px';
                    placeHolder.classList.remove('active');
                }
            })
        })
    }


    // Плаваная анимация 
    const animItems = document.querySelectorAll('._anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;

                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {
                top: rect.top + scrollTop, left: rect.left + scrollLeft
            }
        }
    }

    if (animItems.length > 0) {
        setTimeout(() => {
                animOnScroll();
            }, 500);
    }

    // инпут маска
    let phoneMasks = document.querySelectorAll('input[type=tel]');

    var maskOptions = {
        mask: '+{7} (000) 000-00-00'
    };
    if (phoneMasks !=null) {
        phoneMasks.forEach(function(item){
            var mask = IMask(item, maskOptions);
        })
    }

    let callPopup = document.querySelectorAll('.call-popup');
    let popup = document.querySelector('.popup');
    let popupItems = document.querySelectorAll('.popup-item');
    let closeBtn = document.querySelectorAll('.close-popup');

    if  (callPopup != null) {
        callPopup.forEach(function(item){
            item.addEventListener('click', (e)=>{
                let target = document.querySelector(item.getAttribute('data-target'));
                console.log(target)
                OpenPopup(target);
            })
        })
    }

    if (closeBtn != null) {
        closeBtn.forEach(function(item){
            item.addEventListener('click', ()=>{
                ClosePopup();
            })
        })
    }

    function OpenPopup(target){
        document.body.style.overflow = 'hidden';
        popup.classList.add('active');
        target.classList.add('active');
        document.addEventListener('click', (e)=>{
            let newTarget = e.target;
            if (!newTarget.closest('.popup__item') && !newTarget.closest('.call-popup')){
                ClosePopup();
            }
        });
    }

    document.addEventListener('keydown', (e)=>{
        if(e.key == "Escape") {
            ClosePopup();
        }
    })

    function ClosePopup()  {
        document.body.style.overflow = 'visible';
        popup.classList.remove('active');
        popupItems.forEach(function(item){
            item.classList.remove('active');
        })
    }

    let inputFile = document.querySelector('input[type=file]');

    if (inputFile) {
        inputFile.addEventListener('change', ()=>{
            let showFileBlock = document.querySelector('.show-loadfile');

            showFileBlock.innerHTML = inputFile.files[0].name;
        })
    }
})