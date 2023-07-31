
import { fetchDataFromApi } from "./api";

console.log(categories)
export const fetchCategory = async () => {
    fetchDataFromApi("/api/products").then((categories) => {
        return categories;
        
    })
}