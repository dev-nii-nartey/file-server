"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const p = path_1.default.join(path_1.default.dirname(require.main.filename), 'util', 'products.json');
const getProductsFromFile = (cb) => {
    fs_1.default.readFile(p, 'utf-8', (err, fileContent) => {
        if (err) {
            cb([]);
        }
        else {
            cb(JSON.parse(fileContent));
        }
    });
};
class Product {
    title;
    imageUrl;
    description;
    fileName;
    id;
    constructor(title, imageUrl, description, fileName) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.fileName = fileName;
    }
    save() {
        this.id = Math.random().toFixed(4).toString();
        getProductsFromFile((products) => {
            products.push(this);
            fs_1.default.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                }
            });
        });
    }
    static deleteById(id) {
        getProductsFromFile((products) => {
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs_1.default.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
exports.default = Product;
