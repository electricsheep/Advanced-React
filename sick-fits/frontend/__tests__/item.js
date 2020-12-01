import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABC123',
  title: 'item',
  price: 5000,
  description: 'description',
  image: 'dog.jpg',
  largeImage: 'largeDog.jpg',
};

describe('<Item/>', () => {
  it('renders and matches the snapshot properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
