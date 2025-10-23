import { fireEvent, render, screen } from "@testing-library/react"
import InputForm from "@/components/ui-guide-component/form"
import userEvent from "@testing-library/user-event"

describe('Form Component', () => {
    test('should render form with label', () => {
        render(<InputForm id={'email'} label={'Email'} name={'email'} placeholder={'Email'} onChange={() => { }} />)

        const label = screen.getByTestId('label')
        expect(label).toBeInTheDocument()

        const inputNode = screen.getByLabelText(/Email/i)
        expect(inputNode).toBeInTheDocument()

    })

    test('should render form with label, required info and warning', () => {
        render(<InputForm id={'email'} label={'Email'} name={'email'} placeholder={'Email'} onChange={() => { }} isRequired warningEmpty={true} />)



        /**
         * React Testing Library (RTL) looks for:

            A <label> element whose text content matches "Search".

            Then checks which form control (<input>, <textarea>, <select>, etc.) that label is bound to:

            Either via htmlFor="input-id"

            Or by being wrapped around the element

            Then, RTL returns that control element — not the label.
         * 
         */

        const label = screen.getByTestId('label')
        expect(label).toBeInTheDocument()


        const inputNode = screen.getByLabelText(/email/i)
        expect(inputNode).toBeInTheDocument()

        const requiredText = screen.getByTestId('required')
        expect(requiredText).toBeInTheDocument()

        const warningText = screen.getByTestId('footnote')
        expect(warningText).toBeInTheDocument()
        expect(warningText).toHaveTextContent('Email is required')

    })

    test('should render form with label and required info', async () => {
        render(<InputForm id={'email'} label={'Email'} name={'email'} placeholder={'Email'} onChange={() => { }} isRequired />)

        const label = screen.getByTestId('label')
        expect(label).toBeInTheDocument()

        const inputNode = screen.getByLabelText(/email/i)
        expect(inputNode).toBeInTheDocument()

        // fireEvent.change(inputNode, { target: { value: 'johndoe@mail.com' } })
        await userEvent.type(inputNode, 'johndoe@mail.com')
        expect(inputNode).toHaveValue('johndoe@mail.com')
    })

})