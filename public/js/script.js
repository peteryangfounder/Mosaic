// YouTube data
const youtubeData = JSON.parse(document.querySelector('#stringYoutubeData').value);
console.log(youtubeData);

// Reddit data
const redditData = JSON.parse(document.querySelector('#stringRedditData').value);
console.log(redditData);

// Tiktok data
const tiktokData = JSON.parse(document.querySelector('#stringTiktokData').value);
console.log(tiktokData);

// Results
const results = document.querySelector('#results');
let youtubeVideo = '';
let redditPost = '';
let tiktokVideo = '';

// Loop through data and display
let i = 0;

function displayMedia() {
    setTimeout(function() {
        if (youtubeData.items[i]) {
            youtubeVideo = `
                <iframe height="315" src="https://www.youtube.com/embed/${youtubeData.items[i].id.videoId}" title="YouTube video player" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen></iframe>
            `
            results.insertAdjacentHTML('beforeend', youtubeVideo);
        }

        if (redditData.data.children[i]) {
            redditPost = `
                <iframe class="border" id="reddit-embed" src="https://www.redditmedia.com${redditData.data.children[i].data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true" sandbox="allow-presentation allow-scripts allow-same-origin allow-popups" style="border: none;" 
                height="315" scrolling="no"></iframe>
            `
            results.insertAdjacentHTML('beforeend', redditPost);
        }

        if (tiktokData.collector[i]) {
            tiktokVideo = `
            <iframe id="tiktok-embed" name="__tt_embed__v54746331796788450" src="https://www.tiktok.com/embed/v2/${tiktokData.collector[i].id}?lang=en-US" style="height: 711px; 
            visibility: unset; max-height: 711px;"></iframe>
        `
            results.insertAdjacentHTML('beforeend', tiktokVideo);
        }
        
        i++;

        if (i < 2) {
            displayMedia();
        }
    }, 5000)
}

displayMedia();