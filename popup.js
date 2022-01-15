// popup page

chrome.storage.sync.get(['freeLeft', 'uid', 'isBought'], function (result) {

    var a = document.getElementById("payblink");
    a.href = 'https://vit-captcha-solver.herokuapp.com/pay/?uid='+result.uid

    if (result.isBought){
        document.getElementById("content-bought").style.display='block';
        document.getElementById("content-no-bought").style.display='none';
    } else {
        var freeLeft = result.freeLeft;
        var freeLeftp = document.getElementById("freeLeft");
        freeLeftp.innerHTML = freeLeft;
        document.getElementById("content-bought").style.display='none';
        document.getElementById("content-no-bought").style.display='block';
    };

    hpb = document.getElementById('havePaid');
    hpb.onclick = function(){
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
        // chrome.runtime.reload()
    }
});
