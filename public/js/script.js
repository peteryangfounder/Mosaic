let stringYoutubeData = document.querySelector('#stringYoutubeData').value;
let stringRedditData = document.querySelector('#stringRedditData').value;
let stringTiktokData = document.querySelector('#stringTiktokData').value;

let youtubeData;
let redditData;
let tiktokData;

// YouTube data
if (stringYoutubeData) {
    youtubeData = JSON.parse(stringYoutubeData);
    console.log(youtubeData);
}

// Reddit data
if (stringRedditData) {
    redditData = JSON.parse(stringRedditData);
    console.log(redditData);
}

// Tiktok data
if (stringTiktokData) {
    tiktokData = JSON.parse(stringTiktokData);
    console.log(tiktokData);
}

// Results
const results = document.querySelector('#results');

if (youtubeData || redditData || tiktokData) {
    let youtubeVideo = '';
    let redditPost = '';
    let tiktokVideo = '';

    // Loading spinner
    const spinner = document.querySelector('.spinner-border');
    spinner.style.visibility = 'visible';

    // Max results
    let maxResults = document.querySelector('select').value;

    // Loop through data and display
    let i = 0;

    function displayMedia() {
        setTimeout(function() {

            // Set spinner back to hidden
            if (spinner.style.visibility = 'visible')
                spinner.style.visibility = 'hidden';

            if (youtubeData && youtubeData.items[i]) {
                if (typeof youtubeData.items[i].id === 'object' && youtubeData.items[i].id !== null) {
                    youtubeVideo = `
                        <iframe height="315" src="https://www.youtube.com/embed/${youtubeData.items[i].id.videoId}" title="YouTube video player" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    `
                } else {
                    youtubeVideo = `
                        <iframe height="315" src="https://www.youtube.com/embed/${youtubeData.items[i].id}" title="YouTube video player" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    `
                }

                results.insertAdjacentHTML('beforeend', youtubeVideo);
            }

            if (redditData && redditData.data.children[i]) {
                redditPost = `
                <iframe class="border" id="reddit-embed" src="https://www.redditmedia.com${redditData.data.children[i].data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true" sandbox="allow-presentation allow-scripts allow-same-origin allow-popups" style="border: none;" 
                height="315" scrolling="no"></iframe>
            `
                results.insertAdjacentHTML('beforeend', redditPost);
            }

            if (tiktokData && tiktokData.collector[i]) {
                tiktokVideo = `
            <iframe id="tiktok-embed" name="__tt_embed__v54746331796788450" src="https://www.tiktok.com/embed/v2/${tiktokData.collector[i].id}?lang=en-US" style="height: 711px; 
            visibility: unset; max-height: 711px;"></iframe>
        `
                results.insertAdjacentHTML('beforeend', tiktokVideo);
            }

            i++;

            if (i < maxResults) {
                displayMedia();
            }
        }, 5000)
    }

    displayMedia();
} else {
    results.innerHTML = '<p>Select one or more social media platforms to see results.</p>';
}