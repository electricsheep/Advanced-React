import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import RemoveFromCart, {
  REMOVE_FROM_CART_MUTATION,
} from '../components/RemoveFromCart';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { ApolloConsumer } from 'react-apollo';

global.alert = console.log;
const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem({ id: '123' })],
        },
      },
    },
  },
  {
    request: { query: REMOVE_FROM_CART_MUTATION, variables: { id: '123' } },
    response: {
      data: {
        removeFromCart: {
          __typename: 'CartItem',
          id: '123',
        },
      },
    },
  },
];

describe('RemoveFromCart', async () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <RemoveFromCart id="123" />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('button'))).toMatchSnapshot();
  });

  it('remove item from cart when clicked', async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {(client) => {
            apolloClient = client;
            return <RemoveFromCart id="123" />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const {
      data: { me },
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me.cart).toHaveLength(1);
    expect(me.cart[0].item.price).toBe(5000);
    wrapper.find('button').simulate('click');
    await wait();
    const {
      data: { me: me2 },
    } = await apolloClient.query({ query: CURRENT_USER_QUERY });
    expect(me2.cart).toHaveLength(0);
  });

  //   it('changes from add to adding', async () => {
  //     let apolloClient;
  //     const wrapper = mount(
  //       <MockedProvider mocks={mocks}>
  //         <ApolloConsumer>
  //           {(client) => {
  //             apolloClient = client;
  //             return <AddToCart id="123" />;
  //           }}
  //         </ApolloConsumer>
  //       </MockedProvider>
  //     );
  //     await wait();
  //     wrapper.update();
  //     expect(wrapper.text()).toContain('Add to cart');
  //     wrapper.find('button').simulate('click');
  //     expect(wrapper.text()).toContain('Adding to cart');
  //   });
});
