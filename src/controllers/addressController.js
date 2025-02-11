import Address from "../models/address.js";

export const getAddress = async (req, res) => {
  try {
    const address = await Address.find();
    if (!address) res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAddressbyId = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) res.status(404).json({ message: "Address not found" });
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createAddress = async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAddress) res.status(404).json({ message: "Address not found" });
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) res.status(404).json({ message: "Address not found" });
    res.status(200).json({ message: "Address deleted successfull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
