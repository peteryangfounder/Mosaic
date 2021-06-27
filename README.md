# Mosaic — External Documentation
*A web application for browsing YouTube, Reddit, and TikTok all at the same time, with the ability to query for content by keyword.*

## The Pitch
People love browsing social media, but if you think about it, the search queries can be quite similar. Want to watch cat videos? You could search *cats* on YouTube—but Reddit would probably work too. Maybe you're looking for prank videos. YouTube, Reddit, and TikTok would all perfectly suit your needs. 

So, why not have a web application that provides one search bar, and when you make a query, it populates relevant content from *multiple* social media sources at once? The user, then, can indulge themselves in getting all the cat videos the internet has to offer, not just a single platform! 

In essence, Mosaic is a web application that helps people waste time more efficiently.

## Technical Overview
Mosaic leverages a popular and familiar web development tech stack, including HTML, CSS, JavaScript/Node.js, MongoDB, and Heroku. A host of NPM packages were used and can be broken down into Dependencies and Dev Dependencies:

#### Dependencies
```ejs``` ```express``` ```mongoose``` ```node-fetch``` ```random-words``` ```tiktok-scraper```

#### Dev Dependencies
```dotenv``` ```nodemon```

On the frontend, the following libraries were employed: Bootstrap 5, Google Fonts, jQuery. Finally, the YouTube Data API, Reddit API, and TikTok API were all used in order to fetch content by making ```GET``` requests to the relevant endpoints, deserializing the returned data, and handpicking certain properties to be injected into HTML embeds. 

It should be noted that only the YouTube Data API required authorization through the registration of a secure API key. The Reddit API endpoints could be accessed without provision of credentials, and the TikTok API was interfaced with indirectly via a third-party scraper.

## The Journey: From Initial Idea to Final Product
In order to organize the development workflow, the final project was broken down into Units 11–16. In each unit, a certain milestone was achieved, and results were demonstrated with an end product. The upshot of dividing the project into these units was that they would accumulate to form a final product by the end of Unit 16—namely, the Mosaic application! The work accomplished in each unit is described below.

### Unit 11: Project Overview
The goal with Unit 11 was to devise a plan for project completion. It served to map out, in advance, what each unit would be used for and what product could be demonstrated at the end of each unit.

#### Demonstrated Products:
* [Planning Document](https://github.com/peteryangfounder/Mosaic/blob/main/Unit%2011%20Project%20Planning.pdf)

### Unit 12: Brushing Up
The goal with Unit 12 was to brush up on web development concepts—in preparation for the hefty work ahead—by developing a to-do list mini project, which would interact with a MongoDB database and involve deployment to Heroku.

#### Demonstrated Products:
* [Screenshot of Course Module Completion](https://github.com/peteryangfounder/Mosaic/blob/main/Screenshot%20of%20Course%20Module%20Completion.png)
* [Completed Project](https://mysterious-woodland-97111.herokuapp.com/)
* [Video Walkthrough](https://www.loom.com/share/083e26c05e4040c98397f5b181230318)

### Unit 13: Experimenting with APIs
The goal with Unit 13 was to test the YouTube, Reddit, and TikTok APIs by developing a watered down version of Mosaic. The envisioned application would be able to query for content by keyword, output the returned data to the console, and visually display the content to the user.

#### Demonstrated Products:
* [Completed Project](https://blooming-wave-19232.herokuapp.com/)
* [Video Walkthrough](https://www.loom.com/share/0d8c34608c924417a7d43b2756fbba2a)

### Unit 14: Designing with Figma
The goal with Unit 14 was to design a high-fidelity mockup for Mosaic prior to implementing it with code. This way, the entire user interface could be laid out in advance, smoothening the development workflow.

#### Demonstrated Products:
* [Figma File](https://www.figma.com/file/0IXYGYOIt1iB0TKRptHGUe/ICS4U-Final-Project-Mosaic?node-id=0%3A1)
* [Video Walkthrough](https://www.loom.com/share/27b019002b0f47c0913abdb211197005)

### Unit 15: Software Development Process
The goal with Unit 15 was to write up the Software Development Process (SWDP) document corresponding to the final project. This document would serve to gain a deeper insight into the project by distilling it into 6 distinct stages: Problem Definition, Analysis, Design, Implementation (left out for now), Testing/Verification, Maintenance.

#### Demonstrated Products:
* [SWDP](https://github.com/peteryangfounder/Mosaic/blob/main/Mosaic%20-%20SWDP.pdf)

### Unit 16: Software Development Process—but Actually Developing the Software
The goal with Unit 16 was to implement the final project, link it up to GitHub, connect it to a cloud database, deploy it to Heroku, and perform any testing necessary to ensure a robust solution. The envisioned application would be able to:
* Adapt to varying screen sizes (mobile responsiveness)
* Fetch data from the YouTube, Reddit, and TikTok APIs
* Filter the social media platforms
* Customize the max posts per platform
* Display the content in 5-second intervals
* Randomize the user's feed if they enter the * (wild card) command
* Populate trending content if the user enters the $ command

Here, too, external documentation could be added to the GitHub repository—look at what you're reading!

#### Demonstrated Products:
* [Mosaic Completed Project](https://protected-cove-21401.herokuapp.com/)

## Limitations/Challenges
Overall, the project was a great success! All of the envisioned features were implemented, and better yet, implemented with *style*. However, there was one major limitation/challenge that constantly arose during the development process (and which can be seen in the final application). That is: Mosaic relies on a third-party Tiktok scraper in order to fetch content, as the official TikTok API is too limited to achieve many of Mosaic's lofty goals. Since the scraper is managed by third-party developers and not the TikTok team, it has satisfactory but not solid reliability (it also causes a plethora of warnings to appear in the console). For example, some of the functions used to fetch content will, on occasion, stop working for no apparent reason. Specifically, they will continue to return an object from the server, but the collector array will be empty when data is to be expected. During the bulk of the development process, Mosaic used the ```TikTokScraper.hashtag``` function to fetch data based on a particular hashtag, such as #trending. However, at the point of deployment, this function spontaneously stopped working, and so the subordinate ```TikTokScraper.user``` function was resorted too instead. This means that, when a user types in a search query, Mosaic will try to find TikTok content that matches a username rather than a hastag, which is less than ideal.

Another hiccup that appeared during development was that, since localhost is not a secure connection (by nature), the localhost version of Mosaic throws cookie-related errors in the console; however, these errors do not affect the behaviour of the application and disappear in the secure Heroku version.

## Next Steps
Due to time constraints, certain compromises were made. It would have been fun to add even more social media platforms to the list, such as Instagram and Twitter. The main reason these platforms were not included was because of a more time-consuming registration/application/review process in order to gain access to the APIs. Conversely, the YouTube Data API only required a simple API key, and the Reddit and TikTok APIs required no authorization at all, making them ideal for this time-sensitive project.

Another bothersome quirk is that Mosaic will refresh its page whenever a search query is submitted. In order to prevent this behaviour, and therefore improve the user experience, AJAX would have to be employed. Unfortunately, the developer working on this project (ahem, the author) was not well-versed in AJAX and said, "Screw it."

A final suggestion for Mosaic would be incorporating user accounts so individual users can save their own settings, as opposed to the same settings being applied no matter who visits the website. This can be achieved relatively painlessly with MongoDB/Mongoose; however, due to time constraints, this feature was not ultimately implemented.

Oh, and also, the querying speed could be faster...

## Setup: How to Get Mosaic Up and Running
Ideally, you would use the app by visiting the Heroku link provided above. But, if for whatever reason you want to run a local version (weirdo!), follow the instructions below. 

**Note**: These instructions presume you already have NodeJS/npm/Git/MongoDB set up on your computer.

1. Clone the project by typing ```git clone https://github.com/peteryangfounder/Mosaic.git``` in your terminal
2. ```cd``` into the project directory
3. Install the relevant NPM packages by typing ```npm i```
4. Create a ```.env``` file in the project directory and add the following lines of code:
```
API_KEY=[YOUR SECRET YOUTUBE API KEY. Go to https://developers.google.com/youtube/v3/getting-started to obtain one.]
DATABASE_URL=mongodb://localhost:27017/mosaicDB
```
5. Start up the server by typing ```node server.js``` or ```nodemon server.js```
6. Open up a web browser (preferably Google Chrome) and visit ```http://localhost:3000/```
7. Tada! You can begin playing around with the application and wasting time more efficiently ;)
<br>
—Peter Yang, June 26, 2021
