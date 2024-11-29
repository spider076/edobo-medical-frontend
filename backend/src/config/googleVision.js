const {
  DocumentProcessorServiceClient
} = require("@google-cloud/documentai").v1;
const fs = require("fs").promises;

const projectId = process.env.GOOGLE_PROJECTID;
const location = "us";
const processorId = process.env.GOOGLE_PROCESSORID;

function getText(textAnchor, text) {
  if (!textAnchor.textSegments || textAnchor.textSegments.length === 0) {
    return "";
  }
  const startIndex = textAnchor.textSegments[0].startIndex || 0;
  const endIndex = textAnchor.textSegments[0].endIndex;

  if (startIndex !== undefined && endIndex !== undefined) {
    return text.substring(startIndex, endIndex).replace(/\n/g, " "); // Remove all \n
  } else {
    console.warn("Warning: Invalid text anchor. Returning an empty string.");
    return "";
  }
}

const googleVision = async ({ filePath }) => {
  try {
    const client = new DocumentProcessorServiceClient();
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

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

    const { document: documentText } = response;
    const { pages } = documentText;

    let prescribedMedicinesData = [];

    for (const page of pages) {
      if (page.tables && page.tables.length > 0) {
        for (const table of page.tables) {
          const headerRow = table.headerRows[0]; 
          const headerCells = headerRow.cells.map(cell =>
            getText(cell.layout.textAnchor, documentText.text)
          );

          
          const prescribedMedicinesIndex = headerCells.findIndex(
            header => header.trim().toLowerCase() === "prescribed medicines"
          );

          if (prescribedMedicinesIndex === -1) {
            console.warn(`No "Prescribed Medicines" column found on page ${page.pageNumber}`);
            continue;
          }

         
          table.bodyRows.forEach((bodyRow, rowIndex) => {
            if ((rowIndex + 1) % 2 !== 0) {
              const bodyCells = bodyRow.cells.map(cell =>
                getText(cell.layout.textAnchor, documentText.text)
              );
              if (bodyCells[prescribedMedicinesIndex]) {
                prescribedMedicinesData.push(bodyCells[prescribedMedicinesIndex]);
              }
            }
          });
        }
      }
    }

    console.log("Prescribed Medicines Data (Odd Rows Only):", prescribedMedicinesData);
    return { data: prescribedMedicinesData, error: null };
  } catch (err) {
    console.error("error:", err);
    return { data: null, error: err.message };
  }
};

module.exports = googleVision;
