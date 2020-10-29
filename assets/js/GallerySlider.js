
/**
 * Permet de naviguer sur les differents ecran mobile
 */
class CarouselTouchPlugins {
    /**
     * @param {carousel} carousel
     */

     constructor (carousel){
         carousel.containt.addEventListener('dragstart', (e) => {e.preventDefault()})
         carousel.containt.addEventListener('mousedown', this.startDrag.bind(this))
         carousel.containt.addEventListener('touchstart', this.startDrag.bind(this))
         window.addEventListener('mousemove', this.drag.bind(this))
         window.addEventListener('touchmove', this.drag.bind(this))
         window.addEventListener('touchend', this.endDrag.bind(this))
         window.addEventListener('mouseup', this.endDrag.bind(this))
         window.addEventListener('touchcancel', this.endDrag.bind(this))
         this.carousel = carousel
     }

     /**
      * Permet de déplacer au touche
      * @param {MouseEvent | TouchEvent} e 
      */

    startDrag (e) {
        if(e.touches){
            if(e.touches.length > 1){
                return
            }else{
                e = e.touches[0]
            }
        }
        this.origin = {x: e.screenX, y: e.screenY}
        this.width = this.carousel.containtWidth
        this.carousel.disableTransition()
    }

    /**
     * Deplacement
     * @param {MouseEvent | TouchEvent} e 
     */

     drag (e){
         if(this.origin){
             let point = e.touches ? e.touches[0] : e
             let translate = {x: point.screenX - this.origin.x, y: point.screenY - this.origin.y}
             if(e.touches && Math.abs(translate.x) > Math.abs(translate.y)){
                 e.preventDefault()
                 e.stopPropagation()
             }else if(e.touches){
                 return
             }
             let baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length
             this.lastTranslate = translate
             this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
         }
     }

    /**
     * Fin du deplacement
     * @param {MouseEvent | TouchEvent} e 
     */

     endDrag (e){
        if(this.origin && this.lastTranslate){
            this.carousel.enableTransition()
            if(Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2){
                if(this.lastTranslate.x < 0){
                    this.carousel.next()
                }else{
                    this.carousel.prev()
                }
            }else{
                this.carousel.gotoItem(this.carousel.currentItem)
            }
        }
        this.origin = null
     }
}
/**
* 
* @param {Polyfill} Compatibilité avec toutes les navigateurs 
*  
*/

/*if (typeof Object.assign != 'function'){
    //Must be writable: true, enumerable: false, fonfigurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs){//.length of function is 2
            'use strict';
            if(target == null){//TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for(var index = 1; index < arguments.length; index++){
                var nextSource = arguments[index];
                if(nextSource != null){//Skip over if undefined or null
                    for(var nextKey in nextSource){
                        //Avoid bugs when hasOwnProperty is shadowed
                        if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)){
                            to[nextKey] = nextSource[nextkey];
                        }
                    }
                }

            }
            return to;
        },
        writable: true,
        configurable: true
    });
}*/
/**Fin polyfil */
class Carousel {

    

    /**
     * @param {HTMLElement} element 
     * @param {Object} options
     * @param {Object} [options.slidesToScroll=1] Nombre d'élement à faire defiler
     * @param {Object} [options.slidesVisible=1] Nombre d'élements visible dans un lide
     * @param {boolean} [options.loop=false] Doit-on boucler en fin de carousel
     * @param {boolean} [options.pagination=false]
     * @param {boolean} [options.infinite=false]
     * @param {boolean} [options.navigation=true]
     */

    

    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            loop: false,
            pagination: false,
            navigation: true,
            infinite: false
        }, options)

        /*if(this.options.loop && this.options.infinite){
            throw new Error('Le carousel ne peut pas être à la fois en boucle et en infinit')
        }*/

        let children = [].slice.call(element.children)
        this.isMobile = true
        this.isMobilesm = false
        this.currentItem = 0
        this.moveCallbacks = []
        this.offset = 0
        //Modfication du DOM
        this.root = this.createDivWithClass('carousel')
        this.containt = this.createDivWithClass('carousel__containt')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.containt)
        this.element.appendChild(this.root)
        
        //On ajoute tout les element item(enfant dan le containt)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            return item
        })
        if(this.options.infinite){
            this.offset = this.slidesVisible + this.options.slidesToScroll - 1
            if(this.offset > children.length){
                alert("Vous n'avez pas asez d'élément pour le carousel", element)
            }
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
            ]
            this.gotoItem(this.offset, false)
            /*window.setTimeout(() => {
                this.gotoItem(this.offset + 1, true)
            }, 2000)*/
        }

        this.items.forEach(item => this.containt.appendChild(item))
        this.setStyle()
        if(this.options.navigation){
            this.createNavigation()
            /*if(this.options.pagination){
                this.createPagination()
            }*/
        }
        if(this.options.pagination){
            this.createPagination()
        }
        //Evenements
        this.moveCallbacks.forEach(cb => cb(this.currentItem))
        this.onWindowResizesm()
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResizesm.bind(this))
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', e => {
            if(e.key === 'ArrowRight' || e.key === 'Right'){
                this.next()
            }else if(e.key === 'ArrowLeft' || e.key === 'Left'){
                this.prev()
            }
        })
        if(this.options.infinite){
            this.containt.addEventListener('transitionend', this.resetInfinite.bind(this))
        }
        new CarouselTouchPlugins(this) 
    }

    /**
     * Applique les bonnes dimentions aux élements du carousel
     */

    setStyle () {
        let ratio = this.items.length / this.slidesVisible
        this.containt.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
    }
    /**
     * Pour la navigation dans le DOM
     */
    createNavigation () {
        let nextBtn = this.createDivWithClass('carousel__next')
        let prevBtn = this.createDivWithClass('carousel__prev')
        this.root.appendChild(nextBtn)
        this.root.appendChild(prevBtn)
        nextBtn.addEventListener('click', this.next.bind(this))
        prevBtn.addEventListener('click', this.prev.bind(this))
        if(this.options.loop === true){
            return
        }
        this.onMove(index => {
            if(index === 0){
                prevBtn.classList.add('carousel__prev--hidden')
            }else{
                prevBtn.classList.remove('carousel__prev--hidden')
            }
            if(this.items[this.currentItem + this.slidesVisible] === undefined){
                nextBtn.classList.add('carousel__next--hidden')
            }else{
                nextBtn.classList.remove('carousel__next--hidden')
            }
        })
    }

    translate (percent){
        this.containt.style.transform = 'translate3d(' + percent +'%,0, 0)'
    }
    /**
     * Pour la pagination dans le DOM
     */
    createPagination () {
        let pagination = this.createDivWithClass('carousel__pagination')
        let buttons = []
        this.root.appendChild(pagination)
        for(let i = 0; i < (this.items.length - 2 * this.offset); i = i + this.options.slidesToScroll){
            let button = this.createDivWithClass('carousel__pagination__button')
            button.addEventListener('click', () => this.gotoItem(i + this.offset))
            pagination.appendChild(button)
            buttons.push(button)

        }
        this.onMove(index => {
            let count = this.items.length - 2 * this.offset
            let activeBtn = buttons[Math.floor(((index - this.offset) % count)  / this.options.slidesToScroll)]
            if(activeBtn){
                buttons.forEach(button => button.classList.remove('carousel__pagination__button--active'))
                activeBtn.classList.add('carousel__pagination__button--active')
            }
        })
    }

    next (){
        this.gotoItem(this.currentItem + this.slidesToScroll)
    }

    prev () {
        this.gotoItem(this.currentItem - this.slidesToScroll)
    }

    /**
     * Déplacer le carousel vers l'element ciblé
     * @param {number} index 
     * @param {boolean} [animation=true]
     */

    gotoItem (index, animation = true){
        if(index < 0){
            if(this.options.loop){
                index =  this.items.length - this.slidesVisible
            }else{
                return
            } 
        }else if(index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)){
            if(this.options.loop){
                index =  0
            }else{
                return
            } 
        }

        let translateX = index * -100 / this.items.length
        if(animation === false){
            this.disableTransition()
        }
        this.translate(translateX)
        this.containt.offsetHeight //Forcer à stoper l'animation
        if(animation === false){
            this.enableTransition()
        }
        this.currentItem = index
        this.moveCallbacks.forEach(cb => cb(index))
    }
    /**
     * Deplacer le containt pour donner l'impression de slide infinie 
     */
    resetInfinite () {
        if(this.currentItem <= this.options.slidesToScroll){
            this.gotoItem(this.currentItem + (this.items.length - 2 * this.offset), false)
        }
        else if(this.currentItem >= this.items.length - this.offset){
            this.gotoItem(this.currentItem - (this.items.length - 2 * this.offset), false)
        }
    }
    /**
     * 
     * @param {moveCallback} cb 
     */

    onMove (cb){
        this.moveCallbacks.push(cb)
    }
    /**
     * @returns {boolean} Lorssqu'on redimensionne la fenetre
     */
    onWindowResize () {
        let size = window.innerWidth
        let mobile = size < 1000
        if(mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
        }
        
    }

    onWindowResizesm () {
        let size1 = window.innerWidth
        let smscreen = size1 < 600
        if(smscreen !== this.isMobilesm){
            this.isMobilesm = smscreen
            this.setStyle()
            this.moveCallbacks.forEach(cb => cb(this.currentItem))
        }
        
    }
    /**
     * 
     * @param {string} className
     * @return {HTMLElement}
     */

    createDivWithClass (className){
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    disableTransition () {
        this.containt.style.transition = 'none'
    }
    enableTransition () {
        this.containt.style.transition = ''
    }

    /**
     * @return {number}
     */
    get slidesToScroll (){
       // return this.isMobile ? 1 : this.options.slidesToScroll
        if(this.isMobilesm){
            return 1
        }else if(this.isMobile){
            return 1
        }else{
            return this.options.slidesToScroll
        }
    }
    /**
     * @return {number}
     */
    get slidesVisible (){
       // return this.isMobile ? 2 : this.options.slidesVisible
        if(this.isMobilesm){
            return 1
        }
        else if(this.isMobile){
            return 2
        }else{
            return this.options.slidesVisible
        }
    }

    get containtWidth () {
        return this.containt.offsetWidth
    }


    /**
     * 
     * @return {number} 
     */

     get carouselWidth() {
         return this.root.offsetWidth
     }
}
let onReady = function(){
    new Carousel(document.querySelector('#carousel1'), {
        slidesToScroll: 1,
        slidesVisible: 3,
        pagination: false,
        infinite:false,
        loop: false

    })
    /*new Carousel(document.querySelector('#carouselExampleIndicators'), {
        slidesToScroll:1,
        slidesVisible: 1,
        pagination:false,
        infinite: true,
        loop: true
    })*/

    /*new Carousel(document.querySelector('#carousel3'), {
        slidesToScroll: 1,
        slidesVisible: 1,
        pagination: true,
        loop: true
    })*/
}
if(document.readyState !== 'loading'){
    onReady()
}
document.addEventListener('DOMContentLoaded', onReady)
