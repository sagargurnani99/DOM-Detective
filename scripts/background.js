chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  })

  DomDetective_setState('ON')
})

chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  })

  DomDetective_setState(nextState)
})

const DomDetective_setState = (extensionState) => {
  chrome.storage.sync.set({
    dom_detective_state: extensionState
  })
}
