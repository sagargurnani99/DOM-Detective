const DomDetective_getExtensionState = () => {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(["dom_detective_state"], (result) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			} else {
				resolve(result.dom_detective_state);
			}
		})
	})
}

const DomDetective_enableDisableExtension = (extensionState) => {
	if(extensionState == 'ON') {
		DomDetective_add() 
		return false
	}
	
	DomDetective_remove()
}

const DomDetective_add = () => {
	DomDetective_remove();
  
	let totalDomNodes = document.querySelectorAll('*').length
	const totalDomEleDiv = document.createElement('div')
	const logo = document.createElement('img')
	const totalDomNodesText = document.createTextNode(totalDomNodes)
	logo.src = chrome.runtime.getURL('images/icon32.png')
	totalDomEleDiv.id = 'domDetectiveTotalElements'
	totalDomEleDiv.appendChild(logo)
	totalDomEleDiv.appendChild(totalDomNodesText)
  
	document.body.appendChild(totalDomEleDiv)
}

const DomDetective_remove = () => {
	if(document.getElementById('domDetectiveTotalElements')) {
		document.getElementById('domDetectiveTotalElements').remove()
	}
}

DomDetective_getExtensionState()
	.then((domDetective_extensionState) => {
		DomDetective_enableDisableExtension(domDetective_extensionState);
	}).catch((error) => {
		console.log(error)
	})

chrome.storage.onChanged.addListener((changes, namespace) => {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {	
		DomDetective_enableDisableExtension(newValue)
	}
})
