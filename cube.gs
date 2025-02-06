// ==UserScript==
// @name         Netrunner Cube
// @namespace    http://tampermonkey.net/
// @version      2025-02-04
// @description  Filters NetrunnerDB card list to only show cube cards
// @author       Azrael
// @match        https://netrunnerdb.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// @run-at document-start
(async () => {
    'use strict';
    console.log("[Tampermonkey] Script loaded.");

    let mode = localStorage.getItem('Mode');
    if (!mode) {
        mode = 'Standard'
    }
    console.log(`Cube?: ${mode}`);

    let button = document.createElement('a');
    const text = mode === 'Cube' ? 'Cube' : 'All'
    button.innerHTML = text
    button.onclick= async () => {
        if (mode === 'Cube') {
            mode = 'Standard'
        } else {
            mode = 'Cube'
        }
        console.log(`Setting cube to ${mode}`)
        localStorage.setItem('Mode',mode);
        let fdb = new ForerunnerDB();
        await fdb.db('netrunnerdb').collection('master_cards').setData([]);
        await fdb.db('netrunnerdb').save(()=>{});
        window.location.reload(true);
    }
    button.class = "hidden-sm hidden-xs"
    let buttonContainer = document.createElement('li');
    buttonContainer.appendChild(button)
    document.getElementsByClassName('navbar-right')[0].appendChild(buttonContainer)

    let cube = [];

    async function fetchCube() {
        return new Promise(async (resolve, reject) => {
            const respo = await fetch('https://raw.githubusercontent.com/KevinUre/netrunner-cube/refs/heads/master/output/cube.json')
            if (respo.ok) {
                cube = await respo.json()
                console.log(`got the cube:`,cube)
                resolve()
            } else {
                console.log(`failed to the cube`)
                reject(new Error('oh god its everywhere'))
            }
        });
    }

    var filterCubeCards = function(response) {
        for(let i = 0; i < response.data.length; i++) {
            if ( !cube.includes(response.data[i].title) ) {
                response.data.splice(i,1);
                i--;
            }
        }
        return response;
    }

    var filterCubeSearch = function() {
        console.log("[Tampermonkey] Filtering Search");
        let rows = document.querySelectorAll('table.rwd-table tbody tr');
        rows.forEach(row => {
            let titleElement = row.querySelector('td[data-th="Title"] a.card');
            if (titleElement) {
                let cardTitle = titleElement.textContent.trim();
                if (!cube.includes(cardTitle)) {
                    row.remove();
                }
            }
        });
        console.log("[Tampermonkey] Filtering complete");
    }

    var filterCubeNewDeck = function() {
        console.log("[Tampermonkey] Filtering Search");
        let identities = document.querySelectorAll(".list-group a.identity");
        identities.forEach(identity => {
            let nameElement = identity.querySelector(".name");
            if (nameElement) {
                let identityName = nameElement.textContent.trim();
                if (!cube.includes(identityName)) {
                    //console.log(`[Tampermonkey] Hiding identity: ${identityName}, not in cube.`);
                    identity.remove();
                }
            }
        });
        console.log("[Tampermonkey] Filtering complete");
    }

    if (mode === 'Cube') {
        let cubePromise = fetchCube();

        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url) {
            if (url.includes('/api/2.0/public/cards')) {
                console.log("[Tampermonkey] XHR Intercepted:", url);
                this.addEventListener("load", async function() {
                    try {
                        let response = JSON.parse(this.responseText);
                        console.log("[Tampermonkey] Original API response:", response);

                        if (Array.isArray(response.data)) {
                            await cubePromise;
                            if(cubePromise instanceof Promise)
                            {
                                response = filterCubeCards(response);
                            }
                        }

                        console.log("[Tampermonkey] Modified API response:", response);

                        Object.defineProperty(this, "responseText", { value: JSON.stringify(response) });
                    } catch (e) {
                        console.error("[Tampermonkey] Error modifying response:", e);
                    }
                });
            }
            return originalOpen.apply(this, arguments);
        };

        if(window.location.pathname.includes('find')) {
            console.log("[Tampermonkey] Search Detected");
            (async()=>{
                await cubePromise;
                filterCubeSearch();
            })();
        }

        if(window.location.pathname.includes('deck') && window.location.pathname.includes('new')) {
            console.log("[Tampermonkey] New Deck Detected");
            (async()=>{
                await cubePromise;
                filterCubeNewDeck();
            })();
        }
    }
})();
