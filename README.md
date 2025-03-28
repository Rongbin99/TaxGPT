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

Access the project via [http://localhost:3000](http://localhost:3000)

## Future Improvements

The UI of the tax assistant could be enhanced with customizable themes by allowing users to apply their own stylesheets. Additionally, a minor but useful improvement would be ensuring that the latest chat messages remain visible at the bottom of the chatbox. Currently, messages go out of view once the box is full, but implementing simple scroll logic would keep the latest messages in view.

Given more time, I would refine the background containers for each chat message to improve readability. Assistant messages could be made more distinct and vivid, while quick response options could have a subtle glowing effect for better visibility. Additionally, the file analysis placeholder could be more engaging—perhaps featuring an animation of a magnifying glass scanning a document.

The quick response options are currently hardcoded; ideally, they should be dynamically generated by the AI for more relevant and context-aware suggestions.
