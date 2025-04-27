# React.dev Navigation Swapper

A browser console script that swaps the "Community" and "Reference" items in the React.dev website header navigation and persists the order using session storage.

## Features

- Swaps position of "Community" and "Reference" navigation items
- Maintains swapped state during browser session using `sessionStorage`
- Restores previous order when script is re-executed in the same session
- Works entirely client-side via browser console

## How It Works

1. **First Execution (No Session Data)**:
   - Identifies the "Community" and "Reference" elements in the navigation
   - Swaps their positions in the DOM
   - Stores the original and new indexes in `sessionStorage`

2. **Subsequent Executions (Session Exists)**:
   - Checks `sessionStorage` for previously stored positions
   - Reorders elements according to the stored configuration
   - Maintains consistent navigation layout during the browser session

3. **New Session**:
   - When the browser tab is closed and reopened
   - The script will perform a fresh swap and store new session data

## Technical Implementation

```javascript
// Get navigation elements
const nav = document.querySelector('nav');
const menu = nav.firstElementChild.children[2].children[0];

// Identify target elements
const communityElement = menu.querySelector('div a[href="/community"]').closest('div')
const referenceElement = menu.querySelector('div a[href="/reference/react"]').closest('div')

// Getting Index of those target elements
const children = Array.from(menu.children);
const communityIndex = children.indexOf(communityElement);
const referenceIndex = children.indexOf(referenceElement);


// Check for existing session data
const sessionData = sessionStorage.getItem('navSwapData');

// Restore from session
if(swapSessionData && swapSessionData.isSwaped){
    if(swapSessionData.communityIndex != communityIndex){
        [children[referenceIndex], children[communityIndex]] = [children[swapSessionData.referenceIndex], children[swapSessionData.communityIndex]];
        menu.innerHTML = '';
    children.forEach(child => menu.appendChild(child));
    }
}else if(!swapSessionData){

 // Perform initial swap and store data
    [children[referenceIndex], children[communityIndex]] = [children[communityIndex], children[referenceIndex]];
    menu.innerHTML = '';
    children.forEach(child => menu.appendChild(child));
    
    const newSwapSession = {
                                isSwaped:true,
                                communityIndex: Array.from(menu.children).indexOf(communityElement),
                                referenceIndex: Array.from(menu.children).indexOf(referenceElement),
                                createdAt: Date.now()
                            }
  // Store in session
sessionStorage.setItem('swapSession', JSON.stringify(newSwapSession));
}
