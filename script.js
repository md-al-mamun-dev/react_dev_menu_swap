const nav = document.querySelector('nav');
const menu = nav.firstElementChild.children[2].children[0];
const communityElement = menu.querySelector('div a[href="/community"]').closest('div')
const referenceElement = menu.querySelector('div a[href="/reference/react"]').closest('div')

const children = Array.from(menu.children);

const communityIndex = children.indexOf(communityElement);
const referenceIndex = children.indexOf(referenceElement);

const swapSessionData = JSON.parse(sessionStorage.getItem('swapSession'));

if(swapSessionData && swapSessionData.isSwaped){
    if(swapSessionData.communityIndex != communityIndex){
        [children[referenceIndex], children[communityIndex]] = [children[swapSessionData.referenceIndex], children[swapSessionData.communityIndex]];
        menu.innerHTML = '';
    children.forEach(child => menu.appendChild(child));
    }
}

if(!swapSessionData){
    [children[referenceIndex], children[communityIndex]] = [children[communityIndex], children[referenceIndex]];
    menu.innerHTML = '';
    children.forEach(child => menu.appendChild(child));
    
    const newSwapSession = {
                                isSwaped:true,
                                communityIndex: Array.from(menu.children).indexOf(communityElement),
                                referenceIndex: Array.from(menu.children).indexOf(referenceElement),
                                createdAt: Date.now()
                            }

sessionStorage.setItem('swapSession', JSON.stringify(newSwapSession));
}
