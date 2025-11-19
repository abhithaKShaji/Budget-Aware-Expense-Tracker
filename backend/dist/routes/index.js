"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRoute = exports.categoryRoute = exports.authRoute = void 0;
var auth_route_1 = require("./auth.route");
Object.defineProperty(exports, "authRoute", { enumerable: true, get: function () { return __importDefault(auth_route_1).default; } });
var category_route_1 = require("./category.route");
Object.defineProperty(exports, "categoryRoute", { enumerable: true, get: function () { return __importDefault(category_route_1).default; } });
var expense_route_1 = require("./expense.route");
Object.defineProperty(exports, "expenseRoute", { enumerable: true, get: function () { return __importDefault(expense_route_1).default; } });
