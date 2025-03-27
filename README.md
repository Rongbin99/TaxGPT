# TaxGPT

## Setup and Run

To run this locally, first clone the repository:

```
git clone https://github.com/Rongbin99/TaxGPT
```

Navigate to the project root, and install the dependencies:

```
npm install
```

Insert your OpenAI API key into `.env` and run the Next.js project with:

```
npm run dev
```

Access the project via localhost:3000

## Future Improvements

The UI of the tax assistant as be extended to feature customizable themes by allowing customized stylesheets that the user could customize. Additionally, while minor, the latest chat messages should be kept within view at the bottom of the chatbox. Currently it goes out of view once the box is full however some simple scoll logic should handle that in the future, ensuring that the latest messages are within view. 

Given more time, I would have liked to better polish up the background containers of each individual chat message. Make the Assistant messages a little more vivid and noticeable, and add a fluid glow affect to the quick response chat options. Additionally, the file analysis placeholder could be more visual, which a animation of a magnifying glass looking through a file perhaps. 

The quick responses were also hardcoded, ideally they should be generated prompts from the AI, which is another thing that can be improved upon.
