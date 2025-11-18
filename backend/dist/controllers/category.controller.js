"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, color, monthlyLimit } = req.body;
        if (!name || !color || !monthlyLimit) {
            return res.status(400).json({
                success: false,
                message: "Name, color, and monthlyLimit are required.",
            });
        }
        const existing = yield category_model_1.Category.findOne({ name });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Category with this name already exists.",
            });
        }
        const category = yield category_model_1.Category.create({
            name,
            color,
            monthlyLimit,
        });
        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            category,
        });
    }
    catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Failed to create category.",
        });
    }
});
exports.createCategory = createCategory;
// GET ALL CATEGORIES
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.Category.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            categories,
        });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "Server error. Failed to fetch categories.",
        });
    }
});
exports.getCategories = getCategories;
