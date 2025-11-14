# Excel Upload Template Format

## Required Columns for Product Import

When uploading an Excel file (.xlsx or .xls) to import products, ensure your spreadsheet has the following columns:

| Column Name   | Data Type | Example                                      | Description                          |
|---------------|-----------|----------------------------------------------|--------------------------------------|
| Company       | Text      | Godrej                                       | Manufacturer/Brand name              |
| Category      | Text      | Air Conditioners                             | Main product category                |
| Subcategory   | Text      | Split AC                                     | Product subcategory                  |
| Product Name  | Text      | Godrej 1.5 Ton 3 Star Split AC              | Full product name                    |
| Description   | Text      | Energy-efficient split AC with...            | Product description                  |
| Price         | Number    | 35000                                        | Selling price (₹)                    |
| Min Price     | Number    | 32000                                        | Minimum allowed price (₹)            |
| Incentive     | Number    | 1500                                         | Commission/Incentive (₹)             |
| Rating        | Number    | 4.5                                          | Product rating (0-5)                 |
| Stock         | Number    | 25                                           | Available stock quantity             |
| Image         | Text/URL  | https://example.com/image.jpg                | Product image URL (optional)         |

## Sample Excel Data

```
Company    | Category            | Subcategory  | Product Name                    | Description                          | Price | Min Price | Incentive | Rating | Stock | Image
-----------|---------------------|--------------|--------------------------------|--------------------------------------|-------|-----------|-----------|--------|-------|-------
Godrej     | Air Conditioners    | Split AC     | Godrej 1.5 Ton 3 Star Split AC | Energy-efficient split AC            | 35000 | 32000     | 1500      | 4.5    | 25    | https://...
Samsung    | Refrigerators       | Double Door  | Samsung 253L Double Door       | Frost-free refrigerator              | 28000 | 26000     | 1200      | 4.3    | 18    | https://...
LG         | Washing Machines    | Front Load   | LG 7Kg Front Load Washer       | Front load washing machine           | 32000 | 29500     | 1400      | 4.6    | 15    | https://...
```

## How to Use

1. Create an Excel file with the above columns
2. Fill in your product data
3. Save as `.xlsx` or `.xls` format
4. Click the "Import Excel" button in the Products page
5. Select your Excel file
6. Products will be automatically imported!

## Notes

- Discount percentage is automatically calculated from Price and Min Price
- If Image URL is not provided, a category-specific placeholder image will be automatically assigned (different images for Air Conditioners, Refrigerators, TVs, Washing Machines, etc.)
- All numeric fields must contain valid numbers
- The Excel parser will skip empty rows automatically
