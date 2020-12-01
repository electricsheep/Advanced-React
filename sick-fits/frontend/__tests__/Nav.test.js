import { mount } from 'enzyme';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const notSignedInMock = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: null,
      },
    },
  },
];

const signedInMock = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: fakeUser(),
      },
    },
  },
];

const signedInMockWithItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
        },
      },
    },
  },
];

describe('Nav', () => {
  it('renders minimal nav when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMock}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('[data-test="nav"]');
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it('renders full nav when signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMock}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain('Sign out');
  });

  it('renders amount of items in cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMockWithItems}>
        <Nav />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    const count = nav.find('.count');
    expect(toJSON(count)).toMatchSnapshot();
  });
});
