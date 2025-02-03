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
        { content: "LabCode", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Faculty", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Start Time", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "End Time", styles: { fillColor: [0, 0, 0], textColor: 255 } },
        { content: "Purpose", styles: { fillColor: [0, 0, 0], textColor: 255 } },
    ];

    const tableRows = schedule?.details?.map((row) => [
        row.class || "N/A",
        row.labInfo?.labName || "N/A",
        row.labInfo?.labCode || "N/A",
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




import * as XLSX from 'xlsx';

export const exportInventoryToExcel =  (data, fileName = 'inventory_records.xlsx') => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid data provided');
      return;
    }
  
    // Define column headers
    const headers = [
      'labName', 'labCode', 'resourceType', 'code', 
      'brand', 'processor', 'ram', 'hardDisk', 
      'softwareName', 'version'
    ];
    
    // Convert array of objects to worksheet format
    const worksheetData = [
      headers, 
      ...data.map(obj => [
        obj.labId?.labName || 'N/A', 
        obj.labId?.labCode || 'N/A', 
        obj.resourceType || 'N/A', 
        obj.code || 'N/A',
        obj.resourceType === 'computer' ? obj.brand || 'N/A' : 'N/A',
        obj.resourceType === 'computer' ? obj.processor || 'N/A' : 'N/A',
        obj.resourceType === 'computer' ? obj.ram || 'N/A' : 'N/A',
        obj.resourceType === 'computer' ? obj.hardDisk || 'N/A' : 'N/A',
        obj.resourceType === 'software' ? obj.softwareName || 'N/A' : 'N/A',
        obj.resourceType === 'software' ? obj.version || 'N/A' : 'N/A'
      ])
    ];
    
    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Write file and trigger download
    XLSX.writeFile(workbook, fileName);
  };



export const exportStudentsToExcel = (students, fileName = 'students_records.xlsx') => {
  if (!Array.isArray(students) || students.length === 0) {
    console.error('Invalid student data provided');
    return;
  }

  const headers = ['Name', 'Roll Number', 'Block', 'Role', 'Access', 'Batch', 'Email',];

  const worksheetData = [
    headers,
    ...students.map(student => [
      student.name || 'N/A',
      student.rollNumber || 'N/A',
      student.block || 'N/A',
      student.role || 'N/A',
      student.access ? 'Yes' : 'No',
      student.batch || 'N/A',
      student.email || 'N/A',
     ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

  XLSX.writeFile(workbook, fileName);
};

