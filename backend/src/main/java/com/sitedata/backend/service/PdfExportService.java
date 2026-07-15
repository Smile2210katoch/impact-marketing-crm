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

        Document document = new Document(PageSize.A2.rotate());
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font headFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    18
            );

            Paragraph title = new Paragraph("Customer Report", headFont);
            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(14);

            table.setWidthPercentage(100);

            table.setWidths(new float[]{
                    1f,
                    2f,
                    2f,
                    2f,
                    2f,
                    2f,
                    2f,
                    2f,
                    4f,
                    4f,
                    4f,
                    4f,
                    4f,
                    4f
            });

            table.addCell("ID");
            table.addCell("First Name");
            table.addCell("Last Name");
            table.addCell("Mobile");
            table.addCell("City");
            table.addCell("Architect");
            table.addCell("Stage");
            table.addCell("Source");
            table.addCell("Location Link");
            table.addCell("Image 1");
            table.addCell("Image 2");
            table.addCell("Image 3");
            table.addCell("Image 4");
            table.addCell("Image 5");

            List<CustomerDetails> customers = repository.findAll();

            for (CustomerDetails c : customers) {

                table.addCell(String.valueOf(c.getId()));
                table.addCell(c.getFirstName());
                table.addCell(c.getLastName());
                table.addCell(c.getMobile());
                table.addCell(c.getCity());
                table.addCell(c.getArchitectName() == null ? "" : c.getArchitectName());
                table.addCell(c.getSiteStage() == null ? "" : c.getSiteStage());
                table.addCell(c.getSource() == null ? "" : c.getSource());

                table.addCell(c.getLocationLink() == null ? "" : c.getLocationLink());

                table.addCell(c.getImage1() == null ? "" : c.getImage1());
                table.addCell(c.getImage2() == null ? "" : c.getImage2());
                table.addCell(c.getImage3() == null ? "" : c.getImage3());
                table.addCell(c.getImage4() == null ? "" : c.getImage4());
                table.addCell(c.getImage5() == null ? "" : c.getImage5());

            }

            document.add(table);

            document.close();

        } catch (Exception e) {

            throw new RuntimeException(e);

        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}