import { currentPage,nextBtnEle } from "./page_switch.js"

let plansEle = document.getElementsByName('game-type')
const monYearSelectEle = document.getElementById('#mon-year-checkbox')
const plansContainerEle = document.querySelectorAll('.page-2 .plans-form input + label')

let plansArr = Object.values(plansContainerEle)
plansEle = Object.values(plansEle)

monYearSelectEle.addEventListener('click',monYearLySwitcher)

export function getPlan(){
    let arr = null
    plansEle.forEach((element,ind)=>{         
        if (element.checked){
            let planName = plansArr[ind].querySelector('.plan-name').innerText
            let planCost = plansArr[ind].querySelector('.plan-cost').innerText
            arr = [planName,planCost]       
        }
    })
    return arr    
}

function monYearLySwitcher(){   
    plansArr.forEach((ele)=>{
        if (monYearSelectEle.checked){
            let planOfferEle = document.createElement('p')
            planOfferEle.innerText = '2 months free'
            planOfferEle.classList.add('plan-offer')
            const costEle = ele.lastElementChild
            let costStr = costEle.innerText
            let costArr = costStr.split('/')
            costStr = costArr[0] + '0/yr'
            costEle.innerText = costStr
            ele.appendChild(planOfferEle)
        }
        else if(!monYearSelectEle.checked){
            if (ele.lastElementChild.classList.contains('plan-offer')){
                ele.removeChild(ele.lastElementChild)
            }
            const costEle = ele.lastElementChild
            let costStr = costEle.innerText
            let costArr = costStr.split('0/')
            costStr = costArr[0] + '/mo'
            costEle.innerText = costStr    
        } 
    })
    
}


