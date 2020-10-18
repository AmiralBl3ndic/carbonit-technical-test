# Carbon-IT technical test

This project was interesting to work on and I encountered a lot more troubles setting up my development environment than what I would have thought.

## Instructions

To run this project you have to first install its dependencies with **Yarn** (preferably) or **npm**:

1. Open a terminal and run

For **yarn**

```shell
yarn
```

Or for **npm**

```shell
npm install
```

Wait for the package manager to finish downloading dependencies (a `node_modules` directory should appear in the root directory of the project).

2. Now the dependencies should be installed and you should be able to build the project

Since the node runtime cannot natively run Typescript code, the project includes a script to transpile all Typescript code into node-runnable Javascript code. To do so, run the following commands in the terminal:

For **Yarn**

```shell
yarn build
```

Or for **npm**

```shell
npm run build
```

Either of these commands will generate the `build` directory which contains the transpiled code.

3. Run the project

Now everything should be ready for you to run the project:

```shell
node build/ [...files to parse]
```

For example, let's say that I want to do the evaluation for the `data/valid-1.terrain` file:

```shell
node build/ data/valid-1.terrain
```

This will run the project, parse the `data/valid-1.terrain` file, run the simulation and write the result to the
`data/valid-1.terrain.result` file.

Another example: if I want to do the same for multiple terrain files I can pass them like so:

```shell
node build/ data/file1.terrain data/file2.terrain data/file3.terrain
```

_The program will parse and evaluate each of these files and write the outputs respectively to `data/file1.terrain.result`, `data/file2.terrain.result`, `data/file3.terrain.result`._

### Leads for improvement on running the project

At the moment there exists no way to specify the desired name nor path for the output file, this could be added in a future version.

Further indications regarding leads for improvement are detailed in the [Observations & Potential Improvements](#Observations-&-Potential-Improvements) section of this file.

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
- Package manager: **Yarn**
- Test harness: **Jest**

## Observations & Potential Improvements

This project took a lot more lines of code than I thought and while I was developing it I found myself often struggling with TypeScript configuration. On such a project I think that using Kotlin may have been a better fit and maybe I will try to do so.

This was my first time actually writing unit tests in the context of a project with TDD, this was an interesting and challenging experience.

A lot more tests could be added but I wanted to finish the project on time and had to do a tradeoff on testing to focus more on developing the required features.

At the moment, when the program tries to parse an invalid terrain file, it will throw an error describing why the terrain file is invalid.
In the future it could be a good idea to prevent this crashing behaviour by intercepting errors and only displaying a nice message to the user rather than the whole stacktrace.
