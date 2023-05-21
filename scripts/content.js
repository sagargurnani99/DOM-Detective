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
	DomDetective_remove()

	let totalDomEle = document.querySelectorAll('*').length
	let totalDomEleDiv = document.createElement('div')
	totalDomEleDiv.id = 'domDetectiveTotalElements'
	totalDomEleDiv.innerText = `DOMs Detected: ${totalDomEle}`

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
