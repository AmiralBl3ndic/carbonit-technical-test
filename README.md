# Carbon-IT technical test

This project was interesting to work on and I encountered a lot more troubles setting up my development environment than what I would have thought.

## Approach

In the beginning, I used a TDD approach and wrote a lot of tests before I even started to write any actual code. This allowed me to easily develop the
parsing methods after and enabled better code quality.

At first the code was quite messy though, mainly because I fixed everything in place when something was not working properly. A bit of refactorization
and now the code is more readable.

Most of the code should be self-explanatory but for the portions that my not be clear, I added a few comments to help out.

In the end I wanted to finish the project in much less time (TDD took me hours which I realize I should have spent on developing the actual code), so I
skipped writing tests. This is a future improvement that could be added to this project.

## Stack

- Language: **NodeJS** with **Typescript**
  - Development dependencies are mainly additional types to help the editor's Intellisense
  - One single non-development dependency to map custom import paths to correct modules when building project
- Test harness: **Jest**

## Observations & Potential Improvements

This project took a lot more lines of code than I thought and while I was developing it I found myself often struggling with TypeScript configuration. On such a project I think that using Kotlin may have been a better fit and maybe I will try to do so.

This was my first time actually writing unit tests in the context of a project with TDD, this was an interesting and challenging experience.

A lot more tests could be added but I wanted to finish the project on time and had to do a tradeoff on testing to focus more on developing the required features.
