package com.sitedata.backend.controller;

import com.sitedata.backend.service.ExcelExportService;
import com.sitedata.backend.service.PdfExportService;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/export")
@CrossOrigin(origins = "http://localhost:5173")
public class ExportController {

    private final ExcelExportService excelExportService;
    private final PdfExportService pdfExportService;

    public ExportController(
            ExcelExportService excelExportService,
            PdfExportService pdfExportService
    ) {

        this.excelExportService = excelExportService;
        this.pdfExportService = pdfExportService;

    }

    // ==========================
    // Export Excel
    // ==========================

    @GetMapping("/excel")
    public ResponseEntity<InputStreamResource> exportExcel() {

        String filename = "customers.xlsx";

        InputStreamResource file = new InputStreamResource(
                excelExportService.exportCustomers()
        );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + filename
                )

                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )

                .body(file);

    }

    // ==========================
    // Export PDF
    // ==========================

    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> exportPdf() {

        String filename = "customers.pdf";

        InputStreamResource file = new InputStreamResource(
                pdfExportService.exportCustomers()
        );

        return ResponseEntity.ok()

                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + filename
                )

                .contentType(MediaType.APPLICATION_PDF)

                .body(file);

    }

}