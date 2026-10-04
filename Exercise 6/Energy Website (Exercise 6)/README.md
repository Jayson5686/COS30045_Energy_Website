# Project Documentation

## Entry file
The entry file is located at `index.html`. This file is the main point that links to other pages.

## CSS
All CSS files are located in the `./css/` folder. At this moment, there are 2 files serving different purposes:
- `styles.css` - This file is the general style sheet used for every page. This is mainly used to standardize the the navigation menu and theme of the website.
- `tv.css` - This file is specifically used for styling additional items on the Televisions page, since it contains different items compared to the other pages such as dialogs and cards.

## JavaScript
All JavaScript files are located in the `./js/` folder. There are 2 files currently:
- `scripts.js` - These files are useful for executing scripts that need every page to execute. In this project, it is used for generating the footer year as an example. This makes it so that if we ever reach the next year, I do not have to edit my code.
- `tv.js` - This file is meant to populate the TVs and add some functionality like button dialogs. While the TVs could have been manually added in the HTML file, having it populate programtically makes it easier to add new data in the future, or link the data with another API endpoint.

## Other files
All of the images are placed under `./images/` and the data files are located in `./data/`. For organization purposes, every different type of file should have it's own file, such as JSON files being located in a JSON folder.

## Usage of Gen-AI
This project includes the usage of Gen-AI to generate content and code. The usage of Gen-AI is strictly to help generate skeleton code, making it faster to edit and configure rather than writing boilerplate code. In terms of content, Gen-AI is only used to generate placeholder content. 

In this project, Gen-AI was mostly used to generate placeholder content such as the About Us page or the Home page. Gen-AI was also used to generate an array of JavaScript objects that have TV data in it. I understand how arrays and JavaScript Objects work and am experienced in this field, and used Gen-AI to generate templates. I use it as a tool to enhance my production and have not used it to do **all** the work for me (also known as _vibe code_).