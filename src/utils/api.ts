export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555/api';

/**
 * Fetches all active categories from the backend.
 */
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.warn(`Failed to fetch categories: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.warn('Network error fetching categories:', error);
    return [];
  }
}

/**
 * Fetches a single category by slug.
 */
export async function fetchCategoryBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/slug/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.warn(`Failed to fetch category ${slug}: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.warn(`Network error fetching category ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches all products.
 */
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.warn(`Failed to fetch products: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.warn('Network error fetching products:', error);
    return [];
  }
}

/**
 * Fetches a single product by slug.
 */
export async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.warn(`Failed to fetch product ${slug}: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.warn(`Network error fetching product ${slug}:`, error);
    return null;
  }
}

/**
 * Fetches variants for a specific product ID.
 */
export async function fetchVariantsByProductId(productId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/variants/${productId}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.warn(`Failed to fetch variants for product ${productId}: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.warn(`Network error fetching variants for product ${productId}:`, error);
    return [];
  }
}
