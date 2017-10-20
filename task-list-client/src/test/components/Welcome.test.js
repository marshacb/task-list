import React from 'react'
import { Welcome } from '../../components/Welcome'
import { shallow } from 'enzyme'

// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';

// configure({ adapter: new Adapter() });

describe('Welcome', ()=> {
    it('renders without crashing', () => {
        const wrapper = shallow(<Welcome  getTaskList={jest.fn} />)
        expect(wrapper.find('.welcome').length).toEqual(1)
    })
})