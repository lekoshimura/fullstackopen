# 0.5: Single page app diagram

Create a diagram depicting the situation where the user goes to the [single-page app](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#single-page-app) version of the notes app at <https://studies.cs.helsinki.fi/exampleapp/spa>.

```mermaid
---
config:
  theme: redux-color
  look: classic
title: '0.5: Single Page App Diagram'
---
sequenceDiagram
  actor User
  participant browser
  participant server

  User ->> browser: type and<br />submit a note
  browser ->> browser: form.onsubmit()
  activate browser
  browser ->> browser: notes.push()
  browser ->> browser: redrawNotes()
  browser ->> browser: sendToServer()
  browser ->> server: POST /exampleapp/new_note_spa
  server -->> browser: Status Code 201 Created
  deactivate browser
```
