const nameInputEle = document.querySelector('.page-1 .input-container #name-input')
const emailInputEle = document.querySelector('.page-1 .input-container #email-input')
const phoneInputEle = document.querySelector('.page-1 .input-container #ph-number-input')

const inputArr = [nameInputEle,emailInputEle,phoneInputEle]

export function checkEmptyField(){
    let status = true
    inputArr.forEach((element)=>{
        const lengthOfParent = element.parentNode.children.length
        if (element.value == ''){
            if (lengthOfParent == 2){
                let invalidEle = document.createElement('p')
                invalidEle.classList.add('error-prompt')
                invalidEle.innerText = 'This field is required'
                element.parentNode.appendChild(invalidEle)
                element.classList.add('error-border-color')
            }
            status = false   
        }
        else{
            if (lengthOfParent == 3){
                element.parentNode.removeChild(element.parentNode.lastElementChild)
                element.classList.remove('error-border-color')
            }
        }
    })
    return status
}

inputArr.forEach((element)=>{
    element.addEventListener('keyup',()=>{
        const lengthOfParent = element.parentNode.children.length
        if (element.value != ''){
            if (lengthOfParent == 3){
                element.parentNode.removeChild(element.parentNode.lastElementChild)
                element.classList.remove('error-border-color')
            }
        }   
    })
})