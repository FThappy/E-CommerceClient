import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { useSelector } from 'react-redux';



const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  @media only screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ProductWishlist = () => {


  const [products,setProducts] = useState([])

  const wishlist = useSelector(state=>state.wishlist)

  useEffect(() => {
   // Lấy danh sách sản phẩm từ wishlist
   setProducts(wishlist.products);
  }, [wishlist.products]);

  useEffect(() => {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt))
  }, []);

  return (
    <Container>
      {
         products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
}

export default ProductWishlist