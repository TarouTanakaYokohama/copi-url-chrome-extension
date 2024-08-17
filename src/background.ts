chrome.action.onClicked.addListener((tab) => {
    if (tab.id && tab.url) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: copyToClipboard,
            args: [tab.url]
        }).then(() => {
            // URLのコピーが成功した後にタブを閉じる
            chrome.tabs.remove(tab.id!);
        }).catch(err => {
            console.error('Failed to execute script: ', err);
        });
    }
});

const copyToClipboard = (url: string | undefined) => {
    if (url) {
        navigator.clipboard.writeText(url).then(() => {
            console.log('URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    } else {
        console.error('No URL found to copy.');
    }
};
