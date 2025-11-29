# 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the [single-page app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#single-page-app) version of the notes app at <https://studies.cs.helsinki.fi/exampleapp/spa>.

```mermaid
---
title: '0.5: Single Page App Diagram'
---
sequenceDiagram
  actor User
  participant browser
  participant server

  User ->> browser: Goes to /exampleapp/spa
  activate browser
  
  browser ->> server: GET /exampleapp/spa
  server -->> browser: Status Code 200 OK

  browser ->> server: GET /exampleapp/main.css
  server -->> browser: Status Code 200 OK

  browser ->> server: GET /exampleapp/spa.js
  server -->> browser: Status Code 200 OK

  browser ->> server: GET /exampleapp/data.json
  server -->> browser: Status Code 200 OK
  
  browser ->> browser: redrawNotes()
  
  deactivate browser
```
