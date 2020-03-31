chrome.runtime.onMessage.addListener(function (request, sender) {
  // eslint-disable-next-line eqeqeq
  if (request.action === 'getSource') {
    message.innerText = request.source;
    const re = /^(.+?)\//;
    const username = re.exec(message.innerText.split('https://assets.leetcode.com/users/')[1])[1];
  }
});

function onWindowLoad () {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true
    },
    function (tabs) {
      var currentUrl = tabs[0].url;
      if (currentUrl.startsWith('https://leetcode.com/')) {
        document.getElementsByClassName('other')[0].style.display = 'none';
        if (currentUrl.startsWith('https://leetcode.com/problems/')) {
          document.getElementsByClassName('home')[0].style.display = 'none';
            function modifyDOM() {
              console.log('Tab script:');
              console.log(document.body);
              return document.body.innerHTML;
            }
            chrome.tabs.executeScript({
              code: '(' + modifyDOM + ')();'
            }, (results) => {
              console.log(results[0]);
            });
        }
        else {
          document.getElementsByClassName('problems')[0].style.display = 'none';
          var message = document.querySelector('#message');
          chrome.tabs.executeScript(null,
            {
              file: 'getPagesSource.js'
            },
            function () {
              if (chrome.runtime.lastError) {
                message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
              }
            });
        }
      }
      else {
        document.getElementsByClassName('home')[0].style.display = 'none';
        document.getElementsByClassName('problems')[0].style.display = 'none';
      }
    }
  )
}

window.onload = onWindowLoad
