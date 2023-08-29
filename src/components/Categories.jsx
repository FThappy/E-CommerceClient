import React from 'react';
import styled from "styled-components";
import { mobile } from "../responsive";

import {categories} from "../data"
import CategoryItem from './CategoryItem';

const Container = styled.div`
  display: flex;
  padding: 1.3rem;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;


const Categories = () => {
    return (
        <Container>
            {categories.map(item =>(
                <CategoryItem item={item} key={item.id} />
            ))}

        </Container>
    );
}

export default Categories;
