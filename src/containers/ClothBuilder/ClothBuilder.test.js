import React from 'react';

import {ClothBuilder} from './ClothBuilder';

import {configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Cloth/BuildControls/BuildControls';

configure({adapter : new Adapter()});

describe('<ClothBuilder />',()=>{
    let wrapper = null;

    beforeEach(()=>{
        wrapper = shallow(<ClothBuilder onItemInit={()=>{}} />)
    });

    it('should recieve the BuildeControls when recieve the items',()=>{
        wrapper.setProps({its : {top : 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

});