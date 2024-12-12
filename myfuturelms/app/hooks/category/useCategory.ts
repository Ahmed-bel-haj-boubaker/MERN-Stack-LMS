import { useEffect, useState } from "react";

import { CategoriesResponse, ICategory } from "@/app/types/CategoryTypes";
import apiClient from "@/app/Api/ApiClient";

const useCategory = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get<CategoriesResponse>(
        "/get-categories"
      );
      setCategories(response.data.categories);
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
