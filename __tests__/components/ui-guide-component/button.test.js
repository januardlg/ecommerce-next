import Button from '@/components/ui-guide-component/button';
import { render, screen } from '@testing-library/react';

describe('Test for button', () => {
    test('Should render button', async () => {
        render(
            <Button onClick={() => { }} text={'Shop Now'} />
        )


        expect(screen.getByText('Shop Now')).toBeInTheDocument();
    })
})