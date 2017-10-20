import React from 'react'
import { shallow } from 'enzyme'
import { TaskList } from '../../components/TaskList'

describe('TaskList', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = shallow(<TaskList />)
        expect(wrapper.find('.tasklist').length).toEqual(1)
    })
})