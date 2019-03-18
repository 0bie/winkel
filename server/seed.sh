# Add seed data to `WINKELdb` database
mongoimport --db WINKELdb --collection companies --file ./db/seed/companies.json --jsonArray
mongoimport --db WINKELdb --collection contacts --file ./db/seed/contacts.json --jsonArray
mongoimport --db WINKELdb --collection products --file ./db/seed/products.json --jsonArray
