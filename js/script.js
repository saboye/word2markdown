// Wait for the DOM to be fully loaded before running any JavaScript code.
document.addEventListener("DOMContentLoaded", function () {
  // Get references to HTML elements by their IDs.
  const uploadInput = document.getElementById("upload"); // File input element
  const output = document.getElementById("output"); // Pre element to display converted Markdown text
  const downloadBtn = document.getElementById("downloadBtn"); // Download button element

  // Initialize a variable to store the converted Markdown text.
  let markdownText = "";

  // Event listener for when a file is selected in the upload input field.
  uploadInput.addEventListener("change", function (event) {
    // Get the selected file from the event target.
    const file = event.target.files[0];

    // Check if a file was actually selected. If not, exit early.
    if (!file) return;

    // Create a new FileReader object to read the contents of the file as an array buffer.
    const reader = new FileReader();

    // Event listener for when the file has been successfully read into memory.
    reader.onload = async function (e) {
      // Get the contents of the file as an array buffer.
      const arrayBuffer = e.target.result;

      try {
        // Convert the Word document to HTML using Mammoth library.
        const result = await mammoth.convertToHtml({ arrayBuffer });

        // Create a new TurndownService object to convert the HTML content to Markdown text.
        const turndownService = new TurndownService();

        // Perform the conversion and store the resulting Markdown text in the markdownText variable.
        markdownText = turndownService.turndown(result.value);

        // Check if any Markdown text was generated. If not, display a warning message.
        if (markdownText.trim().length > 0) {
          // Display the converted Markdown text in the output pre element.
          output.textContent = markdownText;

          // Show the download button only when there is something to download.
          downloadBtn.style.display = "inline-block";
        } else {
          // If no Markdown text was generated, display a warning message instead.
          output.textContent = "⚠️ No content could be converted to Markdown.";
        }
      } catch (error) {
        // Catch any errors that occurred during the conversion process and log them to the console.
        console.error("Error during conversion:", error);

        // Display an error message in the output pre element if a problem was encountered.
        output.textContent = "❌ An error occurred while processing the file.";
      }
    };

    // Start reading the selected file into memory using the FileReader object.
    reader.readAsArrayBuffer(file);
  });

  // Event listener for when the download button is clicked.
  downloadBtn.addEventListener("click", function () {
    // Check if any Markdown text was generated. If not, exit early.
    if (!markdownText) return;

    // Create a new Blob object containing the Markdown text and specify its MIME type as "text/markdown".
    const blob = new Blob([markdownText], { type: "text/markdown" });

    // Create a URL for the blob using URL.createObjectURL() so it can be used in an <a> tag.
    const url = URL.createObjectURL(blob);

    // Create a new <a> element to download the Markdown text as a file named "README.md".
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";

    // Simulate clicking on the <a> element to trigger the download.
    a.click();

    // Revoke the URL created earlier using URL.revokeObjectURL() so it doesn't leak memory.
    URL.revokeObjectURL(url);
  });
});
