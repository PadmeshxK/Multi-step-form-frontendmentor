import { nextBtnEle,currentPage } from "./page_switch.js"
import { getPlan } from "./select-plan.js"
import { getAddOns } from "./add-ons-display.js"

const planFinalNameEle = document.querySelector('.page-4 .plan-container .left-section .plan-name')
const planFinalCostEle = document.querySelector('.page-4 .plan-container .plan-cost')
const addOnContainerEle = document.querySelector('.page-4 .plans-confirm-container')
const totalNameEle = document.querySelector('.page-4 .total-text')
const totalCostEle = document.querySelector('.page-4 .total-cost')

nextBtnEle.addEventListener('click',planSummaryModify)

let prevAddOnsCount = 0


function planSummaryModify(){
    if (currentPage == 3){
        let totalName = `Total`
        let planDetailArr = getPlan()
        let planName = planDetailArr[0]
        let planCost = planDetailArr[1]
        let planYeMo = planCost.split('/')[1]
        let addOnCostsArr = []

        if (planYeMo == 'mo'){
            planName += '(Monthly)'
            totalName += '(per month)'
        }
        else if (planYeMo == 'yr'){
            planName += '(Yearly)'
            totalName += '(per year)'
        }
        planFinalNameEle.innerText = planName
        planFinalCostEle.innerText = planCost      
        if (prevAddOnsCount != 0){
            deleteAddOns()
        }
        const addOnFinalArr = getAddOns()
        prevAddOnsCount = addOnFinalArr.length       
        if (addOnFinalArr.length != 0){
            let lineDivideEle = document.createElement('div')
            lineDivideEle.classList.add('line-divider')
            addOnContainerEle.appendChild(lineDivideEle)
            addOnFinalArr.forEach((arr)=>{
                const addOnTempEle = createAddOnEle(arr[0],arr[1])
                addOnContainerEle.appendChild(addOnTempEle)
                let addOnCost = arr[1].substring(2,arr[1].length - 3)
                addOnCostsArr.push(Number(addOnCost))
            })
        }
        totalNameEle.innerText = totalName
        planCost = planCost.substring(1,planCost.length-3)
        let sum = Number(planCost)
        addOnCostsArr.forEach((num)=>{
            sum += num
        })
        let totalCostText = `$${sum}/${planYeMo}`
        totalCostEle.innerText = totalCostText

    }
}

function createAddOnEle(name,cost){
    let addOnContainEle = document.createElement('div')
    addOnContainEle.classList.add('add-on-container')
    let nameEle = document.createElement('p')
    nameEle.classList.add('add-on-name')
    nameEle.innerText = name
    let costEle = document.createElement('p')
    costEle.classList.add('add-on-cost')
    costEle.innerText = cost
    addOnContainEle.appendChild(nameEle)
    addOnContainEle.appendChild(costEle)
    return addOnContainEle
}

function deleteAddOns(){
    let addOns = addOnContainerEle.querySelectorAll('.add-on-container')
    let lineDividerEle = addOnContainerEle.querySelector('.line-divider')
    addOnContainerEle.removeChild(lineDividerEle)
    for (let i = 0; i < addOns.length; i++){
        addOns[i].parentNode.removeChild(addOns[i])
    }
}
