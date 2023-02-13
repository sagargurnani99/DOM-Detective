let totalDomEle = document.querySelectorAll('*').length

let totalDomEleDiv = document.createElement('div')
totalDomEleDiv.id = 'domDetectiveTotalElements'
totalDomEleDiv.innerText = `Total DOM Elements = ${totalDomEle}`

document.body.appendChild(totalDomEleDiv)
