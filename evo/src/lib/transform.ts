// Utility functions for transforming MongoDB documents to API responses

/**
 * Transform MongoDB product document to API response format
 * Ensures backward compatibility by providing both _id and id fields
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformProduct(product: any) {
  if (!product) return null;
  
  const _idStr = product._id?.toString?.() || product._id;
  
  return {
    ...product,
    _id: _idStr,
    id: _idStr || product.id,
    createdAt: product.createdAt?.toISOString?.() || product.createdAt,
    updatedAt: product.updatedAt?.toISOString?.() || product.updatedAt,
  };
}

/**
 * Transform MongoDB category document to API response format
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformCategory(category: any) {
  if (!category) return null;
  
  const _idStr = category._id?.toString?.() || category._id;
  
  return {
    ...category,
    _id: _idStr,
    id: _idStr || category.id,
    parentCategory: category.parentCategory?.toString?.(),
    createdAt: category.createdAt?.toISOString?.() || category.createdAt,
    updatedAt: category.updatedAt?.toISOString?.() || category.updatedAt,
  };
}

/**
 * Transform MongoDB order document to API response format
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformOrder(order: any) {
  if (!order) return null;
  
  const items = Array.isArray(order.items) ? order.items : [];
  const _idStr = order._id?.toString?.() || order._id;
  
  return {
    ...order,
    _id: _idStr,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: items.map((item: any) => ({
      ...item,
      product: item.product?.toString?.() || item.product,
    })),
    createdAt: order.createdAt?.toISOString?.() || order.createdAt,
    updatedAt: order.updatedAt?.toISOString?.() || order.updatedAt,
  };
}
