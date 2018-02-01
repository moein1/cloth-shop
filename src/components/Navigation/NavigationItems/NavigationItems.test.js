import React from 'react';

import {configure ,shallow } from 'enzyme';
import Adpater from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adpater()})

describe('<NavigationItems/>', () => {
    it('it should render two <NavigationItem /> if not authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
})