package com.sitedata.backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.sitedata.backend.entity.CustomerDetails;
import com.sitedata.backend.repository.CustomerDetailsRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfExportService {

    private final CustomerDetailsRepository repository;

    public PdfExportService(CustomerDetailsRepository repository) {
        this.repository = repository;
    }

    public ByteArrayInputStream exportCustomers() {

        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            Paragraph title = new Paragraph("Customer Report", headFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(8);

            table.setWidthPercentage(100);

            table.addCell("ID");
            table.addCell("First Name");
            table.addCell("Last Name");
            table.addCell("Mobile");
            table.addCell("City");
            table.addCell("Architect");
            table.addCell("Stage");
            table.addCell("Source");

            List<CustomerDetails> customers = repository.findAll();

            for (CustomerDetails c : customers) {

                table.addCell(String.valueOf(c.getId()));
                table.addCell(c.getFirstName());
                table.addCell(c.getLastName());
                table.addCell(c.getMobile());
                table.addCell(c.getCity());
                table.addCell(String.valueOf(c.getArchitectName()));
                table.addCell(String.valueOf(c.getSiteStage()));
                table.addCell(String.valueOf(c.getSource()));

            }

            document.add(table);

            document.close();

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}