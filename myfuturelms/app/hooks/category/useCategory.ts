import { useEffect, useState } from "react";
import axios from "axios";
import { CategoriesResponse, ICategory } from "@/app/types/CategoryTypes";

const useCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<CategoriesResponse>(
        "http://localhost:8000/api/v1/get-categories"
      );
      setCategories(response.data.categories);
      console.log(response.data.categories)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories };
};

export default useCategory;
