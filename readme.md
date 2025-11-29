# Deep Dive Into Modern Web Development

Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

- <https://fullstackopen.com/en/>

## How to Study

- Do the exercises. The exercises are submitted through GitHub and marking them as done on the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen)
  - The course certificate will be available in the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).
- If you want to get University of Helsinki credits
  - Enroll in the course. You will get the enrollment link through the submission system once you have completed enough exercises. Read more [here](https://fullstackopen.com/en/part0/general_info#submitting-exercises).
  - Save your student number. After course enrollment, save your University of Helsinki student ID number in the submission system.
  - Do the online exam in the submission system. Read more [here](https://fullstackopen.com/en/part0/general_info#the-course-exam).
  - Mark the course completed in the submission system. Read more [here](https://fullstackopen.com/en/part0/general_info#how-to-get-your-credits).
- Submitting exercises

  - The exercises are submitted through GitHub and marked as done on the "my submissions" tab of the [submission application](https://studies.cs.helsinki.fi/stats/courses/fullstackopen).
  - If you are submitting exercises from different parts to the same repository, use an appropriate system for naming your directories. You can of course create a new repository for each part. If you are using a private repository, add `mluukkai` as a collaborator.
  - Exercises are submitted **one part at a time**. You will mark the number of exercises you have completed from that module. Once you have submitted exercises for a part, you can no longer submit any more exercises for that part.
  - One good way to name the directories in your submission repository is as follows:

  ```
  part0
  part1
    courseinfo
    unicafe
    anecdotes
  part2
    courseinfo
    phonebook
    countries
  ```

  - A system for detecting plagiarism is used to check exercises submitted to GitHub. If code is found from model answers or multiple students hand in the same code, the situation is handled according to the policy on plagiarism of the University of Helsinki.
  - Many of the exercises build a larger application bit by bit. In these cases, submitting only the completed application is enough. You can make a commit after each exercise, but that is not compulsory.

- The course exam
  - For the official university credits, you need to pass the course exam that covers parts 1-5 of the course.
  - If you fail the exam, it can be done again after one week.
  - You may continue with submissions after the exam.
  - The exam is done in the exercise submission system. Follow the instructions below to complete the exam.
  - Enroll in the course through Open University.
  - You will get the enrollment link through the [submission system](https://studies.cs.helsinki.fi/stats/courses/fullstackopen/submissions) once you have completed enough exercises.
  - You will have 120 minutes to complete the exam. If you fail, you must wait for one week for trying the exam again.
  - If you passed the exam, and you are not going to complete more exercises, you can go back to the "my submissions" tab and ask for the credits.
  - If you are not a student at the University of Helsinki, you can get a student number by registering for the course through [Open University](https://fullstackopen.com/en/part0/general_info#the-course-exam), see [this](https://fullstackopen.com/en/part0/general_info#where-do-i-get-my-university-of-helsinki-student-number) for more information.
  - Note also that you do not need to enroll in Open University to get the course certificate!
- Course certificate
  - Even if you do not register to Open University for the exam and the credits, you can still download the course certificate from the "My submissions" tab in the submission system once you have completed enough exercises for a passing grade.
  - There is one certificate for the base parts (0-7) of the course and after that a separate certificate for each course part.
- Full stack project

  - A full stack project worth 5, 7 or 10 credits will be available through Open University.
  - For the project, an application is implemented in React and/or Node, though implementing a mobile application in React Native is also possible.
  - The number of credits is based on hours of work done. One credit is approximately 17.5 hours of work. The work is graded pass/fail.
  - It is possible to complete the project as a pair or a group.
  - See [more information on the project](https://github.com/fullstack-hy2020/misc/blob/master/project.md).

  ## Part 0: Fundamentals of Web apps

  - <https://fullstackopen.com/en/part0/fundamentals_of_web_apps>

Opening the [example application](https://studies.cs.helsinki.fi/exampleapp/) in the browser, with Chrome DevTos openned at the "Network" tab, we initially see the headers sent by the server for the main HTML page:

- **Request Method: GET** - The browser requested using the `GET` method
- **Status Code: 200 OK** - The request was successful
- **Content Length: 321** - The size of the response body in bytes
- **Content Type: text/html; charset=utf-8** - The media type of the response body and character encoding. The browser knows the response to be a regular HTML page.

The main HTML page also references an image file. Because of the `<img />` tag, the browser does a second HTTP request to fetch the image _kuva.png_ from the server. The details of the request are as follows:

- **Request Method**: GET
- **Status Code**: 200 OK
- **Content Length**: 89350
- **Content Type**: image/png
