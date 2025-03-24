import Voucher from "../models/voucher.js";
//
export const getVoucher = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    if (!vouchers) res.status(404).json({ message: "Voucher not found" });
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) res.status(404).json({ message: "Voucher not found" });
    res.json(voucher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createVoucher = async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    const newVoucher = await voucher.save();
    res.status(201).json(newVoucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVoucher = async (req, res) => {
  try {
    const updatedVoucher = await Voucher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVoucher) res.status(404).json({ message: "Voucher not found" });
    res.json(updatedVoucher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVoucher = async (req, res) => {
  try {
    const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);
    if (!deletedVoucher) res.status(404).json({ message: "Voucher not found" });
    res.json({ message: "Voucher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
