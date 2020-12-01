import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Cart, { LOCAL_STATE_QUERY } from '../components/Cart';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const me = fakeUser();
const mocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem()],
        },
      },
    },
  },
  {
    request: { query: LOCAL_STATE_QUERY },
    result: { data: { cartOpen: true } },
  },
];

describe('Cart', async () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <Cart />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(toJSON(wrapper.find('header'))).toMatchSnapshot();
  });

  //   it('calls the mutation properly', async () => {
  //     let apolloClient;
  //     const wrapper = mount(
  //       <MockedProvider mocks={mocks}>
  //         <ApolloConsumer>
  //           {(client) => {
  //             apolloClient = client;
  //             return <Signup />;
  //           }}
  //         </ApolloConsumer>
  //       </MockedProvider>
  //     );
  //     await wait();
  //     wrapper.update();
  //     type(wrapper, 'name', me.name);
  //     type(wrapper, 'email', me.email);
  //     type(wrapper, 'password', 'ollie');
  //     wrapper.update();
  //     wrapper.find('form').simulate('submit');
  //     await wait();
  //     const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
  //     expect(user.data.me).toMatchObject(me);
  //   });
});
