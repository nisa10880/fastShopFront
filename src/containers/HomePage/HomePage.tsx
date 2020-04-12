import React, { useEffect, useState } from "react";
import * as action from "./actions";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../Components/SearchBar/SearchBar";
import MenuAppBar from "../../Components/AppBar/AppBar";

const HomePage = props => {
  const { products, productsCount, loaded }: any = useSelector(state => ({
    products: state.productListReducer.products,
    productsCount: state.productListReducer.productsCount,
    loaded: state.productListReducer.loaded,
    ProductInBasket: state.productListReducer.ProductInBasket
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
      <SearchBar />
      {products.map(product => (
        <ProductCard
          key={product.id_product}
          name={product.name}
          measure_type={product.measure_type}
          description={product.description.substring(0, 80) + "..."}
          picture={product.picture}
          price={product.price}
          onClick={() =>
            dispatch(
              action.addProductToBasket({
                id_product: product.id_product,
                name: product.name,
                measure_type: product.measure_type,
                price: product.price
              })
            )
          }
        />
      ))}
    </>
  );
};

export default HomePage;
