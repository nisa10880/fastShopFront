import React, { useEffect, useState } from "react";
import * as action from "./actions";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";

const HomePage = props => {
  const { products, productsCount, loaded }: any = useSelector(state => ({
    products: state.productListReducer.products,
    productsCount: state.productListReducer.productsCount,
    loaded: state.productListReducer.loaded
  }));

  const dispatch = useDispatch();

  const [state, setState] = useState({
    search: "",
    take: 10,
    skip: 0,
    order: "price",
    price: 250
  });

  useEffect(() => {
    if (!loaded) {
      dispatch(action.searchProducts({ ...state, skip: 0 }));
    }
  }, []);

  return (
    <>
      {products.map(product => (
        <ProductCard
          name={product.name}
          description={product.description.substring(0, 120) + "..."}
          picture={product.picture}
          price={product.price}
        />
      ))}
    </>
  );
};

export default HomePage;
