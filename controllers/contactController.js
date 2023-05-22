const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel.js");

//get all contacts
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//get one contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//create contact
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//update contact
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Cannot update other user's contacts");
  }
  contact.name = req.body.name || contact.name;
  contact.email = req.body.email || contact.email;
  contact.phone = req.body.phone || contact.phone;
  const updatedContact = await contact.save();

  res.status(200).json(updatedContact);
});

//delete contact
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Cannot delete other user's contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
