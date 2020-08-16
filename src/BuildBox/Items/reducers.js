import {
  ITEMS_REQUEST_PRODUCT_LIST,
  ITEMS_RECEIVE_PRODUCT_LIST,
  ITEMS_ADD_TO_BOX,
  ITEMS_REMOVE_FROM_BOX,
  ITEMS_CLEAR_FROM_BOX
} from './actions'

const defaultState = {
  productList: [
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/Product_1_1024x1024@2x.jpg?v=1597324651',
      price: 1000,
      discountPrice: 800,
      quantity: 9,
      title: 'Product 2'
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/Product_1_1024x1024@2x.jpg?v=1597324651',
      price: 5000,
      discountPrice: 4000,
      quantity: 6,
      title: 'Product 3'
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/Product_1_1024x1024@2x.jpg?v=1597324651',
      price: 4000,
      discountPrice: 2500,
      quantity: 11,
      title: 'Product 4'
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/Product_1_1024x1024@2x.jpg?v=1597324651',
      price: 2000,
      discountPrice: 1500,
      quantity: 2,
      title: 'Product 5'
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/Product_1_1024x1024@2x.jpg?v=1597324651',
      price: 2000,
      discountPrice: 1500,
      quantity: 7,
      title: 'Product 6'
    }
  ],
  boxesList: [
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/smallBox_1024x1024@2x.jpg?v=1597324938',
      price: 100,
      discountPrice: 40,
      quantity: 0,
      title: 'Small Box',
      type: 'box'
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0450/1913/6168/products/bigBox_1024x1024@2x.jpg?v=1597324938',
      price: 100,
      discountPrice: 40,
      quantity: 0,
      title: 'Big Box',
      type: 'box'
    }
  ],
  selectedBox: null,
  selectedProducts: {},
  dataIsFetching: false,
  selectedItemsCount: 0,
  subTotal: 0
}

const items = (state = defaultState, action) => {
  switch (action.type) {
    case ITEMS_REQUEST_PRODUCT_LIST:
      return {
        ...state,
        dataIsFetching: action.dataIsFetching
      }
    case ITEMS_RECEIVE_PRODUCT_LIST:
      return {
        ...state,
        dataIsFetching: action.dataIsFetching,
        productList: defaultState.productList // action.productList
      }
    case ITEMS_ADD_TO_BOX:
      let newSelectedProducts = state.selectedProducts
      if (action.product.type && action.product.type === 'box') {
        newSelectedProducts[action.product.type] = {
          count: 0,
          title: action.product.title,
          price: action.product.price,
          image: action.product.image
        }
        return {
          ...state,
          selectedItemsCount: state.selectedItemsCount + 1,
          selectedProducts: newSelectedProducts,
          selectedBox: action.product.title
        }
      } else {
        if (state.selectedProducts.hasOwnProperty(action.product.title)) {
          newSelectedProducts[action.product.title]['count'] += 1
        } else {
          newSelectedProducts[action.product.title] = {
            count: 1,
            title: action.product.title,
            price: action.product.price,
            image: action.product.image
          }
        }
        return {
          ...state,
          selectedItemsCount: state.selectedItemsCount + 1,
          selectedProducts: newSelectedProducts,
          subTotal: state.subTotal + action.product.price
        }
      }
    case ITEMS_REMOVE_FROM_BOX:
      let afterDecreasingCount = state.selectedProducts
      if (state.selectedProducts.hasOwnProperty(action.product.title)) {
        afterDecreasingCount[action.product.title]['count'] -= 1
        if (afterDecreasingCount[action.product.title]['count'] === 0) {
          delete afterDecreasingCount[action.product.title]
        }
      }
      return {
        ...state,
        selectedItemsCount: state.selectedItemsCount - 1,
        selectedProducts: afterDecreasingCount,
        subTotal: state.subTotal - action.product.price
      }
    case ITEMS_CLEAR_FROM_BOX:
      return {
        ...state,
        selectedBox: null,
        selectedProducts: {},
        subTotal: 0,
        selectedItemsCount: 0
      }
    default:
      return state
  }
}

export default items
