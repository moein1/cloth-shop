import React from 'react';

import {configure ,shallow } from 'enzyme';
import Adpater from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adpater()})

describe('<NavigationItems/>', () => {
    let wrapper = null;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    })

    it('it should render two <NavigationItem /> if not authenticated', () => {        
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('it should render three <NavigationItem /> if authenticated' , ()=>{
       // const wrapper = shallow(<NavigationItems auth />);
       wrapper.setProps({auth : true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('it should contains the logout item if authenticated' , ()=>{
        wrapper.setProps({auth : true});
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true);
    } )
})