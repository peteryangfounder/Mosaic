// Declare variables to store parsed data from each platform
let youtubeData, redditData, tiktokData;

// Array storing string data from each platform
const stringData = Array.from(document.querySelectorAll('.string-data')).map(element => element.value);

// Initialize empty array to push parsed data to
let parsedData = [];

// Loop through stringData array
for (dataSet of stringData) {
    // If element is string data (not empty string)
    if (dataSet) {
        // Parse the data and output the parsed data to the console
        dataSet = JSON.parse(dataSet);
        console.log(dataSet);
    }
    // Push element to parsedData array
    parsedData.push(dataSet);
}

// Destructure parsedData array into individual variables
[youtubeData, redditData, tiktokData] = parsedData;

// Select results section, where content will be inserted into
const results = document.querySelector('#results');

// If user checked off one or more social media platforms, then content can be displayed
if (youtubeData || redditData || tiktokData) {

    // Variables to store embed HTML
    let youtubeVideo, redditPost, tiktokVideo;

    // Show loading spinner
    const spinner = document.querySelector('.spinner-border');
    spinner.style.visibility = 'visible';

    const maxPostsPerPlatform = document.querySelector('select').value;
    let i = 0;

    function displayMedia() {
        // Description: Loads in content in 5-second intervals

        setTimeout(() => {
            // Hide loading spinner
            if (spinner.style.visibility = 'visible')
                spinner.style.visibility = 'hidden';

            // If there is a YouTube video at index i...
            if (youtubeData && youtubeData.items[i]) {
                let videoId;

                // Video ID for normal search queries
                if (typeof youtubeData.items[i].id === 'object')
                    videoId = youtubeData.items[i].id.videoId;

                // Video ID when $ is search query
                else
                    videoId = youtubeData.items[i].id;

                // Construct YouTube video embed
                youtubeVideo = `
                    <iframe height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                `

                // Insert embed into results section of page
                results.insertAdjacentHTML('beforeend', youtubeVideo);
            }

            // If there is a Reddit post at index i...
            if (redditData && redditData.data.children[i]) {
                // Construct Reddit post embed
                redditPost = `
                    <iframe class="border" src="https://www.redditmedia.com${redditData.data.children[i].data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true" 
                    sandbox="allow-presentation allow-scripts allow-same-origin allow-popups" style="border: none;" height="315" scrolling="no"></iframe>
                `

                // Insert embed into results section of page
                results.insertAdjacentHTML('beforeend', redditPost);
            }

            // If there is a Tiktok video at index i...
            if (tiktokData && tiktokData.collector[i]) {
                // Construct Tiktok video embed
                tiktokVideo = `
                <blockquote class="tiktok-embed" cite="${tiktokData.collector[i].webVideoUrl}" data-video-id="${tiktokData.collector[i].id}" style="max-width: 605px;min-width: 325px;">
                    <section></section>
                </blockquote>
                <script async src="https://www.tiktok.com/embed.js"></script>`

                // console.log(`url: ${tiktokData.collector[i].webVideoUrl}\nid: ${tiktokData.collector[i].id}`);

                // Insert embed into results section of page
                results.insertAdjacentHTML('beforeend', tiktokVideo);
            }

            // Increment counter
            i++;

            // Call function again!
            if (i < maxPostsPerPlatform)
                displayMedia();

        }, 0)
    }

    // Call displayMedia function for the first time
    displayMedia();

} else {
    // User did not check off any social media platforms, so no content can be displayed
    results.innerHTML = '<p>Select one or more social media platforms to see results.</p>';
}