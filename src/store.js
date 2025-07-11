import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Load state from localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem('shoppyglobe_state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

// Save state to localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify({
      cart: {
        items: state.cart.items,
        wishlist: state.cart.wishlist,
      }
    });
    localStorage.setItem('shoppyglobe_state', serializedState);
  } catch (e) {}
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store; 