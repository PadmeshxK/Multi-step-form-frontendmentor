import { getPlan } from "./select-plan.js"
import { currentPage } from "./page_switch.js"
import { nextBtnEle } from "./page_switch.js"

let addOnEle = document.getElementsByName('add-ons')
addOnEle = Object.values(addOnEle)

nextBtnEle.addEventListener('click',addOnsCostDisplay)

function addOnsCostDisplay(){
    if (currentPage == 2){
        let plan = getPlan()[1]
        plan = plan.split('/')
        if (plan[1] == 'yr'){
            addOnEle.forEach((ele)=>{
                let costEle = ele.parentNode.querySelector('.add-on-price')
                let costStr = costEle.innerText
                let costArr = costStr.split('/')
                if (costArr[1] != 'yr'){
                    costStr = costArr[0] + '0/yr'
                    costEle.innerText = costStr
                }  
            })
        }
        else{
            addOnEle.forEach((ele)=>{
                let costEle = ele.parentNode.querySelector('.add-on-price')
                let costStr = costEle.innerText          
                let costArrCheck = costStr.split('/')
                if (costArrCheck[1] != 'mo'){
                    let costArr = costStr.split('0/')
                    costStr = costArr[0] + '/mo'
                    costEle.innerText = costStr
                }    
            })
        }
        
    }
        
    
}

export function getAddOns(){
    let addOnArr = []
    addOnEle.forEach((ele)=>{
        if (ele.checked){
            const costEle = ele.parentNode.querySelector('.add-on-price').innerText
            const nameEle = ele.parentNode.querySelector('.mid-section h2').innerText
            addOnArr.push([nameEle,costEle])
        }
    })
    return addOnArr
}

