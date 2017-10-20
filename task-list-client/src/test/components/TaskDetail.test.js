import React from 'react'
import { shallow } from 'enzyme'
import { TaskDetail } from '../../components/TaskDetail'

describe('TaskDetail', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = shallow(<TaskDetail taskDetail={[{completed: true}]} />)
        expect(wrapper.find('.taskdetail').length).toEqual(1)
    })
})