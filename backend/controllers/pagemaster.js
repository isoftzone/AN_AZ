const express = require("express");
const con = require("../config");
const util = require("util");

const query = util.promisify(con.query).bind(con);

// Save Exchange Policy Content
// exports.addPolicy = async (req, res) => {
//     try {
//         const { companyid, sectionname, content } = req.body;

//         if (!content || !companyid || !sectionname) {
//             return res.status(400).json({ error: "companyid, sectionname, and content are required" });
//         }

//         const sql = `
//             INSERT INTO page_master (companyid, sectionname, content)
//             VALUES (?, ?, ?)
//             ON DUPLICATE KEY UPDATE content = VALUES(content)
//         `;

//         await query(sql, [companyid, sectionname, content]);
//         res.status(200).json({ success: true, message: "Exchange policy saved successfully!" });

//     } catch (error) {
//         console.error("Error saving policy:", error);
//         res.status(500).json({ error: "Database error", details: error.message });
//     }
// };

// Save Exchange Policy Content
exports.addPolicy = async (req, res) => {
    try {
        const { companyid, sectionname, content } = req.body;

        if (!content || !companyid || !sectionname) {
            return res.status(400).json({ error: "companyid, sectionname, and content are required" });
        }

        const sql = `
            INSERT INTO page_master (companyid, sectionname, content)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE content = VALUES(content)
        `;

        await query(sql, [companyid, sectionname, content]);
        res.status(200).json({ success: true, message: "Exchange policy saved successfully!" });

    } catch (error) {
        console.error("Error saving policy:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
};


// exports.getPolicy = async (req, res) => {
//     try {
//         let { companyid, sectionname} = req.query;

//         if (!companyid || !sectionname) {
//             return res.status(400).json({ error: "companyid and sectionname is required" });
//         }

//          // Normalize section name to lowercase to avoid mismatch
//          sectionname = sectionname.trim().toLowerCase();

//         const sql = "SELECT sectionname, content FROM page_master WHERE companyid = ? AND sectionname = ?";
//         const result = await query(sql, [companyid, sectionname]);

//         console.log("Database Query Result:", result); // Debugging output


//         if (result.length === 0) {
//             return res.status(200).json({ policies: [] }); // Ensure frontend receives an empty array instead of undefined
//         }

//         res.status(200).json({ policies: result });
//         // res.status(200).json({ terms: result });
//         // const terms = result.filter(item => item.type === 'term');
//         // const policies = result.filter(item => item.type === 'policy');

//         // res.status(200).json({ terms, policies });


//     } catch (error) {
//         console.error("Error fetching policies:", error);
//         res.status(500).json({ error: "Database error", details: error.message });
//     }
// };


exports.getPolicy = async (req, res) => {
    try {
        const { companyid, sectionname } = req.query;

        if (!companyid) {
            return res.status(400).json({ error: "companyid is required" });
        }

        let sql = "SELECT sectionname, content FROM page_master WHERE companyid = ?";
        let params = [companyid];

        if (sectionname) {
            sql += " AND sectionname = ?";
            params.push(sectionname);
        }

        const result = await query(sql, params);
        res.status(200).json({ policies: result });

    } catch (error) {
        console.error("Error fetching policies:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
};



// exports.getPolicy = async (req, res) => {
//     try {
//         const { companyid } = req.query;

//         if (!companyid) {
//             return res.status(400).json({ error: "companyid is required" });
//         }

//         const sql = "SELECT sectionname, content FROM page_master WHERE companyid = ?";
//         const result = await query(sql, [companyid]);
//         console.log("Database Query Result:", result); // Debugging output

//         res.status(200).json({ policies: result });

//     } catch (error) {
//         console.error("Error fetching policies:", error);
//         res.status(500).json({ error: "Database error", details: error.message });
//     }
// };




// Fetch Exchange Policy Content
// exports.getPolicy = async (req, res) => {
//     try {
//         const { companyid, sectionname } = req.query;

//         if (!companyid || !sectionname) {
//             return res.status(400).json({ error: "companyid and sectionname are required" });
//         }

//         const sql = "SELECT content FROM page_master WHERE companyid = ? AND sectionname = ? LIMIT 1";
//         const result = await query(sql, [companyid, sectionname]);

//         res.status(200).json({ content: result.length > 0 ? result[0].content : "" });

//     } catch (error) {
//         console.error("Error fetching policy:", error);
//         res.status(500).json({ error: "Database error", details: error.message });
//     }
// };
