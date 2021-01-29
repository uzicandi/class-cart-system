/**
 * localstorage 서비스
 */

export const storageService = {
  getItem(key) {
    return localStorage.getItem(key);
  },
  setItem(key, value) {
    return localStorage.setItem(key, value);
  },
  removeItem(key) {
    return localStorage.removeItem(key);
  },
  clear() {
    return localStorage.clear();
  },
  checkCart(id) {
    const cart = storageService.getItem('carted-item');
    if (!cart) return false; // 카트에 없으면 false
    const cartItems = JSON.parse(storageService.getItem('carted-item'));
    if (cartItems.includes(id)) return true;
    return false;
  }
};
