package com.sitedata.backend.service;

import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.repository.CustomerDetailsRepository;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExcelExportService {

    private final CustomerDetailsRepository repository;

    public ExcelExportService(CustomerDetailsRepository repository) {
        this.repository = repository;
    }

    public ByteArrayInputStream exportCustomers() {

        try {

            List<CustomerDetails> customers = repository.findAll();

            Workbook workbook = new XSSFWorkbook();

            Sheet sheet = workbook.createSheet("Customers");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("ID");
            header.createCell(1).setCellValue("First Name");
            header.createCell(2).setCellValue("Last Name");
            header.createCell(3).setCellValue("Mobile");
            header.createCell(4).setCellValue("City");
            header.createCell(5).setCellValue("Architect");
            header.createCell(6).setCellValue("Site Stage");
            header.createCell(7).setCellValue("Source");
            header.createCell(8).setCellValue("Location Link");
            header.createCell(9).setCellValue("Image 1");
            header.createCell(10).setCellValue("Image 2");
            header.createCell(11).setCellValue("Image 3");
            header.createCell(12).setCellValue("Image 4");
            header.createCell(13).setCellValue("Image 5");

            int rowNumber = 1;

            for (CustomerDetails customer : customers) {

                Row row = sheet.createRow(rowNumber++);

                row.createCell(0).setCellValue(customer.getId());

                row.createCell(1).setCellValue(customer.getFirstName());

                row.createCell(2).setCellValue(customer.getLastName());

                row.createCell(3).setCellValue(customer.getMobile());

                row.createCell(4).setCellValue(customer.getCity());

                row.createCell(5).setCellValue(customer.getArchitectName());

                row.createCell(6).setCellValue(customer.getSiteStage());

                row.createCell(7).setCellValue(customer.getSource());

                row.createCell(8).setCellValue(customer.getLocationLink() == null ? "" : customer.getLocationLink());

                row.createCell(9).setCellValue(customer.getImage1() == null ? "" : customer.getImage1());

                row.createCell(10).setCellValue(customer.getImage2() == null ? "" : customer.getImage2());

                row.createCell(11).setCellValue(customer.getImage3() == null ? "" : customer.getImage3());

                row.createCell(12).setCellValue(customer.getImage4() == null ? "" : customer.getImage4());

                row.createCell(13).setCellValue(customer.getImage5() == null ? "" : customer.getImage5());
            }

            for (int i = 0; i <= 13; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            workbook.write(out);

            workbook.close();

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

    }

}