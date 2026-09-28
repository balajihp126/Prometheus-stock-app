## Prompt 1 - Understanding the architecture


### Prompt
How does node.js, typescript, and react work in the architecture of a full stack application? Explain how they work as languages as well and how they interact with each other.


### Why I asked
Front-end development is fairly new to me, as I am just getting familiar with it through my current capstone class. Because of this, I wanted to learn more about how the technologies in the tech stack interact with eachother.


## Prompt 2 - Creating a starting point


### Prompt
How should I approach development for this project spec, given I am not too familiar with typescript? Give me a starting template I can work from. In addition, provide a guide on how to install any dependencies I need.


### Why I asked
My unfamiliarity with full-stack made starting development daunting. With a starting point, this made the development and learning process much smoother.


### What I kept


ChatGPT provided a simple but professional project structure as well as dependency installation instructions. These included


```
npm create vite@latest frontend -- --template react-ts
```
for a frontend boilerplate.


and
```
npm init -y
npm install express cors
npm install -D typescript tsx @types/node @types/express @types/cors
```
for backend dependency installation


## Prompt 3 - Understanding Http requests in typescript


### Prompt
How do I make http requests to an API in typescript?


### Why I asked


While I have had simple questions regarding typescript syntax and rules answered by google, I wanted a more concrete guide for making fetch requests from AI to avoid making mistakes. This saved a lot of debugging time.


### What I kept


I kept lines of code involving making a get request through fetch, checking if the response was ok, and converting the response to json.




## Prompt 4 — Logic validation


### Prompt
Check the validity of this code. (Being the aggregation logic)


### Why I asked
I was learning how async functions and Promises work in TypeScript while
integrating the Yahoo Finance API and aggregating the data to the required format form the spec.


### What I kept
I adopted some bug fixes and error handling suggestions, such as to check if any values are null.


## Prompt 5 - Frontend development


### Prompt
With the backend working, what are some good practices and suggestions for the frontend development.


### Why I asked
Because of my unfamiliarity with front end development, I asked for suggestions on how to style the page.


### What I kept
I used a lot of its design suggestions, such as giving the page a centered container, turning the search area into a form, adding UI states, and other


### What I changed
To keep my implementation original, I manually adjusted many of ChatGPTs suggestions to make the page more to my style.


## Prompt 5 - ReChart for stock line graph


### Prompt
How can I use ReCharts to make a line graph in React?


### Why I asked
I wanted to receive a template for a chart that I could work from. This would accelerate the development process and decrease the time I spent searching through documentation.


### What I kept
I adapted a template provided by ChatGPT.


### What I changed
I manually configured several of the charts parameters so it was compatible with the data and stylized


## Prompt 6 - README instructions


### Prompt
Create an initial README template I can work from


### Why I asked
This would decrease the time spent creating instructions which would be more easily adapted from what ChatGPT already provided me.

## Manual changes and decisions made

* I chose to work with React + Typescript due to my CS capstone class I am currently enrolled in. In the project for this class, I elected to do frontend development to learn this technologies better. This technical assesment provided for another route to gain experience in these technologies.
* I decided to have both a chart and graph to make the application both visually appealing, and functional. While just the table conveys the needed information, a visual aid makes the app seem more professional and polished.
* I decided to reverse the chronological order of the dates in the table for easier intuition. 
* I realized there might be some complexity when it came to timezone, since the data was aggregated by the day. I decided to use EST since the US stock market is based on New York time. 
