# 0.6: New note in Single page app diagram

Create a diagram depicting the situation where the user creates a new note using the single-page version of the app.

```mermaid
---
title: '0.6: New Note in Single Page App Diagram'
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
