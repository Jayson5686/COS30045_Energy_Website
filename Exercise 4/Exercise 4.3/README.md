# Exercise 4.3

### Gen-AI Declaration
The use of Gen-AI was implemented for this exercise to help create the sliders to move between different excerises. The final code used was modified and I have understood all the functions and parameters of the code provided. The following prompt was used to help me create the navigation sliders:
Okay so this is my css for my navigation bar:

```
.esvg-btn-container {
    margin: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
}

.esvg-btn-bg {
    margin: auto;
    background-color: var(--color-accent);
    display: flex;
    justify-content: space-between;
    border-radius: 20px;
    gap: 20px;
    padding: 10px 15px;
    height: fit-content;
    position: relative;
    cursor: pointer;
}

.esvg-btn {
    z-index: 2;
    cursor: pointer;
}

div.placement {
    position: absolute;
    top: 4px;
    left: 5px;
    width: calc(50% - 5px);
    height: calc(100% - 8px);
    background-color: yellow; /* The color of the "selected" area */
    border-radius: 20px;
    transition: transform 0.3s ease-in-out;
    z-index: 1;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    cursor: pointer;
}
```

This is the corresponding html: 
```
<div class="esvg-btn-container">
            <div class="esvg-btn-bg">
                <div class="placement"></div>
                <div class="esvg-btn" onclick="storyClick(1)">Exercise 4.1 & 4.2</div>
                <div class="esvg-btn" onclick="storyClick(2)">Exercise 4.3</div>
            </div>
        </div>
```

Unfortunately, since the text is not uniform accross the different sections, the current yellow background is not properly aligned to fit the whole text section.