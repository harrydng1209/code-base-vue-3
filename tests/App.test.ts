import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from '../src/App.vue';

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent({ name: 'RouterView' })).toBeTruthy();
  });
});
