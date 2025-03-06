// const express = require("express");
// const con = require('../config')


//  exports.getItem = async (req, res) => {
//     await con.query('SELECT * FROM itemmaster', (err, result) => {
//          if (err) {
//              throw err;
//          }                                              
//          res.json(result);
//      });
//  };




const express = require("express");
const con = require('../config'); // Ensure this is correctly set up
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const con = require("../config");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "public/images/banner/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add a New Item

// ✅ Add Item
// exports.addItem = async (req, res) => {
//     const {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, markup,
//         saleprice, section, discount, sup_color, itemtype
//     } = req.body;

//     const image = req.file ? req.file.filename : null;

//     const newItem = {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, markup,
//         saleprice, section, discount, sup_color, itemtype, photo: image
//     };

//     try {
//         await con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "✅ Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// exports.addItem = async (req, res) => {
//     console.log("Received Data:", req.body); // Debugging

// // barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
// //         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
// //         company, subgroup, subcategory, packing, markup,
// //         saleprice, section, discount, sup_color, itemtype

//     const {
//         Barcode, ItemName, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
//         Packing, Unit, Section, Status, 
//     } = req.body;

//     const image = req.file ? req.file.filename : null; // Handle Image Upload

//     const newItem = {
//         Barcode, ItemName, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
//         Packing, Unit, Section, Status, photo: image
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// exports.addItem = async (req, res) => {
//     console.log("Received Data:", req.body); // Debugging

//     const {
//        CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
//         Packing, Unit, Section, Status, 
//     } = req.body;

//     const image = req.file ? req.file.filename : null; // Handle Image Upload

//     const newItem = {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
//         Packing, Unit, Section, Status, photo: image
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };



exports.addItem = async (req, res) => {
    console.log("Received Data:", req.body); // Debugging


    const {
        CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
        SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
        SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
        Packing, Unit, Section, Status, 
    } = req.body;

    const images = req.files ? req.files.map(file => file.filename) : [];

    const newItem = {
        CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
        SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
        SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
        Packing, Unit, Section, Status, PHOTO: JSON.stringify(images) // Store images as JSON string
    };

    console.log("New Item Object:", newItem); // Debugging

    try {
        con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
            if (err) {
                console.error("❌ Error inserting item:", err);
                return res.status(500).json({ error: "Database error" });
            }
            console.log("✅ Insert Success:", result);
            res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};


// exports.addItem = async (req, res) => {
//     console.log("Received Data:", req.body); // Debugging
//     console.log("Received File:", req.file); // Debugging

//     const {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
//         Packing, Unit, Section, Status, 
//     } = req.body;

//     const image = req.file ? req.file.filename : null; // Handle Image Upload

//     const newItem = {
//         CompanyID, Barcode, ItemName, ItemId, BoxSize, HSNCode, Rate, Tax, PurPrice, MarkUp, MRP, MarkDown, 
//         SalePrice, ExpiryDays, LookUp, Remark, Product, Brand, sColor, Color, I_Size, Style, 
//         SubGroup, Gender, Buyer, SubCategory, Category, Material, Company, Season, 
//         Packing, Unit, Section, Status, photo: image
//     };

//     console.log("New Item Object:", newItem); // Debugging

//     try {
//         con.query('INSERT INTO itemmaster SET ?', newItem, (err, result) => {
//             if (err) {
//                 console.error("❌ Error inserting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             console.log("✅ Insert Success:", result);
//             res.json({ success: true, message: "Item added successfully!", itemID: result.insertId });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };


// ✅ Get Items
exports.getItems = async (req, res) => {
    const { id } = req.params;
    try {
        await con.query("SELECT * FROM itemmaster WHERE ItemId = ?", [id], (err, result) => {
            if (err) {
                console.error("❌ Error fetching items:", err);
                return res.status(500).json({ error: "Database error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "Item not found" });
            }
            res.json({ items: result });
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Update Item
// exports.updateItem = async (req, res) => {
//     const { id } = req.params;
//     const {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, boxing, boxsize, markup,
//         saleprice, section, discount, sup_color, itemtype
//     } = req.body;

//     const updatedItem = {
//         barcode, itemid, lookup, product, brand, i_size, color, style, unit, category,
//         rate, tax, purprice, mrp, status, remark, buyer, season, gender, material,
//         company, subgroup, subcategory, packing, boxing, boxsize, markup,
//         saleprice, section, discount, sup_color, itemtype
//     };

//     if (req.file) {
//         updatedItem.photo = req.file.filename;
//     }

//     try {
//         await con.query("UPDATE itemmaster SET ? WHERE id = ?", [updatedItem, id], (err, result) => {
//             if (err) {
//                 console.error("❌ Error updating item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "✅ Item updated successfully!" });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };


// exports.updateItem = async (req, res) => {
//     const { id } = req.params; // Ensure id is coming from URL params

//     if (!id) {
//         return res.status(400).json({ error: "Missing item ID" });
//     }

//     const updatedItem = {
//         barcode: req.body.barcode,
//         ItemId: req.body.ItemId,
//         lookup: req.body.lookup,
//         product: req.body.product,
//         brand: req.body.brand,
//         i_size: req.body.i_size,
//         color: req.body.color,
//         style: req.body.style,
//         unit: req.body.unit,
//         category: req.body.category,
//         rate: req.body.rate,
//         tax: req.body.tax,
//         purprice: req.body.purprice,
//         mrp: req.body.mrp,
//         status: req.body.status,
//         remark: req.body.remark,
//         buyer: req.body.buyer,
//         season: req.body.season,
//         gender: req.body.gender,
//         material: req.body.material,
//         company: req.body.company,
//         subgroup: req.body.subgroup,
//         subcategory: req.body.subcategory,
//         packing: req.body.packing,
//         // boxing: req.body.boxing,
//         boxsize: req.body.boxsize,
//         markup: req.body.markup,
//         saleprice: req.body.saleprice,
//         section: req.body.section,
//         discount: req.body.discount,
//         sup_color: req.body.sup_color,
//         itemtype: req.body.itemtype,
//     };

//     if (req.file) {
//         updatedItem.photo = req.file.filename;
//     }

//     try {
//         await con.query(
//             "UPDATE itemmaster SET ? WHERE ItemId = ?",
//             [updatedItem, id],
//             (err, result) => {
//                 if (err) {
//                     console.error("❌ Error updating item:", err);
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 res.json({ success: true, message: "✅ Item updated successfully!" });
//             }
//         );
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };


// ✅ Delete Item






exports.updateItem = async (req, res) => {
    const { id } = req.params; // Ensure id is coming from URL params
    console.log("Received Item ID for Update:", id);
    if (!id) {
        return res.status(400).json({ error: "Missing item ID" });
    }

    const editId = Number(id); // Convert id to a number
    if (isNaN(editId)) {
        return res.status(400).json({ error: "Invalid item ID" });
    }

    const images = req.files ? req.files.map(file => file.filename) : [];

    const updatedItem = {
        BARCODE: req.body.BARCODE,
        ITEMNAME: req.body.ITEMNAME,
        ITEMID: req.body.ITEMID,
        BOXSIZE: req.body.BOXSIZE,
        HSNCODE: req.body.HSNCODE,
        RATE: req.body.RATE,
        TAX: req.body.TAX,
        PURPRICE: req.body.PURPRICE,
        MARKUP: req.body.MARKUP,
        MRP: req.body.MRP,
        MARKDOWN: req.body.MARKDOWN,
        SALEPRICE: req.body.SALEPRICE,
        EXPIRYDAYS: req.body.EXPIRYDAYS,
        LOOKUP: req.body.LOOKUP,
        REMARK: req.body.REMARK,
        PRODUCT: req.body.PRODUCT,
        BRAND: req.body.BRAND,
        SCOLOR: req.body.SCOLOR,
        COLOR: req.body.COLOR,
        I_SIZE: req.body.I_SIZE,
        STYLE: req.body.STYLE,
        SUBGROUP: req.body.SUBGROUP,
        GENDER: req.body.GENDER,
        BUYER: req.body.BUYER,
        SUBCATEGORY: req.body.SUBCATEGORY,
        CATEGORY: req.body.CATEGORY,
        MATERIAL: req.body.MATERIAL,
        COMPANY: req.body.COMPANY,
        SEASON: req.body.SEASON,
        PACKING: req.body.PACKING,
        UNIT: req.body.Unit,
        SECTION: req.body.SECTION,
        STATUS: req.body.STATUS,
        PHOTO: JSON.stringify(images) // Store images as JSON string
    };

    if (req.file) {
        updatedItem.photo = req.file.filename;
    }

    try {
        await con.query(
            "UPDATE itemmaster SET ? WHERE ItemId = ?",
            [updatedItem, editId],
            (err, result) => {
                if (err) {
                    console.error("❌ Error updating item:", err);
                    return res.status(500).json({ error: "Database error" });
                }
                res.json({ success: true, message: "✅ Item updated successfully!" });
            }
        );
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};



// exports.deleteItem = async (req, res) => {
//     const { id } = req.params;

//     try {
//         await con.query("DELETE FROM itemmaster WHERE ItemId = ?", [id], (err, result) => {
//             if (err) {
//                 console.error("❌ Error deleting item:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }
//             res.json({ success: true, message: "✅ Item deleted successfully!" });
//         });
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Missing item ID" });
    }

    const deleteId = Number(id); // Convert id to a number
    if (isNaN(deleteId)) {
        return res.status(400).json({ error: "Invalid item ID" });
    }

    try {
        await con.query("DELETE FROM itemmaster WHERE ItemId = ?", [deleteId], (err, result) => {
            if (err) {
                console.error("❌ Error deleting item:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ success: true, message: "✅ Item deleted successfully!" });
        });
    } catch (error) {
        console.error("❌ Unexpected error:", error);
        res.status(500).json({ error: "Server error" });
    }
};



// Get distinct values for dropdowns
// exports.getDropdownValues = async (req, res) => {
//     try {
//         const queries = {
//             Product: "SELECT PRIMENAME FROM master where codetype = 'Product' ",
//             brand: "SELECT DISTINCT brand FROM itemmaster",
//             i_size: "SELECT DISTINCT i_size FROM itemmaster",
//             // i_size: "SELECT DISTINCT i_size FROM itemmaster",
//             color: "SELECT DISTINCT color FROM itemmaster",
//             style: "SELECT DISTINCT style FROM itemmaster",
//             unit: "SELECT DISTINCT unit FROM itemmaster",
//             category: "SELECT DISTINCT category FROM itemmaster",
//             subgroup: "SELECT DISTINCT subgroup FROM itemmaster",
//             group: "SELECT DISTINCT i_group FROM itemmaster",
//             subcategory: "SELECT DISTINCT subcategory FROM itemmaster",
//             gender: "SELECT DISTINCT gender FROM itemmaster",
//             buyer: "SELECT DISTINCT buyer FROM itemmaster",
//             material: "SELECT DISTINCT material FROM itemmaster",
//             company: "SELECT DISTINCT company FROM itemmaster",
//             season: "SELECT DISTINCT season FROM itemmaster",
//             packing: "SELECT DISTINCT packing FROM itemmaster",
//             // dealer: "SELECT DISTINCT dealer FROM itemmaster",
//             section: "SELECT DISTINCT section FROM itemmaster",
//             status: "SELECT DISTINCT status FROM itemmaster"
//         };

//         const results = {};

//         // Run each query
//         for (const key in queries) {
//             await con.query(queries[key], (err, result) => {
//                 if (err) {
//                     console.error(`❌ Error fetching ${key}:`, err);
//                 } else {
//                     results[key] = result.map(row => row[key]); // Extract unique values
//                 }
//                 // Send response after processing all queries
//                 if (Object.keys(results).length === Object.keys(queries).length) {
//                     res.json(results);
//                 }
//             });
//         }
//     } catch (error) {
//         console.error("❌ Unexpected error:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

exports.postcsbAW = (req, res) => {
    const { TblName, FldName, FldCode, OrdBy, WhFldName } = req.body;
    console.log(req.body);

    if (!Array.isArray(WhFldName)) {
        return res.status(400).json({ error: "WhFldName must be an array" });
    }

    const results = {};
    const queries = WhFldName.map(field => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
            con.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                results[field] = rows;
                resolve();
            });
        });
    });

    Promise.all(queries)
        .then(() => res.json(results))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        });
};

exports.getcmbAW = (req, res) => {
    const { TblName, FldName, FldCode, OrdBy } = req.query;
    let WhFldName = req.query.WhFldName;

    // Ensure WhFldName is an array (in case it's a single value, convert it)
    if (!WhFldName) {
        return res.status(400).json({ error: "WhFldName is required" });
    }
    if (!Array.isArray(WhFldName)) {
        WhFldName = [WhFldName]; // Convert to array if it's a single value
    }

    console.log(req.query);

    const results = {};
    const queries = WhFldName.map(field => {
        return new Promise((resolve, reject) => {
            const query = `SELECT ${FldName}, ${FldCode} FROM ${TblName} WHERE Codetype = '${field}' ORDER BY ${OrdBy}, ${FldName}`;
            con.query(query, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                results[field] = rows;
                resolve();
            });
        });
    });

    Promise.all(queries)
        .then(() => res.json(results))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Database query failed" });
        });
};
