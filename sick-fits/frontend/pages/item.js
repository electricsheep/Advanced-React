import SingleItem from '../components/SingleItem';

const Item = ({ query }) => (
  <div>
    <SingleItem id={query.id}></SingleItem>
  </div>
);

export default Item;
