import path from 'path';
import fs from 'fs';
const p = path.join(
  path.dirname(require.main!.filename),
  'util',
  'products.json'
);

const getProductsFromFile = (cb: (products: any[]) => void) => {
  fs.readFile(p, 'utf-8', (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

interface aProduct {
  title: string;
  imageUrl: string;
  description: string;
  fileName: string;
}

export default class Product {
  title: string;
  imageUrl: string;
  description: string;
  fileName: string;
  id?:string;
  constructor(
    title: string,
    imageUrl: string,
    description: string,
    fileName: string,
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.fileName = fileName;
  }

  save() {
    this.id = Math.random().toFixed(4).toString()
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.error('Error writing file:', err);
        }
      });
    });
  }

static deleteById(id:any){
  getProductsFromFile((products)=>{
    const updatedProducts  =  products.filter(prod => prod.id !== id)
    fs.writeFile(p,JSON.stringify(updatedProducts),(err:any)=>{
      if(err){
console.log(err)
      }
    })
  })
  } 

  static fetchAll(cb: (products: any[]) => void) {
    getProductsFromFile(cb);
  }
}
