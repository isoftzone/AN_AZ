const express = require("express");
const con = require('../config')

 exports.getCustomer = async (req, res) => {
    await con.query('SELECT * FROM customermaster', (err, result) => {
         if (err) {
             throw err;
         }
         res.json(result);
     });
 };





exports.addcustomer = async (req, res) => {

    const {email, password } = req.body;
    const newcustomer = {email, password }
   await con.query('INSERT INTO customermaster SET ?', newcustomer, (error, result, fields) => {
        if (error) console.log(error);
        res.status(201).send({
            msg: "new customer created successfully",
            newcustomer
        })
    });
};
exports.getAll = async (req, res) => {
   await con.query('SELECT * FROM customermaster', (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
};

exports.deletecustomer = async (req, res) => {
    const customerId = req.params.id;
    await con.query('DELETE FROM customermaster WHERE id = ?', customerId, (err, result) => {
        if (err) {
            throw err;
        }
        res.send('customer deleted successfully');
    });
};

exports.logincustomer = async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Received login request:', { email, password });
  
    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }
  
    await con.query('SELECT * FROM customermaster WHERE email = ?', [email], (error, results, fields) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).send("Internal Server Error");
      }
  
      if (results.length === 0) {
        console.log('customer not found:', email);
        return res.status(401).json({ msg: "customer does not exist" });
      }
  
      const customer = results[0];
  
      if (customer.password !== password) {
        console.log('Password mismatch:', customer.password, password);
        return res.status(401).json({ msg: "Invalid password" });
      }
  
      console.log('Login successful:', customer);
      return res.status(200).json({
        msg: "Welcome, customer",
        customer
      });
    });
  };
  

//     const { email, password } = req.body;

//   await con.query('SELECT * FROM customermaster WHERE email = ? AND password = ?', [email, password], (error, results, fields) => {
//         if (error) {
//             console.error(error);
//             return res.status(500).send("Internal Server Error");
//         }
//         if (results.length === 0) {
//             return res.status(401).send("Invalid email or password");
//         }
//         const customer = results[0];
//         res.status(200).send({
//             msg: "Login successful",
//             customer
//         });
//     });

exports.editcustomer = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, email } = req.body; 

     
        const updatedcustomer = { name, email };

       
        con.query('UPDATE customermaster SET ? WHERE id = ?', [updatedcustomer, id], (error, result) => {
            if (error) {
                console.error('Error updating customer:', error);
                return res.status(500).send({ error: 'Internal Server Error' });
            }

            
            if (result.affectedRows === 0) {
                return res.status(404).send({ error: 'customer not found' });
            }

         
            res.status(200).send({ msg: 'customer updated successfully', updatedcustomer });
        });
    } catch (error) {
        console.error('Error editing customer:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};