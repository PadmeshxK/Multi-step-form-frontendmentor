import { checkEmptyField } from "./form-validation-checker.js"

const planChangeBtnEle = document.querySelector('.page-4 .plan-container .left-section .change-plan')
const pageNumsContainEle = document.querySelectorAll('.steps-container section .number-display-container')
const pagesContainEle = document.querySelector('.pages-container')
const page1Ele = document.querySelector('.page-1')
const page2Ele = document.querySelector('.page-2')
const page3Ele = document.querySelector('.page-3')
const page4Ele = document.querySelector('.page-4')
const thankPageEle = document.querySelector('.thank-you-page')
const btnContainerEle = document.querySelector('.btn-container')
export const nextBtnEle = document.querySelector('.next-page')
export const previousBtnEle = document.querySelector('.previous-page')

const pageArr = [page1Ele,page2Ele,page3Ele,page4Ele,thankPageEle]
export let currentPage = 0
let timerDelay = 200

nextBtnEle.addEventListener('click',nextPageSwitcher)
previousBtnEle.addEventListener('click',prevPageSwitcher)
planChangeBtnEle.addEventListener('click',changePlanRedirect)

nextBtnEle.addEventListener('click',()=>{
    stepNumIndicator(1)
    confirmButton()
})
previousBtnEle.addEventListener('click',()=>{
    stepNumIndicator(-1)
    confirmButton()
})

function nextPageSwitcher(){  
    if (currentPage >= 0 && currentPage < 4){
        if (currentPage != 0){
            pageFadeOut(currentPage,1)
            if (currentPage == 3){
                pageFadeIn(currentPage,1,'flex')
            }
            else{
                pageFadeIn(currentPage,1,'block')
            }
            currentPage++ 
        }
        else{
            if (checkEmptyField()){
                pageFadeOut(currentPage,1)
                pageFadeIn(currentPage,1,'block')
                currentPage++
            }   
        }          
    }
    if (currentPage == 1){
        btnFadeIn(previousBtnEle)
    }
    if (currentPage == 4){
        setTimeout(() => {
            pagesContainEle.classList.add('thank-you-align')
        }, timerDelay);
        btnFadeOut(previousBtnEle)
        btnFadeOut(nextBtnEle)
        btnContainerEle.style.backgroundColor = 'transparent'
    }
    else{
        pagesContainEle.classList.remove('thank-you-align')
    }
}

function prevPageSwitcher(){
    if (currentPage > 0 && currentPage < 4){
        pageFadeOut(currentPage,-1)
        pageFadeIn(currentPage,-1,'block')
        currentPage--
    }
    if (currentPage == 0){
        btnFadeOut(previousBtnEle)
    }
    else{
        btnFadeIn(previousBtnEle)
    }
    
}

function pageFadeOut(currPage,dir){
    pageArr[currPage].style.opacity = '0'
    setTimeout(()=>{
        pageArr[currPage].style.display = 'none'
    },timerDelay)
    pageArr[currPage+dir].style.opacity = '0'
   
}

function pageFadeIn(currPage,dir,val){
    setTimeout(()=>{
        pageArr[currPage+dir].style.display = val
    },timerDelay)
    setTimeout(()=>{
        pageArr[currPage+dir].style.opacity = '1'
    },timerDelay*2)    
}

function btnFadeOut(btnEle){
    btnEle.style.opacity = '0';
    setTimeout(()=>{
        btnEle.style.display = 'none'
    },timerDelay*2)
}

function btnFadeIn(btnEle){
    btnEle.style.display = 'block'
    setTimeout(()=>{
        btnEle.style.opacity = '1'
    },timerDelay*2)
}

function stepNumIndicator(dir){
    if (currentPage >= 0 && currentPage < 4){
        let currEle = pageNumsContainEle[currentPage]
        let prevEle = pageNumsContainEle[currentPage-dir]  
        currEle.classList.add('current-page')
        prevEle.classList.remove('current-page')
    }
    if (currentPage == 4){
        pageNumsContainEle[3].classList.remove('current-page')
    }   
}

function confirmButton(){
    if (currentPage == 3){
            nextBtnEle.innerText = 'Confirm'
            nextBtnEle.classList.add('confirm')       
    }
    else if(currentPage == 2){
        if (nextBtnEle.classList.contains('confirm')){
            nextBtnEle.innerText = 'Next Step'
            nextBtnEle.classList.remove('confirm')      
        }  
    }
}
 
function changePlanRedirect(){
    pageFadeOut(currentPage,-2)
    currentPage -= 2
    pageFadeIn(currentPage,0,'block')
    confirmButton()
    stepNumIndicator(-2)
}