import React, { useEffect, useState } from "react";
import * as action from "./actions";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Box from "@material-ui/core/Box";

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
    price: 250,
    quantity: 0
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      dispatch(action.searchProducts({ ...state, skip: 0 }));
    }
  };

  useEffect(() => {
    if (loaded) {
      dispatch(action.searchProducts({ ...state, skip: 0 }));
    }
  }, [state.search]);

  useEffect(() => {
    if (!loaded) {
      dispatch(action.searchProducts({ ...state, skip: 0 }));
    }
  }, []);

  return (
    <>
      <SearchBar
        search={state.search}
        handleInputChange={handleChange("search")}
        handleKeyDown={handleKeyDown}
      />
      <Box display="flex" flexWrap="wrap" alignContent="flex-start" m={2}>
        {products.map(product => (
          <Box m={2}>
            <ProductCard
              key={product.id_product}
              name={product.name}
              measure_type={product.measure_type}
              description={product.description.substring(0, 80) + "..."}
              picture={product.picture}
              onQuantityChange={handleChange("quantity")}
              quantity={state.quantity}
              price={product.price}
              onSubmit={() =>
                dispatch(
                  action.addProductToBasket({
                    id_product: product.id_product,
                    name: product.name,
                    picture: product.picture,
                    quantity: state.quantity,
                    measure_type: product.measure_type,
                    price: product.price
                  })
                )
              }
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default HomePage;
