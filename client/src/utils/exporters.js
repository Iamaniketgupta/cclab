import jsPDF from "jspdf";
import "jspdf-autotable";
import dayjs from "dayjs";
import bglogo from '../assets/images/bglogo.png';
export const exportToPDF = (schedule) => {
    if (!schedule) {
        alert("No schedule to export!");
        return;
    }

    const doc = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
        compress: true,  
      });
      
    // Watermark
    const watermarkImage = bglogo;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const squareSize = pageWidth / 3;

    doc.addImage(
        watermarkImage,
        "PNG",
        (pageWidth - squareSize) / 2,
        (pageHeight - squareSize) / 2,
        squareSize,
        squareSize,
        undefined,
        "FAST"
    );


    doc.setFont("helvetica", "normal");

    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text("Time Table", 40, 40);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${dayjs(schedule?.date).format("DD/MM/YYYY")}`, 40, 60);

    // Table 
    const tableHeaders = [
        { content: "Class", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Lab", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Faculty", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Start Time", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "End Time", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Purpose", styles: { fillColor: [0, 0, 0], textColor: 255 } },
    ];

    const tableRows = schedule?.details?.map((row) => [
        row.class || "N/A",
        row.labInfo?.labName || "N/A",
        row.facultyName || "N/A",
        dayjs(row.startTime).format("hh:mm A"),
        dayjs(row.endTime).format("hh:mm A"),
        row.purpose || "N/A",
    ]);

    doc.autoTable({
        startY: 80,
        head: [tableHeaders.map((header) => header.content)],
        body: tableRows,
        styles: {
            fontSize: 8,
            textColor: [0, 0, 0],
            lineColor: [200, 200, 200],
            lineWidth: 0.5,
        },
        headStyles: {
            fillColor: [0, 0, 0],
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },
        bodyStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
        margin: { top: 80 },
    });

    doc.save(`TimeTable_${dayjs(schedule?.date).format("DD_MM_YYYY")}.pdf`);
};
