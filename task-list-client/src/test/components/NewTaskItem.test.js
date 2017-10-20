import React from 'react' 
import { shallow } from 'enzyme' 
import { NewTaskItem } from '../../components/NewTaskItem'

describe('NewTaskItem', ()=> {
    it('renders without crashing', ()=> {
        const wrapper = shallow(<NewTaskItem />)
        expect(wrapper.find('.newtaskitem').length).toEqual(1)
    })
})

describe('updateFormState', ()=> {
    it('calls updateFormState action', ()=> {
        const e = {
            target: {
                value: ""
            }
        }

        const updateFormStateMock = jest.fn()
        const wrapper = shallow(<NewTaskItem formState={{}} updateFormState={updateFormStateMock}/>)
        wrapper.instance().updateFormState(wrapper.instance().props.formState, e)
        expect(updateFormStateMock).toHaveBeenCalled()
    })
})