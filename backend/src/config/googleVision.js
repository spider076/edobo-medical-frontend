const {
  DocumentProcessorServiceClient
} = require("@google-cloud/documentai").v1;
const fs = require("fs").promises;

const projectId = process.env.GOOGLE_PROJECTID;
const location = "us";
const processorId = process.env.GOOGLE_PROCESSORID;

// Helper function to extract text from a text anchor
// function getText(textAnchor, text) {
//   if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
//     // Return an empty string if no text segments are found
//     return "";
//   }

//   // First shard in document doesn't have startIndex property
//   const startIndex = textAnchor.textSegments[0].startIndex || 0;
//   const endIndex = textAnchor.textSegments[0].endIndex;

//   // Check if the text is valid before returning
//   if (startIndex !== undefined && endIndex !== undefined) {
//     return text.substring(startIndex, endIndex);
//   } else {
//     console.warn("Warning: Invalid text anchor. Returning an empty string.");
//     return "";
//   }
// }

const googleVision = async ({ filePath }) => {
  try {
    const client = new DocumentProcessorServiceClient();
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    // Read the file using promises
    const document = await fs.readFile(filePath);

    const request = {
      name,
      skipHumanReview: true,
      rawDocument: {
        content: document,
        mimeType: "application/pdf"
      }
    };

    const [response] = await client.processDocument(request);

    const { document: asdf } = response;
    const { pages } = asdf;

    for (const page of pages) {
      console.log(`\n\n**** Page ${page.pageNumber} ****`);

      console.log(`Found ${page.tables.length} table(s):`);
      for (const table of page.tables) {
        console.log("table : ", table);

        console.log("bodyrow 1 : ", table.bodyRows[0].cells[0].layout.textAnchor.textSegments);

        const numColumns = table.headerRows[0].cells.length;
        const numRows = table.bodyRows.length;
        console.log(`Table with ${numColumns} columns and ${numRows} rows:`);

        // // Print header row
        // let headerRowText = "";
        // for (const headerCell of table.headerRows[0].cells) {
        //   const headerCellText = getText(
        //     headerCell.layout.textAnchor,
        //     document.text
        //   );
        //   if (headerCellText !== undefined) {
        //     headerRowText += `${JSON.stringify(headerCellText.trim())} | `;
        //   } else {
        //     console.warn("Warning: Header cell text is undefined.");
        //   }
        // }

        // // Check if headerRowText is defined before calling substring
        // if (headerRowText !== undefined) {
        //   console.log(
        //     `Columns: ${headerRowText.substring(0, headerRowText.length - 3)}`
        //   );
        // } else {
        //   console.warn("Warning: Header row text is undefined.");
        // }

        // Print body rows
        // ... (Your existing code for printing body rows)
      }
    }

    return { text: response.document.text, error: null };
  } catch (err) {
    console.error("error:", err);
    return { text: null, error: err.message };
  }
};

module.exports = googleVision;
