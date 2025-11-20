// context/CartContext.js
'use client'
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload
      };

    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: [...state.addresses, action.payload]
      };

    case 'SET_DEFAULT_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map(addr =>
          addr.id === action.payload
            ? { ...addr, isDefault: true }
            : { ...addr, isDefault: false }
        )
      };

    case 'DELETE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(addr => addr.id !== action.payload)
      };

    case 'LOAD_ADDRESSES':
      return {
        ...state,
        addresses: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  addresses: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart and addresses from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('furniture-cart');
    const savedAddresses = localStorage.getItem('furniture-addresses');
    
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
    if (savedAddresses) {
      dispatch({ type: 'LOAD_ADDRESSES', payload: JSON.parse(savedAddresses) });
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('furniture-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Save addresses to localStorage
  useEffect(() => {
    localStorage.setItem('furniture-addresses', JSON.stringify(state.addresses));
  }, [state.addresses]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addAddress = (address) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
      isDefault: state.addresses.length === 0
    };
    dispatch({ type: 'ADD_ADDRESS', payload: newAddress });
  };

  const setDefaultAddress = (addressId) => {
    dispatch({ type: 'SET_DEFAULT_ADDRESS', payload: addressId });
  };

  const deleteAddress = (addressId) => {
    dispatch({ type: 'DELETE_ADDRESS', payload: addressId });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getDefaultAddress = () => {
    return state.addresses.find(addr => addr.isDefault) || state.addresses[0];
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addresses: state.addresses,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addAddress,
      setDefaultAddress,
      deleteAddress,
      getCartTotal,
      getCartItemsCount,
      getDefaultAddress
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};