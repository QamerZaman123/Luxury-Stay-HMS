const Invoice = require("../../models/billing/invoiceModel");


const createInvoice = async (req, res) => {
    try {
        const {
            invoiceNumber,
            hotel,
            guest,
            stay,
            reservation,
            items,
            discount = 0,
            tax = 0,
            amountPaid = 0,
            status = "draft",
            issuedAt
        } = req.body;

        // Basic validation
        if (!invoiceNumber || !hotel || !guest || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "invoiceNumber, hotel, guest and items are required"
            });
        }

        
        const calculatedItems = items.map((item) => {
            const quantity = Number(item.quantity);
            const unitPrice = Number(item.unitPrice);

            if (quantity < 1 || unitPrice < 0) {
                throw new Error("Invalid quantity or unit price");
            }

            return {
                ...item,
                quantity,
                unitPrice,
                total: quantity * unitPrice
            };
        });

       
        const subtotal = calculatedItems.reduce(
            (sum, item) => sum + item.total,
            0
        );

        const discountAmount = Number(discount) || 0;
        const taxAmount = Number(tax) || 0;
        const paidAmount = Number(amountPaid) || 0;

        const totalAmount = Math.max(
            0,
            subtotal - discountAmount + taxAmount
        );

        const amountDue = Math.max(
            0,
            totalAmount - paidAmount
        );

        // Determine payment status
        let invoiceStatus = status;

        if (status !== "draft" && status !== "cancelled") {
            if (paidAmount >= totalAmount) {
                invoiceStatus = "paid";
            } else if (paidAmount > 0) {
                invoiceStatus = "partially_paid";
            } else {
                invoiceStatus = "unpaid";
            }
        }

        const invoice = await Invoice.create({
            invoiceNumber,
            hotel,
            guest,
            stay,
            reservation,
            items: calculatedItems,
            subtotal,
            discount: discountAmount,
            tax: taxAmount,
            totalAmount,
            amountPaid: paidAmount,
            amountDue,
            status: invoiceStatus,
            issuedAt
        });

        res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            data: invoice
        });
    } catch (error) {
        console.error("Create invoice error:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Invoice number already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("hotel")
            .populate("guest")
            .populate("stay")
            .populate("reservation")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invoices.length,
            data: invoices
        });
    } catch (error) {
        console.error("Get invoices error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate("hotel")
            .populate("guest")
            .populate("stay")
            .populate("reservation");

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        res.status(200).json({
            success: true,
            data: invoice
        });
    } catch (error) {
        console.error("Get invoice error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update Invoice
const updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        const {
            invoiceNumber,
            hotel,
            guest,
            stay,
            reservation,
            items,
            discount,
            tax,
            amountPaid,
            status,
            issuedAt
        } = req.body;

        // Update basic fields if provided
        if (invoiceNumber !== undefined) {
            invoice.invoiceNumber = invoiceNumber;
        }

        if (hotel !== undefined) {
            invoice.hotel = hotel;
        }

        if (guest !== undefined) {
            invoice.guest = guest;
        }

        if (stay !== undefined) {
            invoice.stay = stay;
        }

        if (reservation !== undefined) {
            invoice.reservation = reservation;
        }

        if (issuedAt !== undefined) {
            invoice.issuedAt = issuedAt;
        }

        if (status !== undefined) {
            invoice.status = status;
        }

        // Recalculate invoice if financial data changes
        if (
            items !== undefined ||
            discount !== undefined ||
            tax !== undefined ||
            amountPaid !== undefined
        ) {
            const updatedItems = items || invoice.items;

            const calculatedItems = updatedItems.map((item) => {
                const quantity = Number(item.quantity);
                const unitPrice = Number(item.unitPrice);

                return {
                    ...item,
                    quantity,
                    unitPrice,
                    total: quantity * unitPrice
                };
            });

            const subtotal = calculatedItems.reduce(
                (sum, item) => sum + item.total,
                0
            );

            const discountAmount =
                discount !== undefined
                    ? Number(discount)
                    : invoice.discount;

            const taxAmount =
                tax !== undefined
                    ? Number(tax)
                    : invoice.tax;

            const paidAmount =
                amountPaid !== undefined
                    ? Number(amountPaid)
                    : invoice.amountPaid;

            const totalAmount = Math.max(
                0,
                subtotal - discountAmount + taxAmount
            );

            const amountDue = Math.max(
                0,
                totalAmount - paidAmount
            );

            invoice.items = calculatedItems;
            invoice.subtotal = subtotal;
            invoice.discount = discountAmount;
            invoice.tax = taxAmount;
            invoice.totalAmount = totalAmount;
            invoice.amountPaid = paidAmount;
            invoice.amountDue = amountDue;

            if (invoice.status !== "draft" && invoice.status !== "cancelled") {
                if (paidAmount >= totalAmount) {
                    invoice.status = "paid";
                } else if (paidAmount > 0) {
                    invoice.status = "partially_paid";
                } else {
                    invoice.status = "unpaid";
                }
            }
        }

        await invoice.save();

        res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            data: invoice
        });
    } catch (error) {
        console.error("Update invoice error:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Invoice number already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Invoice deleted successfully"
        });
    } catch (error) {
        console.error("Delete invoice error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};