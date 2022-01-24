
chrome.runtime.onInstalled.addListener(function(details){

    // when installed request user_id and store.
    if (details.reason=="install"){
        fetch('https://vit-captcha-solver.herokuapp.com/api/', {
        // fetch('https://http://127.0.0.1:5000/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'function':'createID'}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            chrome.storage.sync.set({uid:data.newId, isBought:0, freeLeft:3}, function(){
                console.log('New uid set '+data.newId)
            })
        })
        .catch((err) => {
            console.log(err)
        });
        
    // when updated check for bought status
    } else if (details.reason=="update"){
        chrome.storage.sync.get(['freeLeft', 'uid'], function (result) {
            fetch('https://vit-captcha-solver.herokuapp.com/api/', {
            // fetch('https://http://127.0.0.1:5000/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'function':'checkBought', 'uid':result.uid}),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.ans) {
                    chrome.storage.sync.set({isBought:1}, function(){
                        console.log('Uid '+result.uid+' Bought');
                    })
                } else {
                    chrome.storage.sync.set({isBought:0}, function(){
                        console.log('Uid '+result.uid+' not Bought');
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            });
        });
    }
});
