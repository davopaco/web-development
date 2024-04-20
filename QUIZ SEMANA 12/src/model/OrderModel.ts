import { ProductsInterface } from "./types/ProductsInterface";

export default class OrderModel {
  orderByCategory = async (
    data: ProductsInterface[]
  ): Promise<ProductsInterface[]> => {
    return new Promise((resolve, reject) => {
      try {
        data.sort((a, b) => {
          const categoryA = a.categories.sort().join("").toUpperCase();
          const categoryB = b.categories.sort().join("").toUpperCase();
          if (categoryA < categoryB) {
            return -1;
          }
          if (categoryA > categoryB) {
            return 1;
          }
          return 0;
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  orderByName = async (
    data: ProductsInterface[]
  ): Promise<ProductsInterface[]> => {
    return new Promise((resolve, reject) => {
      try {
        data.sort((a, b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  orderByAuthor = async (
    data: ProductsInterface[]
  ): Promise<ProductsInterface[]> => {
    return new Promise((resolve, reject) => {
      try {
        data.sort((a, b) => {
          const authorA = a.authors.sort().join("").toUpperCase();
          const authorB = b.authors.sort().join("").toUpperCase();
          if (authorA < authorB) {
            return -1;
          }
          if (authorA > authorB) {
            return 1;
          }
          return 0;
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
}
