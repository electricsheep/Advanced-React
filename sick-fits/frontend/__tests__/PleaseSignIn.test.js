import { mount } from 'enzyme';
import wait from 'waait';
import PleaseSignIn, { CURRENT_USER_QUERY } from '../Components/PleaseSignIn';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../lib/testUtils';

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

describe('PleaseSignIn', () => {
  it('renders the signin dialog to logged out users', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMock}>
        <PleaseSignIn />
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(wrapper.text()).toContain('Please sign in before continuing');
    expect(wrapper.find('Signin').exists()).toBe(true);
  });

  it('renders the signin dialog to logged in users', async () => {
    const Hey = () => <p>Hey</p>;
    const wrapper = mount(
      <MockedProvider mocks={signedInMock}>
        <PleaseSignIn>
          <Hey />
        </PleaseSignIn>
      </MockedProvider>
    );

    await wait();
    wrapper.update();
    expect(wrapper.find('Hey').exists()).toBe(true);
  });
});
