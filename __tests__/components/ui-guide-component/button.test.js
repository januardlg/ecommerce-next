import Button from '@/components/ui-guide-component/button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Test for button', () => {
    test('Should render button', async () => {

        render(
            <Button text={'Shop Now'} />
        )

        const buttonSave = screen.getByRole('button', { name: /shop/i })

        expect(buttonSave).toBeInTheDocument();
    })

    test('Should render and click button', async () => {
        const handleClick = jest.fn()

        render(
            <Button onClick={handleClick} text={'Shop Now'} />
        )

        const clickButton = screen.getByRole('button', { name: /shop/i })
        expect(clickButton).toBeInTheDocument();

        await userEvent.click(clickButton);
        expect(handleClick).toHaveBeenCalledTimes(1)

    })

    test('Should render button with type: primary -- bg-[#8A33FD]', async () => {

        render(
            <Button type={'primary'} text={'Shop Now'} />
        )

        const button = screen.getByRole('button', { name: /shop/i })
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-[#8A33FD]')
    })
})