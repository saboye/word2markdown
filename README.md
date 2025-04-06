# Markdown Generator

A simple web application that converts uploaded Word documents (.docx) to Markdown text.
[Live Demo](https://saboye.github.io/word2markdown/)

**Features**

- Upload a Word document (docx) to convert its contents to Markdown.
- View the converted Markdown content in real time.
- Download the original Markdown text as a Markdown file (README.md).

**Technical Details**

- Built using JavaScript, HTML, and CSS.
- Utilizes the Mammoth library for converting Office documents (.docx, .xlsx, etc.) to various formats, including Markdown.

**How it Works**

1.  Upload a Word document by selecting it from your local machine into the input field.
2.  The application will convert the uploaded Word content to Markdown in real time, displaying it below the upload input.
3.  If no content is converted (e.g., an empty file), a message will be displayed indicating that no content could be converted to Markdown.
4.  To download the original Markdown text as a README.md file, click the "Download" button.

**Troubleshooting**

- Make sure you have a Word document (.docx) uploaded before expecting it to convert correctly.

**Credits**
This project utilizes the following libraries:

- Mammoth: A JavaScript library for converting Markdown to HTML.
- TurndownService: A JavaScript library for parsing HTML output and converting it back to Markdown.
