import { CartItem, Product } from "@/types";

const CART_STORAGE_KEY = "shopping_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity: number = 1): void {
  const cart = getCart();
  const existingIndex = cart.findIndex((item) => item.product.id === product.id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  saveCart(cart);
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const item = cart.find((item) => item.product.id === productId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const finalPrice = item.product.price * (1 - item.product.discount);
    return total + finalPrice * item.quantity;
  }, 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

