import React from 'react'
import { shallow } from 'enzyme'
import { TaskItem } from '../../components/TaskItem'

describe('TaskItem', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = shallow(<TaskItem item={{}}/>)
        expect(wrapper.find('.taskitem').length).toEqual(1)
    })
})

describe('updateComplete', ()=> {
    it('calls an action to complete a task item', ()=> {
        const mockUpdateComplete = jest.fn()
        const wrapper = shallow(<TaskItem  item={{}} updateTask={mockUpdateComplete} />)
        wrapper.instance().updateComplete()
        expect(mockUpdateComplete).toHaveBeenCalled()
    })
})