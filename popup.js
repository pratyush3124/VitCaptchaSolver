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
        chrome.runtime.reload()
    }

});
