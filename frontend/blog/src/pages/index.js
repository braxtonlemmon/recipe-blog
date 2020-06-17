import React from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';
import RecipeCard from '../components/RecipeCard';
import SEO from '../components/seo';

const Wrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 260px);
  gap: 10px;
  width: 90%;
  li {
    margin: 15px;
  }
`;

function IndexPage({ data }) {
  const recipes = data.allMongodbTestRecipes.edges;

  return (
    <>
      <SEO title="Home" description="Catalog of recipes" />
      <Wrapper>
        {recipes.map(({node}) => {
          const slug = node.title.toLowerCase().replace(/ /g, '-');
          if (node.is_published) {
            return (
              <Link key={node.id} to={`/recipe/${slug}`}>
                <li key={`list~${node.id}`}>
                  <RecipeCard recipe={node} key={`card~${node.id}`} />
                </li>
              </Link>)
            }
          })}
      </Wrapper>
    </>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMongodbTestRecipes {
      edges {
        node {
          title
          quote
          is_published
          image
          id
          mainImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`